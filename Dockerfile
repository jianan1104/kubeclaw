# Use Node.js LTS as base
FROM node:20-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Install OpenClaw CLI
RUN npm install -g @openclaw/cli

# Setup workspace
WORKDIR /app
RUN mkdir -p /root/.openclaw

# Entrypoint script to handle startup
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
