"use client"

import { OverviewCards } from "@/components/dashboard/overview-cards"
import { NodesTable } from "@/components/dashboard/nodes-table"
import { ResourceMonitor } from "@/components/dashboard/resource-monitor"
import { PairingManagement } from "@/components/dashboard/pairing-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DotPattern } from "@/components/ui/dot-pattern"
import { Plus, Download, RefreshCw, LayoutDashboard, Server, Settings, Shield } from "lucide-react"
import { motion } from "motion/react"

export default function DashboardPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden bg-background">
      <DotPattern 
        width={32} 
        height={32} 
        cx={1} 
        cy={1} 
        cr={0.5} 
        glow={true}
        className="opacity-20 [mask-image:radial-gradient(white,transparent_85%)]" 
      />
      
      <div className="flex flex-col gap-8 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">System Status: Operational</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              KubeClaw Dashboard
            </h1>
            <p className="text-muted-foreground mt-1 font-mono text-xs uppercase tracking-wider opacity-70">
              Cluster: oc-production-v1 // Node ID: 8829-X
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex border-primary/20 bg-primary/5">
              <Download className="mr-2 h-4 w-4" />
              Export Config
            </Button>
            <Button size="sm" className="shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" />
              Deploy Agent
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="bg-background/50 border border-border/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="nodes" className="gap-2">
                <Server className="h-4 w-4" />
                Nodes
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <div className="hidden md:flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
              <RefreshCw className="h-3 w-3 animate-spin-slow" />
              Auto-sync: 5s
            </div>
          </div>

          <TabsContent value="overview" className="space-y-8 mt-0 border-none p-0 outline-none">
            {/* Metrics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <OverviewCards />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Nodes List */}
              <motion.div 
                className="lg:col-span-2 space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    Active Resource Nodes
                  </h2>
                  <Button variant="link" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                    View Fleet Details →
                  </Button>
                </div>
                <NodesTable />
              </motion.div>

              {/* Sidebar Content */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <ResourceMonitor />
                <PairingManagement />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="nodes" className="mt-0">
             <div className="min-h-[400px] flex flex-col items-center justify-center border border-dashed border-border/50 rounded-lg bg-background/30 backdrop-blur-sm p-12 text-center">
                <Server className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Extended Node Management</h3>
                <p className="text-muted-foreground max-w-sm italic">
                  Advanced fleet orchestration and deep-level hardware telemetry view is currently being calibrated for this cluster.
                </p>
             </div>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
             <div className="min-h-[400px] flex flex-col items-center justify-center border border-dashed border-border/50 rounded-lg bg-background/30 backdrop-blur-sm p-12 text-center">
                <Shield className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Security & Compliance</h3>
                <p className="text-muted-foreground max-w-sm italic">
                  RBAC policies and cryptographically signed audit logs are being synchronized with the OpenClaw Gateway.
                </p>
             </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
             <div className="min-h-[400px] flex flex-col items-center justify-center border border-dashed border-border/50 rounded-lg bg-background/30 backdrop-blur-sm p-12 text-center">
                <Settings className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cluster Settings</h3>
                <p className="text-muted-foreground max-w-sm italic">
                  Global cluster configuration and orchestration parameters. Changes require high-level authorization.
                </p>
             </div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold opacity-60">
        <div className="flex items-center gap-4">
          <span>© 2026 KubeClaw Orchestration</span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div> v2.4.1 Stable</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors">API Keys</a>
          <a href="#" className="hover:text-primary transition-colors">Audit Logs</a>
        </div>
      </footer>
    </main>
  )
}
