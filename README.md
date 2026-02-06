# KubeClaw 🦞☸️

**KubeClaw** is an open-source extension for [OpenClaw](https://openclaw.ai) that brings Kubernetes native capabilities to AI agents. It allows you to deploy OpenClaw nodes as scalable, self-healing containers within a K8s cluster.

## Key Features

- **Scalable Node Pools**: Scale your agent's execution power from 1 to 100+ nodes with a single command.
- **Self-Healing**: Kubernetes automatically restarts crashed nodes, ensuring your agent always has a workspace.
- **Resource Isolation**: Every node runs in its own container, protecting your host system and isolating tasks.
- **Environment Consistency**: Use Docker images to provide perfectly configured environments for your agents.

## Quick Start

### 1. Docker
Build the image:
```bash
docker build -t kubeclaw:latest .
```

### 2. Kubernetes
Apply the manifests:
```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
```

## Architecture

KubeClaw nodes connect back to your OpenClaw Gateway via WebSocket. Once paired, the Gateway can delegate `exec` calls to any of the KubeClaw pods, effectively turning your k8s cluster into a massive brain for your AI agent.

## License

Apache-2.0
