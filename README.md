# KubeClaw 🦞☸️

**KubeClaw** is the enterprise-grade orchestration layer for [OpenClaw](https://openclaw.ai). It solves the "Node Scalability Problem" by turning OpenClaw nodes into cloud-native, auto-scaling microservices.

## Why KubeClaw?

OpenClaw is amazing for personal use, but as you scale your agent fleet, you run into:
- **The Pairing Nightmare**: Manually approving 20 nodes via CLI? No thanks. KubeClaw automates node trust using K8s Secrets.
- **Resource Exhaustion**: Large tasks can crash your host. KubeClaw isolates every task in a Pod with strict CPU/Memory limits.
- **Unbounded Storage**: Remote skill caches can grow forever. KubeClaw uses ephemeral Pods and Persistent Volume Claims (PVC) to keep nodes clean.
- **High Availability**: If a node goes down, KubeClaw (via K8s) brings it back immediately.

## Key Features

- **🚀 One-Command Cluster**: Deploy a full OpenClaw stack with a single Helm chart.
- **🔄 Auto-Scaling Node Pools**: Scale from 1 to 1,000+ worker nodes with `kubectl scale`.
- **🛡️ Secure Sandboxing**: Every node runs in a hardened container, preventing breakout.
- **🤖 Agent Orchestration**: Move from "Personal AI" to "Agentic Infrastructure".

## Quick Start

### 1. Build & Push
```bash
docker build -t your-registry/kubeclaw:latest .
docker push your-registry/kubeclaw:latest
```

### 2. Deploy to K8s
```bash
# Create the secret for your Gateway Token
kubectl create secret generic kubeclaw-secret --from-literal=token=YOUR_GATEWAY_TOKEN

# Deploy the node pool
kubectl apply -f k8s/deployment.yaml
```

## Roadmap

- [ ] **Helm Chart**: Simplify installation.
- [ ] **Auto-Pairing Controller**: Securely bypass manual node approval within the cluster.
- [ ] **Task Distribution**: Better load balancing across multiple worker pods.
- [ ] **Monitoring**: Prometheus metrics for node health and token usage.

## License

Apache-2.0
