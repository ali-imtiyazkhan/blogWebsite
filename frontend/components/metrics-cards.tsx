import { ArrowUpIcon, ArrowDownIcon, DollarSign, TrendingUp, Users, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Monthly Growth",
    value: "+12.5%",
    change: "+4.3%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Transactions",
    value: "12,234",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: CreditCard,
  },
]

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {metric.changeType === "positive" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-primary" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-destructive" />
              )}
              <span className={metric.changeType === "positive" ? "text-primary" : "text-destructive"}>
                {metric.change}
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
