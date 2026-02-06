"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, ShieldCheck } from "lucide-react"

export function PairingManagement() {
  const [copied, setCopied] = useState(false)
  const token = "oc-gw-7729-x-a2ui-beta-9921"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-background/50 border-border/50 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <ShieldCheck className="h-24 w-24" />
      </div>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Pairing Management</CardTitle>
        <CardDescription>Use this token to connect your OpenClaw Gateway to this cluster.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50 border border-border/50 font-mono text-sm relative overflow-hidden">
          <span className="truncate flex-1">{token}</span>
          <Button 
            size="icon-sm" 
            variant="ghost" 
            onClick={copyToClipboard}
            className="hover:bg-background"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            Rotate Token
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            View Config
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
