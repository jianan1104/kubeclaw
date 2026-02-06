"use client";

import React, { useState } from "react";
import { 
  Activity, 
  Box, 
  Cpu, 
  Database, 
  ExternalLink, 
  LayoutDashboard, 
  Network, 
  Plus, 
  RefreshCcw, 
  Search, 
  ShieldCheck, 
  Terminal,
  Copy,
  Check
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const MOCK_NODES = [
  { id: "node-1", name: "kubeclaw-worker-a1", status: "Running", namespace: "default", cpu: "12%", mem: "256MB", age: "2d 4h" },
  { id: "node-2", name: "kubeclaw-worker-a2", status: "Running", namespace: "default", cpu: "8%", mem: "128MB", age: "2d 4h" },
  { id: "node-3", name: "kubeclaw-worker-b1", status: "Pending", namespace: "staging", cpu: "-", mem: "-", age: "12m" },
  { id: "node-4", name: "kubeclaw-worker-c1", status: "Failed", namespace: "prod", cpu: "-", mem: "-", age: "5h" },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const token = "oc_live_594671cd2f95926afdcde3ad4ff841496eee060e";

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 font-sans">
      {/* Sidebar Nav (Desktop) */}
      <div className="hidden border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-2xl">🦞</span>
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">KubeClaw</span>
          </div>
        </div>
        <nav className="flex flex-1 flex-col px-4 py-6 space-y-1">
          <Button variant="ghost" className="justify-start gap-3 bg-slate-800 text-white">
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Button>
          <Button variant="ghost" className="justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800">
            <Box className="h-4 w-4" />
            Nodes
          </Button>
          <Button variant="ghost" className="justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800">
            <ShieldCheck className="h-4 w-4" />
            Permissions
          </Button>
          <Button variant="ghost" className="justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800">
            <Terminal className="h-4 w-4" />
            Logs
          </Button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="rounded-lg bg-indigo-500/10 p-4 border border-indigo-500/20">
            <p className="text-xs font-medium text-indigo-300 mb-2">Cluster Status</p>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Health</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Optimal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-800 bg-slate-950/80 px-4 backdrop-blur-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
            <form className="relative flex flex-1 max-w-md">
              <Search className="pointer-events-none absolute inset-y-0 left-3 h-full w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search nodes, pods, or namespaces..."
                className="pl-10 bg-slate-900/50 border-slate-800 text-slate-300 focus:ring-indigo-500"
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500">
                <Plus className="h-4 w-4 mr-2" />
                Deploy Node
              </Button>
            </div>
          </div>
        </header>

        <main className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-400">Total Nodes</CardTitle>
                <Box className="h-4 w-4 text-indigo-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-slate-500">+2 from yesterday</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-400">Active Agents</CardTitle>
                <Activity className="h-4 w-4 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-emerald-500">All systems go</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-400">CPU Usage</CardTitle>
                <Cpu className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <Progress value={42} className="h-1 mt-2 bg-slate-800" />
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-400">Memory Usage</CardTitle>
                <Database className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.4 GB</div>
                <Progress value={64} className="h-1 mt-2 bg-slate-800" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Nodes Table */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Nodes</CardTitle>
                    <CardDescription className="text-slate-500 text-sm">Real-time status of your KubeClaw instances.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <RefreshCcw className="h-3.5 w-3.5 mr-2" />
                    Refresh
                  </Button>
                </CardHeader>
                <Table>
                  <TableHeader className="bg-slate-950/50">
                    <TableRow className="border-slate-800">
                      <TableHead className="text-slate-400">Name</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400">Namespace</TableHead>
                      <TableHead className="text-slate-400">CPU/Mem</TableHead>
                      <TableHead className="text-slate-400 text-right">Age</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_NODES.map((node) => (
                      <TableRow key={node.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                        <TableCell className="font-medium text-slate-200">{node.name}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={`
                              ${node.status === "Running" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                                node.status === "Pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : 
                                "bg-rose-500/10 text-rose-400 border-rose-500/20"}
                            `}
                          >
                            {node.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400 font-mono text-xs">{node.namespace}</TableCell>
                        <TableCell className="text-slate-400 text-xs">{node.cpu} / {node.mem}</TableCell>
                        <TableCell className="text-right text-slate-500 text-xs">{node.age}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Config & Token Panel */}
            <div className="space-y-6">
              <Card className="bg-slate-900 border-slate-800 border-l-4 border-l-indigo-500">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    Gateway Token
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-sm">
                    Use this token to manually pair new nodes with your OpenClaw Gateway.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-indigo-300 break-all border border-slate-800 pr-12">
                      {token}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleCopy}
                      className="absolute top-2 right-2 text-slate-500 hover:text-white hover:bg-slate-800"
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="mt-4 text-[10px] text-slate-500 leading-tight italic">
                    ⚠️ Keep this token private. Anyone with this token can pair nodes to your session.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Infrastructure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-slate-800">
                        <Network className="h-4 w-4 text-slate-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cluster Endpoints</p>
                        <p className="text-xs text-slate-500">10.0.0.12, 10.0.0.15</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-slate-800">
                        <Database className="h-4 w-4 text-slate-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Persistence</p>
                        <p className="text-xs text-slate-500">PVC Ready (100GB)</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
