"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Terminal, RefreshCw } from "lucide-react"

const nodes = [
  {
    name: "worker-01",
    status: "Running",
    namespace: "kube-system",
    age: "12d",
    cpu: "12%",
    memory: "1.2GB",
  },
  {
    name: "worker-02",
    status: "Running",
    namespace: "default",
    age: "5d",
    cpu: "24%",
    memory: "2.4GB",
  },
  {
    name: "agent-node-alpha",
    status: "Pending",
    namespace: "openclaw",
    age: "2m",
    cpu: "0%",
    memory: "0.5GB",
  },
  {
    name: "worker-03",
    status: "Failed",
    namespace: "production",
    age: "1h",
    cpu: "0%",
    memory: "0GB",
  },
  {
    name: "worker-04",
    status: "Running",
    namespace: "default",
    age: "12d",
    cpu: "8%",
    memory: "1.1GB",
  },
]

export function NodesTable() {
  return (
    <div className="rounded-md border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Namespace</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nodes.map((node) => (
            <TableRow key={node.name} className="border-border/50">
              <TableCell className="font-mono text-xs">{node.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    node.status === "Running"
                      ? "success"
                      : node.status === "Pending"
                      ? "warning"
                      : "destructive"
                  }
                  className="font-normal"
                >
                  {node.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{node.namespace}</TableCell>
              <TableCell className="text-muted-foreground">{node.age}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon-sm" title="Logs">
                    <Terminal className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" title="Restart">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
