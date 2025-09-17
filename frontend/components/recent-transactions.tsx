import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  {
    id: "TXN-001",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "TXN-002",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "TXN-003",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    status: "pending",
    date: "2024-01-13",
  },
  {
    id: "TXN-004",
    customer: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    status: "completed",
    date: "2024-01-12",
  },
  {
    id: "TXN-005",
    customer: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    status: "failed",
    date: "2024-01-11",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>You made 265 transactions this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{transaction.customer}</span>
                    <span className="text-sm text-muted-foreground">{transaction.email}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-primary">{transaction.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "default"
                        : transaction.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
