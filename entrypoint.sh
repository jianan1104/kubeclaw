#!/bin/bash
# =============================================================================
# KubeClaw Entrypoint Script
# =============================================================================
# Handles node initialization, auto-pairing, and connection to the Gateway.
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() { echo -e "${BLUE}[KubeClaw]${NC} $1"; }
log_success() { echo -e "${GREEN}[KubeClaw]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[KubeClaw]${NC} $1"; }
log_error() { echo -e "${RED}[KubeClaw]${NC} $1"; }

# =============================================================================
# Configuration
# =============================================================================
GATEWAY_HOST="${OPENCLAW_GATEWAY_HOST:-gateway.openclaw.svc.cluster.local}"
GATEWAY_PORT="${OPENCLAW_GATEWAY_PORT:-18789}"
GATEWAY_TOKEN="${OPENCLAW_GATEWAY_TOKEN:-}"
NODE_NAME="${OPENCLAW_NODE_NAME:-kubeclaw-$(hostname)}"
AUTO_PAIR="${OPENCLAW_AUTO_PAIR:-true}"
LOG_LEVEL="${OPENCLAW_LOG_LEVEL:-info}"

# Kubernetes metadata (injected by downward API)
POD_NAME="${POD_NAME:-$(hostname)}"
POD_NAMESPACE="${POD_NAMESPACE:-default}"
POD_IP="${POD_IP:-}"

# =============================================================================
# Banner
# =============================================================================
echo ""
echo "  ╭───────────────────────────────────────────────────────────────╮"
echo "  │                                                               │"
echo "  │   🦞☸️  KubeClaw - Kubernetes Native OpenClaw Node            │"
echo "  │                                                               │"
echo "  │   The secure, scalable execution environment for AI agents.  │"
echo "  │                                                               │"
echo "  ╰───────────────────────────────────────────────────────────────╯"
echo ""

# =============================================================================
# Pre-flight Checks
# =============================================================================
log_info "Starting pre-flight checks..."

# Check if we have a token
if [[ -z "$GATEWAY_TOKEN" ]]; then
    # Try to read from mounted secret
    if [[ -f "/etc/kubeclaw/token" ]]; then
        GATEWAY_TOKEN=$(cat /etc/kubeclaw/token)
        log_info "Loaded token from mounted secret"
    else
        log_error "No OPENCLAW_GATEWAY_TOKEN provided and no secret mounted at /etc/kubeclaw/token"
        log_error "Please create a Kubernetes Secret with your Gateway token"
        exit 1
    fi
fi

# Test connectivity to Gateway
log_info "Testing connectivity to Gateway at ${GATEWAY_HOST}:${GATEWAY_PORT}..."
if nc -z -w5 "$GATEWAY_HOST" "$GATEWAY_PORT" 2>/dev/null; then
    log_success "Gateway is reachable!"
else
    log_warn "Cannot reach Gateway directly. Will retry during connection..."
fi

# =============================================================================
# Node Configuration
# =============================================================================
log_info "Configuring node..."
log_info "  Node Name:    $NODE_NAME"
log_info "  Pod Name:     $POD_NAME"
log_info "  Namespace:    $POD_NAMESPACE"
log_info "  Gateway:      $GATEWAY_HOST:$GATEWAY_PORT"
log_info "  Auto-Pair:    $AUTO_PAIR"

# Create node.json config if it doesn't exist
NODE_CONFIG="/root/.openclaw/node.json"
if [[ ! -f "$NODE_CONFIG" ]]; then
    log_info "Creating node configuration..."
    cat > "$NODE_CONFIG" << EOF
{
  "displayName": "${NODE_NAME}",
  "gateway": {
    "host": "${GATEWAY_HOST}",
    "port": ${GATEWAY_PORT}
  },
  "metadata": {
    "pod": "${POD_NAME}",
    "namespace": "${POD_NAMESPACE}",
    "ip": "${POD_IP}",
    "orchestrator": "kubernetes",
    "version": "kubeclaw-1.0.0"
  }
}
EOF
fi

# =============================================================================
# Export token for OpenClaw CLI
# =============================================================================
export OPENCLAW_GATEWAY_TOKEN="$GATEWAY_TOKEN"

# =============================================================================
# Start the Node
# =============================================================================
log_info "Starting OpenClaw node..."
log_info "Connecting to ws://${GATEWAY_HOST}:${GATEWAY_PORT}"

# Build the command
CMD="openclaw node run"
CMD="$CMD --host $GATEWAY_HOST"
CMD="$CMD --port $GATEWAY_PORT"
CMD="$CMD --display-name $NODE_NAME"

# Execute
log_success "Node starting up. Waiting for Gateway connection..."
exec $CMD
