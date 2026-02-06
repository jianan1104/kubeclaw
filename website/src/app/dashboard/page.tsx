"use client"

import React, { useState } from "react"
import { 
  Activity, 
  Cpu, 
  Database, 
  Layers, 
  MoreHorizontal, 
  Plus, 
  RefreshCcw, 
  Search, 
  Server, 
  Shield, 
  Zap,
  Copy,
  Check,
  Terminal
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [tokenCopied, setTokenCopied] = useState(false)
  const pairingToken = "kb-live-7x2k-9p1m-4v6n-2q0w"

  const copyToken = () => {
    navigator.clipboard.writeText(pairingToken)
    setTokenCopied(true)
    setTimeout(() => setTokenCopied(false), 2000)
  }

  const nodes = [
    { name: "worker-prod-01", status: "Running", namespace: "default", age: "12d", cpu: 45, mem: 62 },
    { name: "worker-prod-02", status: "Running", namespace: "default", age: "12d", cpu: 32, mem: 58 },
    { name: "agent-edge-a1", status: "Running", namespace: "openclaw", age: "4d", cpu: 12, mem: 24 },
    { name: "agent-edge-a2", status: "Scaling", namespace: "openclaw", age: "2h", cpu: 85, mem: 40 },
    { name: "backup-node-01", status: "Idle", namespace: "system", age: "45d", cpu: 5, mem: 15 },
    { name: "gpu-node-v100", status: "Running", namespace: "ml-ops", age: "3d", cpu: 92, mem: 88 },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground pt-16">
      <main className="container flex-1 space-y-8 p-4 py-8 sm:p-8">
        {/* Page Title & Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-wider">
                System Active
              </Badge>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Region: us-east-1</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Orchestration Dashboard</h2>
            <p className="text-muted-foreground">Real-time status of your KubeClaw agent infrastructure.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 border-primary/20 bg-primary/5">
              <Terminal className="h-4 w-4" />
              CLI Access
            </Button>
            <Button size="sm" className="flex items-center gap-2 shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4" />
              Deploy Agent
            </Button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Server className="h-12 w-12" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Nodes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 font-medium">+2</span> added today
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="h-12 w-12 text-primary" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                <Activity className="h-3 w-3" /> 99.9% Uptime
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Performance</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42.5%</div>
              <Progress value={42.5} className="mt-2 h-1.5" />
            </CardContent>
          </Card>
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Load</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.2 GB</div>
              <Progress value={65} className="mt-2 h-1.5" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="nodes" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/30 border border-white/5">
              <TabsTrigger value="nodes" className="data-[state=active]:bg-background">Nodes</TabsTrigger>
              <TabsTrigger value="agents" className="data-[state=active]:bg-background">Agents</TabsTrigger>
              <TabsTrigger value="pairing" className="data-[state=active]:bg-background">Pairing</TabsTrigger>
            </TabsList>
            
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Filter resources..." 
                  className="h-8 w-[180px] rounded-md border border-input bg-background/50 pl-8 pr-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <RefreshCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <TabsContent value="nodes" className="space-y-4">
            <Card className="border-primary/5 bg-card/30 overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/20 border-b border-white/5">
                    <TableRow>
                      <TableHead className="pl-6 py-4">Node Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Namespace</TableHead>
                      <TableHead>Resource Monitor</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nodes.map((node) => (
                      <TableRow key={node.name} className="group border-b border-white/5 hover:bg-white/[0.02]">
                        <TableCell className="font-medium pl-6 py-4">
                          <div className="flex items-center gap-2">
                            <Server className="h-3.5 w-3.5 text-primary/70" />
                            {node.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={node.status === "Running" ? "success" : node.status === "Idle" ? "secondary" : "warning"}
                            className="text-[10px] px-2 py-0"
                          >
                            {node.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-[11px] text-muted-foreground">{node.namespace}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 w-[140px]">
                            <div className="flex items-center justify-between text-[9px] uppercase font-semibold text-muted-foreground/70">
                              <span>CPU {node.cpu}%</span>
                              <span>MEM {node.mem}%</span>
                            </div>
                            <div className="flex h-1 w-full overflow-hidden rounded-full bg-muted/40 gap-0.5">
                              <div 
                                className={cn("h-full transition-all", node.cpu > 80 ? "bg-destructive" : "bg-primary")} 
                                style={{ width: `${node.cpu}%` }} 
                              />
                              <div 
                                className="h-full bg-white/20 transition-all" 
                                style={{ width: `${node.mem}%` }} 
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">{node.age}</TableCell>
                        <TableCell className="text-right pr-6">
                          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pairing">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2 border-primary/10 bg-card/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Secure Pairing Protocol
                  </CardTitle>
                  <CardDescription>
                    Generate and manage cryptographic tokens for agent cluster authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Active Authentication Token</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 rounded-md border border-white/10 bg-black/40 p-4 font-mono text-sm tracking-wider flex items-center justify-between">
                        <span className="text-primary">{pairingToken}</span>
                        <div className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      </div>
                      <Button variant="outline" size="icon" className="h-[52px] w-[52px] border-white/10" onClick={copyToken}>
                        {tokenCopied ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      Warning: Tokens are transient and will rotate automatically in 18:42:10.
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/5 bg-muted/20 p-5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <Terminal className="h-3 w-3 text-primary" />
                      CLI Initialization
                    </h4>
                    <div className="space-y-2 font-mono text-xs text-muted-foreground/80">
                      <p className="flex items-center gap-2"><span className="text-primary/50">$</span> curl -sSL https://get.kubeclaw.io | bash</p>
                      <p className="flex items-center gap-2"><span className="text-primary/50">$</span> kubeclaw auth login --token <span className="text-white">********</span></p>
                      <p className="flex items-center gap-2"><span className="text-primary/50">$</span> kubeclaw cluster join --id prod-alpha-01</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/10 bg-card/50 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider">Audit Stream</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  {[
                    { event: "Pairing Success", target: "node:edge-west-1", time: "2m ago", color: "text-emerald-500" },
                    { event: "Secret Rotated", target: "system:auth-svc", time: "15m ago", color: "text-primary" },
                    { event: "Deploy Started", target: "agent:v2.4.1-rc1", time: "1h ago", color: "text-amber-500" },
                    { event: "Node Detached", target: "node:legacy-04", time: "3h ago", color: "text-muted-foreground" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 border-l-2 border-white/5 pl-4 py-1 group hover:border-primary/50 transition-colors">
                      <div className="flex-1">
                        <p className={cn("text-[11px] font-bold uppercase", activity.color)}>{activity.event}</p>
                        <p className="text-xs text-muted-foreground font-mono">{activity.target}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{activity.time}</span>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-[10px] uppercase tracking-widest h-8 text-muted-foreground hover:text-primary">
                    View Complete Audit Log
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="agents">
             <Card className="border-primary/5 bg-card/30">
              <CardContent className="flex h-[400px] flex-col items-center justify-center text-muted-foreground space-y-4">
                <div className="relative">
                  <Activity className="h-12 w-12 text-primary/20 animate-ping absolute inset-0" />
                  <Activity className="h-12 w-12 text-primary/40 relative z-10" />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">Synchronizing Fleet Status</h3>
                  <p className="text-sm max-w-[300px]">Establishing secure websocket connection to distributed agent clusters...</p>
                </div>
                <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-[shimmer_2s_infinite] w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-white/5 py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-muted-foreground uppercase tracking-widest bg-black/20">
        <div className="flex items-center gap-4">
          <span>&copy; 2026 KubeClaw Systems</span>
          <span className="hidden md:inline text-white/10">|</span>
          <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div> All Systems Operational</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors">Security Policy</a>
          <a href="#" className="hover:text-primary transition-colors">API Status</a>
        </div>
      </footer>
    </div>
  )
}
