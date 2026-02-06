# KubeClaw Auto-Pairing Controller Design

## Objective
Eliminate the need for manual `openclaw nodes approve <requestId>` commands when deploying nodes via KubeClaw.

## Architecture

1.  **Identity Injection**: When the Helm Chart creates a Node Pod, it includes a unique UUID as an environment variable (e.g., `KUBECLAW_POD_ID`).
2.  **Request Observation**: The KubeClaw node, upon startup, sends its `KUBECLAW_POD_ID` as part of its name or description in the pairing request to the Gateway.
3.  **Controller Loop**:
    *   **Watch**: The Controller watches the K8s API for Pods with the label `app.kubernetes.io/name: kubeclaw`.
    *   **Query**: The Controller queries the OpenClaw Gateway (via CLI or API) for pending node requests.
    *   **Match**: If a pending request's description matches a currently running Pod's `KUBECLAW_POD_ID`.
    *   **Approve**: The Controller issues an `openclaw nodes approve <requestId>` command to the Gateway.

## Pseudo-Code (Logic Flow)

```python
def controller_loop():
    while True:
        # 1. Get all running KubeClaw Pod IDs from K8s
        valid_pod_ids = k8s_client.get_pods(label="app=kubeclaw").get_env("KUBECLAW_POD_ID")
        
        # 2. Get pending requests from OpenClaw Gateway
        pending_requests = gateway_client.run("openclaw nodes pending --json")
        
        # 3. Match and Approve
        for req in pending_requests:
            if req.description in valid_pod_ids:
                print(f"Auto-approving node: {req.id}")
                gateway_client.run(f"openclaw nodes approve {req.id}")
        
        sleep(30) # Poll every 30 seconds
```

## Security Considerations
*   **RBAC**: The Controller needs a ServiceAccount with permissions to list Pods.
*   **Gateway Access**: The Controller needs the Gateway Token to issue approval commands.
*   **Spoofing Prevention**: Pod identity should be verified using Kubernetes TokenReviews or strict internal networking (MTLS) in future versions.
