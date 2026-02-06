import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ResourceMonitor() {
  return (
    <Card className="bg-background/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Cluster Resource Consumption</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-mono">CPU (Allocated)</span>
            <span className="font-bold">4.2 / 10 Cores</span>
          </div>
          <Progress value={42} className="h-1.5" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-mono">Memory (Used)</span>
            <span className="font-bold">7.2 / 10.5 GB</span>
          </div>
          <Progress value={68} className="h-1.5" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-mono">Storage (Persistent)</span>
            <span className="font-bold">128 / 500 GB</span>
          </div>
          <Progress value={25} className="h-1.5" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-mono">Network Ingress</span>
            <span className="font-bold text-emerald-500">Normal</span>
          </div>
          <Progress value={15} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  )
}
