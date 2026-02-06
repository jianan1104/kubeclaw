#!/bin/bash
set -e

# Default values if not provided
GATEWAY_HOST=${OPENCLAW_GATEWAY_HOST:-"127.0.0.1"}
GATEWAY_PORT=${OPENCLAW_GATEWAY_PORT:-"18789"}
NODE_NAME=${OPENCLAW_NODE_NAME:-"kubeclaw-node-$(hostname)"}

echo "Starting KubeClaw Node: $NODE_NAME"
echo "Connecting to Gateway: $GATEWAY_HOST:$GATEWAY_PORT"

# Run the node
exec openclaw node run \
    --host "$GATEWAY_HOST" \
    --port "$GATEWAY_PORT" \
    --display-name "$NODE_NAME" \
    $( [ -n "$OPENCLAW_GATEWAY_TOKEN" ] && echo "--token $OPENCLAW_GATEWAY_TOKEN" )
