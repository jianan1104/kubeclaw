#!/bin/bash
# =============================================================================
# KubeClaw One-Line Installer
# =============================================================================
# Usage: curl -fsSL https://jianan1104.github.io/kubeclaw/install.sh | bash
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[KubeClaw]${NC} $1"; }
log_success() { echo -e "${GREEN}[KubeClaw]${NC} $1"; }
log_error() { echo -e "${RED}[KubeClaw]${NC} $1"; }

# 1. Prerequisites Check
log_info "Checking prerequisites..."
for cmd in git kubectl; do
    if ! command -v $cmd &> /dev/null; then
        log_error "$cmd is not installed. Please install it and try again."
        exit 1
    fi
done

# 2. Setup Directory
INSTALL_DIR="$HOME/.kubeclaw"
if [ -d "$INSTALL_DIR" ]; then
    log_info "KubeClaw is already installed at $INSTALL_DIR. Updating..."
    cd "$INSTALL_DIR" && git pull
else
    log_info "Cloning KubeClaw to $INSTALL_DIR..."
    git clone https://github.com/jianan1104/kubeclaw.git "$INSTALL_DIR"
fi

# 3. Symlink CLI
log_info "Setting up CLI..."
cd "$INSTALL_DIR"
chmod +x kubeclaw.sh

# Try to symlink to /usr/local/bin if possible
if [ -w "/usr/local/bin" ]; then
    ln -sf "$INSTALL_DIR/kubeclaw.sh" /usr/local/bin/kubeclaw
    log_success "KubeClaw CLI installed to /usr/local/bin/kubeclaw"
else
    log_info "Cannot write to /usr/local/bin. You can run KubeClaw using: $INSTALL_DIR/kubeclaw.sh"
    echo "Or add this to your .zshrc/.bashrc: alias kubeclaw='$INSTALL_DIR/kubeclaw.sh'"
fi

# 4. Success
echo ""
log_success "KubeClaw installation complete! 🦞☸️"
echo "-------------------------------------------------------"
echo "To initialize your cluster, run:"
echo -e "  ${BLUE}kubeclaw init${NC}"
echo "-------------------------------------------------------"
