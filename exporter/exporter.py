#!/usr/bin/env python3
"""KubeClaw Prometheus Metrics Exporter.

Queries OpenClaw gateway and Kubernetes API to expose cluster metrics
in Prometheus format.
"""

import json
import logging
import os
import subprocess
import time

from kubernetes import client, config
from prometheus_client import Gauge, Counter, Info, start_http_server

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger("kubeclaw-exporter")

POLL_INTERVAL = int(os.environ.get("POLL_INTERVAL", "30"))
METRICS_PORT = int(os.environ.get("METRICS_PORT", "9090"))
LABEL_SELECTOR = "app.kubernetes.io/name=kubeclaw"

# --- Prometheus Metrics ---

# Gateway metrics
gateway_up = Gauge(
    "kubeclaw_gateway_up",
    "Whether the OpenClaw gateway is reachable (1=up, 0=down)",
)
gateway_nodes_total = Gauge(
    "kubeclaw_gateway_nodes_total",
    "Total number of nodes registered on the gateway",
)
gateway_nodes_online = Gauge(
    "kubeclaw_gateway_nodes_online",
    "Number of nodes currently online on the gateway",
)
gateway_nodes_pending = Gauge(
    "kubeclaw_gateway_nodes_pending",
    "Number of pending node pairing requests",
)

# Kubernetes pod metrics
pods_total = Gauge(
    "kubeclaw_pods_total",
    "Total number of KubeClaw pods",
)
pods_running = Gauge(
    "kubeclaw_pods_running",
    "Number of KubeClaw pods in Running phase",
)
pods_pending_k8s = Gauge(
    "kubeclaw_pods_pending",
    "Number of KubeClaw pods in Pending phase",
)
pods_failed = Gauge(
    "kubeclaw_pods_failed",
    "Number of KubeClaw pods in Failed phase",
)
pods_ready = Gauge(
    "kubeclaw_pods_ready",
    "Number of KubeClaw pods with all containers ready",
)

# Pairing metrics
paired_nodes = Gauge(
    "kubeclaw_paired_nodes",
    "Number of pods successfully paired with the gateway",
)

# Scrape metrics
scrape_errors = Counter(
    "kubeclaw_scrape_errors_total",
    "Total number of errors encountered during metric collection",
    ["source"],
)
scrape_duration_seconds = Gauge(
    "kubeclaw_scrape_duration_seconds",
    "Duration of the last metrics collection cycle in seconds",
)

# Build info
build_info = Info(
    "kubeclaw_exporter",
    "KubeClaw exporter build information",
)


def load_k8s_config():
    """Load kubeconfig: in-cluster first, then fall back to local kubeconfig."""
    try:
        config.load_incluster_config()
        log.info("Loaded in-cluster Kubernetes config")
    except config.ConfigException:
        config.load_kube_config()
        log.info("Loaded local kubeconfig")


def get_namespace() -> str:
    """Return the namespace this exporter is running in."""
    ns_path = "/var/run/secrets/kubernetes.io/serviceaccount/namespace"
    if os.path.exists(ns_path):
        with open(ns_path) as f:
            return f.read().strip()
    return os.environ.get("NAMESPACE", "default")


def run_openclaw_command(args: list[str]) -> str | None:
    """Run an openclaw CLI command and return stdout, or None on failure."""
    try:
        result = subprocess.run(
            ["openclaw"] + args,
            capture_output=True,
            text=True,
            timeout=30,
        )
    except FileNotFoundError:
        log.error("'openclaw' CLI not found on PATH")
        return None
    except subprocess.TimeoutExpired:
        log.error("Timed out running: openclaw %s", " ".join(args))
        return None

    if result.returncode != 0:
        log.warning(
            "openclaw %s failed (rc=%d): %s",
            " ".join(args),
            result.returncode,
            result.stderr.strip(),
        )
        return None

    return result.stdout.strip()


def parse_json_response(raw: str | None) -> list[dict] | dict | None:
    """Parse JSON from CLI output, returning the parsed structure or None."""
    if not raw:
        return None
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        log.error("Failed to parse JSON: %s", raw[:200])
        return None


def collect_gateway_metrics():
    """Collect metrics from the OpenClaw gateway via CLI."""
    # --- Nodes list ---
    raw = run_openclaw_command(["nodes", "list", "--json"])
    data = parse_json_response(raw)

    if data is None:
        gateway_up.set(0)
        scrape_errors.labels(source="gateway_nodes").inc()
        return

    gateway_up.set(1)

    nodes = []
    if isinstance(data, list):
        nodes = data
    elif isinstance(data, dict):
        nodes = data.get("nodes", data.get("list", []))

    gateway_nodes_total.set(len(nodes))

    online = sum(
        1 for n in nodes
        if n.get("status", "").lower() in ("online", "connected", "active")
    )
    gateway_nodes_online.set(online)

    # --- Pending requests ---
    raw_pending = run_openclaw_command(["nodes", "pending", "--json"])
    data_pending = parse_json_response(raw_pending)

    if data_pending is None:
        gateway_nodes_pending.set(0)
        return

    pending = []
    if isinstance(data_pending, list):
        pending = data_pending
    elif isinstance(data_pending, dict):
        pending = data_pending.get("nodes", data_pending.get("requests", []))

    gateway_nodes_pending.set(len(pending))


def collect_k8s_metrics(v1: client.CoreV1Api, namespace: str):
    """Collect metrics from the Kubernetes API."""
    try:
        pods = v1.list_namespaced_pod(namespace, label_selector=LABEL_SELECTOR)
    except Exception:
        log.exception("Failed to list pods")
        scrape_errors.labels(source="kubernetes").inc()
        return

    pod_list = pods.items
    pods_total.set(len(pod_list))

    running = 0
    pending = 0
    failed = 0
    ready = 0
    paired = 0

    for pod in pod_list:
        phase = pod.status.phase
        if phase == "Running":
            running += 1
        elif phase == "Pending":
            pending += 1
        elif phase == "Failed":
            failed += 1

        # Check readiness
        conditions = pod.status.conditions or []
        for cond in conditions:
            if cond.type == "Ready" and cond.status == "True":
                ready += 1
                break

        # Check if pod has a KUBECLAW_POD_ID (indicates pairing intent)
        has_pod_id = False
        for container in pod.spec.containers:
            if not container.env:
                continue
            for env in container.env:
                if env.name == "KUBECLAW_POD_ID" and env.value:
                    has_pod_id = True
                    break
            if has_pod_id:
                break

        # A running + ready pod with a pod ID is considered paired
        if phase == "Running" and has_pod_id:
            for cond in conditions:
                if cond.type == "Ready" and cond.status == "True":
                    paired += 1
                    break

    pods_running.set(running)
    pods_pending_k8s.set(pending)
    pods_failed.set(failed)
    pods_ready.set(ready)
    paired_nodes.set(paired)


def collect_all(v1: client.CoreV1Api, namespace: str):
    """Run a full metrics collection cycle."""
    start = time.monotonic()

    collect_gateway_metrics()
    collect_k8s_metrics(v1, namespace)

    duration = time.monotonic() - start
    scrape_duration_seconds.set(duration)
    log.info("Metrics collection completed in %.2fs", duration)


def main():
    log.info("KubeClaw Prometheus Exporter starting")
    log.info("Metrics port: %d | Poll interval: %ds", METRICS_PORT, POLL_INTERVAL)

    build_info.info({
        "version": os.environ.get("EXPORTER_VERSION", "1.0.0"),
        "component": "kubeclaw-exporter",
    })

    load_k8s_config()
    v1 = client.CoreV1Api()
    namespace = get_namespace()
    log.info("Operating in namespace: %s", namespace)

    # Start the Prometheus HTTP server
    start_http_server(METRICS_PORT)
    log.info("Prometheus metrics server listening on :%d/metrics", METRICS_PORT)

    while True:
        try:
            collect_all(v1, namespace)
        except Exception:
            log.exception("Error during metrics collection")
            scrape_errors.labels(source="collection_loop").inc()
        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    main()
