import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Users, Cpu, MemoryStick } from "lucide-react"

const metrics = [
  {
    title: "Total Nodes",
    value: "12",
    description: "+2 from last hour",
    icon: Server,
    color: "text-blue-500",
  },
  {
    title: "Active Agents",
    value: "124",
    description: "Across all namespaces",
    icon: Users,
    color: "text-emerald-500",
  },
  {
    title: "CPU Usage",
    value: "42%",
    description: "Cluster average",
    icon: Cpu,
    color: "text-amber-500",
  },
  {
    title: "Memory Usage",
    value: "68%",
    description: "7.2GB / 10.5GB",
    icon: MemoryStick,
    color: "text-purple-500",
  },
]

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-background/50 border-border/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
