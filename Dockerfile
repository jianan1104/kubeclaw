# =============================================================================
# KubeClaw - Enterprise-Grade OpenClaw Node Image
# =============================================================================
# This image provides a fully-loaded execution environment for OpenClaw agents.
# It includes Python, Node.js, common dev tools, and the OpenClaw CLI.
# =============================================================================

FROM node:22-bookworm AS base

# Metadata
LABEL maintainer="Kane <jianan1104@github>"
LABEL org.opencontainers.image.title="KubeClaw"
LABEL org.opencontainers.image.description="Kubernetes-native OpenClaw Node with pre-loaded dev tools"
LABEL org.opencontainers.image.source="https://github.com/jianan1104/kubeclaw"
LABEL org.opencontainers.image.licenses="Apache-2.0"

# =============================================================================
# System Dependencies & Dev Tools
# =============================================================================
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Build essentials
    build-essential \
    gcc \
    g++ \
    make \
    cmake \
    # Python ecosystem
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    # Version control & utilities
    git \
    curl \
    wget \
    jq \
    vim \
    nano \
    htop \
    tree \
    zip \
    unzip \
    # Network tools
    openssh-client \
    netcat-openbsd \
    dnsutils \
    iputils-ping \
    # Container tools (for Docker-in-Docker scenarios)
    ca-certificates \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# =============================================================================
# Python Environment (Data Science Ready)
# =============================================================================
RUN python3 -m pip install --no-cache-dir --break-system-packages \
    # Core utilities
    pip \
    setuptools \
    wheel \
    virtualenv \
    pipx \
    # Data Science essentials
    numpy \
    pandas \
    matplotlib \
    scipy \
    scikit-learn \
    # Web & API
    requests \
    httpx \
    beautifulsoup4 \
    lxml \
    # Async & performance
    aiohttp \
    uvloop \
    # Dev tools
    black \
    ruff \
    pytest \
    rich \
    typer \
    pydantic

# =============================================================================
# Node.js Global Packages
# =============================================================================
RUN npm install -g --loglevel warn openclaw@latest
RUN npm install -g --loglevel warn typescript ts-node tsx
RUN npm install -g --loglevel warn esbuild vite
RUN npm install -g --loglevel warn npm-check-updates nodemon
RUN npm install -g --loglevel warn pm2 pnpm

# =============================================================================
# Bun Runtime (Fast JS/TS alternative)
# =============================================================================
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# =============================================================================
# Working Directory & Permissions
# =============================================================================
WORKDIR /workspace

# Create OpenClaw config directory
RUN mkdir -p /root/.openclaw

# =============================================================================
# Entrypoint & Health Check
# =============================================================================
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
COPY healthcheck.sh /usr/local/bin/healthcheck.sh
RUN chmod +x /usr/local/bin/entrypoint.sh /usr/local/bin/healthcheck.sh

# Health check - verify the node is connected
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD /usr/local/bin/healthcheck.sh

# Environment defaults
ENV OPENCLAW_GATEWAY_HOST="gateway.openclaw.svc.cluster.local"
ENV OPENCLAW_GATEWAY_PORT="18789"
ENV OPENCLAW_NODE_NAME=""
ENV OPENCLAW_GATEWAY_TOKEN=""
ENV OPENCLAW_AUTO_PAIR="true"
ENV OPENCLAW_LOG_LEVEL="info"

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
