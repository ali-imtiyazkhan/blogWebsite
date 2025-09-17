import { BarChart3, CreditCard, Home, Settings, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", icon: Home, current: true },
  { name: "Transactions", icon: CreditCard, current: false },
  { name: "Analytics", icon: BarChart3, current: false },
  { name: "Growth", icon: TrendingUp, current: false },
  { name: "Customers", icon: Users, current: false },
  { name: "Settings", icon: Settings, current: false },
]

export function DashboardSidebar() {
  return (
    <div className="w-64 bg-sidebar border-r">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">PayFlow</span>
        </div>
      </div>

      <nav className="px-4 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={item.current ? "default" : "ghost"}
            className={cn("w-full justify-start", item.current && "bg-sidebar-primary text-sidebar-primary-foreground")}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </nav>
    </div>
  )
}
