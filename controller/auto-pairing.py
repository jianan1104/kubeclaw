#!/usr/bin/env python3
"""KubeClaw Auto-Pairing Controller.

Watches for KubeClaw pods in the current namespace and automatically approves
matching pending node pairing requests on the OpenClaw Gateway.
"""

import json
import logging
import os
import subprocess
import sys
import time

from kubernetes import client, config

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger("auto-pairing")

POLL_INTERVAL = int(os.environ.get("POLL_INTERVAL", "30"))
LABEL_SELECTOR = "app.kubernetes.io/name=kubeclaw"
POD_ID_ENV_VAR = "KUBECLAW_POD_ID"


def load_k8s_config():
    """Load kubeconfig: in-cluster first, then fall back to local kubeconfig."""
    try:
        config.load_incluster_config()
        log.info("Loaded in-cluster Kubernetes config")
    except config.ConfigException:
        config.load_kube_config()
        log.info("Loaded local kubeconfig")


def get_namespace() -> str:
    """Return the namespace this controller is running in."""
    ns_path = "/var/run/secrets/kubernetes.io/serviceaccount/namespace"
    if os.path.exists(ns_path):
        with open(ns_path) as f:
            return f.read().strip()
    return os.environ.get("NAMESPACE", "default")


def get_valid_pod_ids(v1: client.CoreV1Api, namespace: str) -> set[str]:
    """Collect KUBECLAW_POD_ID values from running KubeClaw pods."""
    pod_ids: set[str] = set()
    pods = v1.list_namespaced_pod(namespace, label_selector=LABEL_SELECTOR)

    for pod in pods.items:
        if pod.status.phase not in ("Running", "Pending"):
            continue
        for container in pod.spec.containers:
            if not container.env:
                continue
            for env in container.env:
                if env.name == POD_ID_ENV_VAR and env.value:
                    pod_ids.add(env.value)

    log.info("Found %d valid pod IDs in namespace %s", len(pod_ids), namespace)
    return pod_ids


def get_pending_requests() -> list[dict]:
    """Run `openclaw nodes pending --json` and return parsed results."""
    try:
        result = subprocess.run(
            ["openclaw", "nodes", "pending", "--json"],
            capture_output=True,
            text=True,
            timeout=30,
        )
    except FileNotFoundError:
        log.error("'openclaw' CLI not found on PATH")
        return []
    except subprocess.TimeoutExpired:
        log.error("Timed out fetching pending requests")
        return []

    if result.returncode != 0:
        log.warning("openclaw nodes pending failed (rc=%d): %s", result.returncode, result.stderr.strip())
        return []

    stdout = result.stdout.strip()
    if not stdout:
        return []

    try:
        data = json.loads(stdout)
    except json.JSONDecodeError:
        log.error("Failed to parse pending requests JSON: %s", stdout[:200])
        return []

    if isinstance(data, list):
        return data
    if isinstance(data, dict) and "nodes" in data:
        return data["nodes"]
    if isinstance(data, dict) and "requests" in data:
        return data["requests"]

    log.warning("Unexpected JSON structure from pending requests")
    return []


def approve_request(request_id: str) -> bool:
    """Approve a pending node pairing request."""
    try:
        result = subprocess.run(
            ["openclaw", "nodes", "approve", request_id],
            capture_output=True,
            text=True,
            timeout=30,
        )
    except (FileNotFoundError, subprocess.TimeoutExpired) as exc:
        log.error("Failed to approve request %s: %s", request_id, exc)
        return False

    if result.returncode != 0:
        log.error("Approve failed for %s (rc=%d): %s", request_id, result.returncode, result.stderr.strip())
        return False

    return True


def reconcile(v1: client.CoreV1Api, namespace: str) -> None:
    """Single reconciliation pass: match pending requests to pod IDs and approve."""
    valid_pod_ids = get_valid_pod_ids(v1, namespace)
    if not valid_pod_ids:
        log.debug("No valid pod IDs found, skipping approval check")
        return

    pending = get_pending_requests()
    if not pending:
        log.debug("No pending requests")
        return

    log.info("Processing %d pending request(s) against %d pod ID(s)", len(pending), len(valid_pod_ids))

    for req in pending:
        request_id = req.get("id") or req.get("requestId") or req.get("request_id")
        description = req.get("description", "")

        if not request_id:
            log.warning("Pending request missing an ID field: %s", req)
            continue

        if description in valid_pod_ids:
            log.info("Auto-approving request %s (pod ID: %s)", request_id, description)
            if approve_request(str(request_id)):
                log.info("Approved request %s", request_id)
            else:
                log.warning("Failed to approve request %s", request_id)
        else:
            log.debug("Request %s description '%s' does not match any pod ID", request_id, description[:50])


def main():
    log.info("KubeClaw Auto-Pairing Controller starting")
    log.info("Poll interval: %ds | Label selector: %s", POLL_INTERVAL, LABEL_SELECTOR)

    load_k8s_config()
    v1 = client.CoreV1Api()
    namespace = get_namespace()
    log.info("Operating in namespace: %s", namespace)

    while True:
        try:
            reconcile(v1, namespace)
        except Exception:
            log.exception("Error during reconciliation loop")
        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    main()
