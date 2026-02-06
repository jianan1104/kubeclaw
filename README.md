# KubeClaw 🦞☸️

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-1.25%2B-blue)](https://kubernetes.io)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Compatible-orange)](https://openclaw.ai)

**KubeClaw** is the enterprise-grade orchestration layer for [OpenClaw](https://openclaw.ai). It solves real-world environment problems by turning OpenClaw nodes into cloud-native, auto-scaling, self-healing microservices.

> _"From personal AI assistant to production-grade agent infrastructure."_

## 🎯 Problems We Solve

| Problem | Without KubeClaw | With KubeClaw |
|---------|-----------------|---------------|
| **Security** | Agent runs on your host - can access everything | Isolated in containers with strict resource limits |
| **Scalability** | One node per machine, manual setup | Scale 1→1000 nodes with `kubectl scale` |
| **Environment** | "Works on my machine" syndrome | Pre-baked images with Python, Node.js, Git ready |
| **Reliability** | Node crashes = manual restart | Kubernetes auto-heals failed nodes |
| **Dependency Hell** | Install tools manually on each node | Everything pre-installed in the container |

## 🚀 Quick Start

### Prerequisites
- Kubernetes cluster (1.25+)
- `kubectl` configured
- OpenClaw Gateway running somewhere accessible

### One-Command Setup (Recommended)

```bash
curl -fsSL https://jianan1104.github.io/kubeclaw/install.sh | bash
```

This script will clone the repository to `~/.kubeclaw` and (if you have permission) symlink the CLI to `/usr/local/bin/kubeclaw`. After installation, simply run:

```bash
kubeclaw init
```

### Manual Setup (Alternative)

```bash
# 1. Create the secret with your Gateway token
kubectl create secret generic kubeclaw-secret \
  --from-literal=token=YOUR_GATEWAY_TOKEN

# 2. Update the ConfigMap with your Gateway address
vim k8s/configmap.yaml  # Edit OPENCLAW_GATEWAY_HOST

# 3. Deploy
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
```

### Approve the Nodes

On your Gateway machine:
```bash
# List pending node pairing requests
openclaw nodes pending

# Approve each node
openclaw nodes approve <requestId>
```

## 📊 Operations

```bash
# Check status
./kubeclaw.sh status

# Scale to 10 nodes
./kubeclaw.sh scale 10

# View logs
./kubeclaw.sh logs

# Remove from cluster
./kubeclaw.sh destroy
```

Or use `kubectl` directly:
```bash
kubectl get pods -l app.kubernetes.io/name=kubeclaw
kubectl scale deployment kubeclaw-node --replicas=20
kubectl logs -f deployment/kubeclaw-node
```

## 🐳 Docker Image

The KubeClaw image comes pre-loaded with:

| Category | Tools |
|----------|-------|
| **Languages** | Python 3.11+, Node.js 20, Bun |
| **Python Libs** | numpy, pandas, scikit-learn, requests, beautifulsoup4 |
| **Node.js** | TypeScript, tsx, pnpm, yarn, pm2 |
| **CLI Tools** | git, curl, jq, vim, htop |
| **OpenClaw** | openclaw CLI (latest) |

### Build Your Own Image

```bash
docker build -t your-registry/kubeclaw:latest .
docker push your-registry/kubeclaw:latest
```

Then update `k8s/deployment.yaml` to use your image.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Your Kubernetes Cluster                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ kubeclaw-1  │  │ kubeclaw-2  │  │ kubeclaw-N  │   ...        │
│  │   (Pod)     │  │   (Pod)     │  │   (Pod)     │              │
│  │             │  │             │  │             │              │
│  │ Python/Node │  │ Python/Node │  │ Python/Node │              │
│  │ OpenClaw    │  │ OpenClaw    │  │ OpenClaw    │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          │ WebSocket                             │
│                          ▼                                       │
└─────────────────────────────────────────────────────────────────┘
                           │
                           │ (Internet/VPN)
                           ▼
                ┌─────────────────────┐
                │  OpenClaw Gateway   │
                │                     │
                │  Your laptop/VPS    │
                │  Running openclaw   │
                └─────────────────────┘
```

## 🔐 Security

- **Container Isolation**: Each node runs in its own container with cgroups/namespaces
- **Resource Limits**: CPU and memory limits prevent runaway processes
- **Secret Management**: Gateway tokens are stored as Kubernetes Secrets
- **Network Policies**: (Coming soon) Restrict node network access

## 🗺️ Roadmap

- [x] Core Docker image with dev tools
- [x] Kubernetes Deployment manifests
- [x] CLI tool for quick setup
- [x] Helm Chart for advanced customization
- [ ] Auto-Pairing Controller (logic design complete)
- [ ] Prometheus metrics exporter
- [ ] GPU-enabled image variant
- [ ] Multi-Gateway support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📜 License

Apache-2.0 - see [LICENSE](LICENSE) for details.

---

Built with 🦞 by the KubeClaw community.
