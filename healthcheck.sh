#!/bin/bash
# =============================================================================
# KubeClaw Health Check Script
# =============================================================================
# Verifies the node process is running and responsive.
# Used by Kubernetes liveness/readiness probes.
# =============================================================================

# Check if the openclaw node process is running
if pgrep -f "openclaw node run" > /dev/null 2>&1; then
    exit 0
else
    exit 1
fi
