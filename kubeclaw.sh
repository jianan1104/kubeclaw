#!/bin/bash
# =============================================================================
# KubeClaw CLI - Quick Setup Tool
# =============================================================================
# Usage: ./kubeclaw.sh [command]
#
# Commands:
#   init       - Initialize KubeClaw in your cluster
#   status     - Check the status of KubeClaw nodes
#   scale N    - Scale to N nodes
#   logs       - View logs from KubeClaw pods
#   destroy    - Remove KubeClaw from your cluster
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
K8S_DIR="$SCRIPT_DIR/k8s"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

banner() {
    echo ""
    echo -e "${CYAN}  ╭───────────────────────────────────────────────────────────────╮${NC}"
    echo -e "${CYAN}  │${NC}                                                               ${CYAN}│${NC}"
    echo -e "${CYAN}  │${NC}   🦞☸️  ${GREEN}KubeClaw${NC} - Kubernetes Native OpenClaw Nodes           ${CYAN}│${NC}"
    echo -e "${CYAN}  │${NC}                                                               ${CYAN}│${NC}"
    echo -e "${CYAN}  ╰───────────────────────────────────────────────────────────────╯${NC}"
    echo ""
}

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# =============================================================================
# Commands
# =============================================================================

cmd_init() {
    banner
    log_info "Initializing KubeClaw in your cluster..."
    
    # Check prerequisites
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed. Please install it first."
        exit 1
    fi
    
    # Check cluster connection
    if ! kubectl cluster-info &> /dev/null; then
        log_error "Cannot connect to Kubernetes cluster. Check your kubeconfig."
        exit 1
    fi
    
    log_success "Connected to cluster: $(kubectl config current-context)"
    echo ""
    
    # Get Gateway token
    echo -e "${YELLOW}Please enter your OpenClaw Gateway token:${NC}"
    echo -e "${CYAN}(Get it with: openclaw config get gateway.auth.token)${NC}"
    read -s -p "Token: " GATEWAY_TOKEN
    echo ""
    
    if [[ -z "$GATEWAY_TOKEN" ]]; then
        log_error "Token cannot be empty!"
        exit 1
    fi
    
    # Get Gateway host
    echo ""
    read -p "Gateway host (IP or DNS): " GATEWAY_HOST
    read -p "Gateway port [18789]: " GATEWAY_PORT
    GATEWAY_PORT="${GATEWAY_PORT:-18789}"
    
    # Create secret
    log_info "Creating secret..."
    kubectl create secret generic kubeclaw-secret \
        --from-literal=token="$GATEWAY_TOKEN" \
        --dry-run=client -o yaml | kubectl apply -f -
    
    # Update and apply configmap
    log_info "Applying ConfigMap..."
    sed "s/YOUR_GATEWAY_IP_OR_DNS/$GATEWAY_HOST/g" "$K8S_DIR/configmap.yaml" | \
    sed "s/18789/$GATEWAY_PORT/g" | \
    kubectl apply -f -
    
    # Apply deployment
    log_info "Deploying KubeClaw nodes..."
    kubectl apply -f "$K8S_DIR/deployment.yaml"
    
    echo ""
    log_success "KubeClaw deployed successfully!"
    log_info "Waiting for pods to start..."
    
    kubectl rollout status deployment/kubeclaw-node --timeout=120s || true
    
    echo ""
    log_info "Current status:"
    kubectl get pods -l app.kubernetes.io/name=kubeclaw
    
    echo ""
    log_success "KubeClaw is ready!"
    log_info "Don't forget to approve the nodes on your Gateway:"
    echo -e "  ${CYAN}openclaw nodes pending${NC}"
    echo -e "  ${CYAN}openclaw nodes approve <requestId>${NC}"
}

cmd_status() {
    banner
    log_info "KubeClaw Status"
    echo ""
    
    echo -e "${CYAN}=== Deployment ===${NC}"
    kubectl get deployment kubeclaw-node -o wide 2>/dev/null || echo "Not found"
    
    echo ""
    echo -e "${CYAN}=== Pods ===${NC}"
    kubectl get pods -l app.kubernetes.io/name=kubeclaw -o wide 2>/dev/null || echo "No pods found"
    
    echo ""
    echo -e "${CYAN}=== Recent Events ===${NC}"
    kubectl get events --field-selector involvedObject.name=kubeclaw-node --sort-by='.lastTimestamp' 2>/dev/null | tail -10 || echo "No events"
}

cmd_scale() {
    local replicas=$1
    
    if [[ -z "$replicas" ]]; then
        log_error "Please specify the number of replicas: ./kubeclaw.sh scale N"
        exit 1
    fi
    
    banner
    log_info "Scaling KubeClaw to $replicas nodes..."
    
    kubectl scale deployment kubeclaw-node --replicas="$replicas"
    
    log_success "Scaled to $replicas replicas"
    log_info "Waiting for pods..."
    
    kubectl rollout status deployment/kubeclaw-node --timeout=120s || true
    kubectl get pods -l app.kubernetes.io/name=kubeclaw
}

cmd_logs() {
    banner
    log_info "Streaming logs from KubeClaw pods..."
    echo ""
    
    # Get first pod name
    POD=$(kubectl get pods -l app.kubernetes.io/name=kubeclaw -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)
    
    if [[ -z "$POD" ]]; then
        log_error "No KubeClaw pods found"
        exit 1
    fi
    
    log_info "Following logs from: $POD"
    kubectl logs -f "$POD"
}

cmd_destroy() {
    banner
    log_warn "This will remove all KubeClaw resources from your cluster."
    read -p "Are you sure? (yes/no): " confirm
    
    if [[ "$confirm" != "yes" ]]; then
        log_info "Cancelled."
        exit 0
    fi
    
    log_info "Removing KubeClaw..."
    
    kubectl delete deployment kubeclaw-node --ignore-not-found
    kubectl delete configmap kubeclaw-config --ignore-not-found
    kubectl delete secret kubeclaw-secret --ignore-not-found
    
    log_success "KubeClaw removed from cluster."
}

cmd_help() {
    banner
    echo "Usage: ./kubeclaw.sh [command]"
    echo ""
    echo "Commands:"
    echo "  init       Initialize KubeClaw in your cluster"
    echo "  status     Check the status of KubeClaw nodes"
    echo "  scale N    Scale to N nodes"
    echo "  logs       View logs from KubeClaw pods"
    echo "  destroy    Remove KubeClaw from your cluster"
    echo "  help       Show this help message"
    echo ""
}

# =============================================================================
# Main
# =============================================================================

case "${1:-help}" in
    init)    cmd_init ;;
    status)  cmd_status ;;
    scale)   cmd_scale "$2" ;;
    logs)    cmd_logs ;;
    destroy) cmd_destroy ;;
    help)    cmd_help ;;
    *)
        log_error "Unknown command: $1"
        cmd_help
        exit 1
        ;;
esac
