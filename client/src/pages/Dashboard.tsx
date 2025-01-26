import { BarChart2, Users } from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { ChartOne } from "../components/dashboard/ChartOne";
import { ChartTwo } from "../components/dashboard/ChartTwo";
import { ChartFour } from "../components/dashboard/ChartFour";
import { ChartFive } from "../components/dashboard/ChartFive";
import { DemoLineChart } from "../components/dashboard/charts/DemoLineChart";
import { Outlet } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AlertsPage from './Alerts'; // added new import for Alerts Page that i have created - evidently is wrong

export default function Dashboard() {
  // Mock data
  const statsData = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      trend: "+20.1% from last month",
      Icon: BarChart2,
    },
    {
      title: "Active Users",
      value: "2,350",
      trend: "+180.1% from last month",
      Icon: Users,
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      trend: "+2.5% from last month",
      Icon: BarChart2,
    },
    {
      title: "AI Predictions",
      value: "85%",
      trend: "+5% from last month",
      Icon: BarChart2,
    },

    // Add more stats as needed
  ];

  const tableData = [
    {
      invoice: "INV001",
      status: "Paid",
      method: "Credit Card",
      amount: "$250.00",
    },
    {
      invoice: "INV002",
      status: "Pending",
      method: "PayPal",
      amount: "$150.00",
    },
    {
      invoice: "INV003",
      status: "Paid",
      method: "Bank Transfer",
      amount: "$1,250.00",
    },
    {
      invoice: "INV004",
      status: "Overdue",
      method: "Credit Card",
      amount: "$500.00",
    },
    {
      invoice: "INV005",
      status: "Paid",
      method: "Credit Card",
      amount: "$300.00",
    },
    {
      invoice: "INV006",
      status: "Pending",
      method: "PayPal",
      amount: "$200.00",
    },
    {
      invoice: "INV007",
      status: "Paid",
      method: "Bank Transfer",
      amount: "$750.00",
    },
    {
      invoice: "INV008",
      status: "Overdue",
      method: "Credit Card",
      amount: "$400.00",
    },
    {
      invoice: "INV009",
      status: "Paid",
      method: "Credit Card",
      amount: "$600.00",
    },
    {
      invoice: "INV010",
      status: "Pending",
      method: "PayPal",
      amount: "$100.00",
    },
    {
      invoice: "INV011",
      status: "Paid",
      method: "Bank Transfer",
      amount: "$1,000.00",
    },
    {
      invoice: "INV012",
      status: "Overdue",
      method: "Credit Card",
      amount: "$450.00",
    },
    {
      invoice: "INV013",
      status: "Paid",
      method: "Credit Card",
      amount: "$350.00",
    },
    {
      invoice: "INV014",
      status: "Pending",
      method: "PayPal",
      amount: "$250.00",
    },
    {
      invoice: "INV015",
      status: "Paid",
      method: "Bank Transfer",
      amount: "$1,500.00",
    },
    {
      invoice: "INV016",
      status: "Overdue",
      method: "Credit Card",
      amount: "$550.00",
    },
    {
      invoice: "INV017",
      status: "Paid",
      method: "Credit Card",
      amount: "$700.00",
    },
    {
      invoice: "INV018",
      status: "Pending",
      method: "PayPal",
      amount: "$300.00",
    },
    {
      invoice: "INV019",
      status: "Paid",
      method: "Bank Transfer",
      amount: "$1,750.00",
    },
    {
      invoice: "INV020",
      status: "Overdue",
      method: "Credit Card",
      amount: "$600.00",
    },
    {
      invoice: "INV021",
      status: "Paid",
      method: "Credit Card",
      amount: "$800.00",
    },
    {
      invoice: "INV022",
      status: "Pending",
      method: "PayPal",
      amount: "$350.00",
    },
    {
      invoice: "INV023",
      status: "Paid",
      method: "Bank Transfer",
      amount: "$2,000.00",
    },
    {
      invoice: "INV024",
      status: "Overdue",
      method: "Credit Card",
      amount: "$650.00",
    },
    {
      invoice: "INV025",
      status: "Paid",
      method: "Credit Card",
      amount: "$900.00",
    },
  ];

  return (
    <div className="space-y-6 m-2">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <h1 className="text-2xl font-semibold">
        <Outlet />
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      <div>
        <Collapsible className="mt-4">
          <CollapsibleTrigger className="font-semibold text-lg">
            Invoice Data
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  {Object.keys(tableData[0]).map((key, index) => (
                    <TableHead
                      key={index}
                      className={key === "amount" ? "text-right" : "w-[100px]"}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {data.invoice}
                    </TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.method}</TableCell>
                    <TableCell className="text-right">{data.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div>
        <Collapsible className="mt-4">
          <CollapsibleTrigger className="font-semibold text-lg">
            Charts
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <ChartOne />
              </div>
              <div className="lg:col-span-2">
                <ChartTwo />
              </div>
              <div className="lg:col-span-2">
                <ChartFive />
              </div>
              <div className="lg:col-span-2">
                <DemoLineChart />
              </div>
              <div className="lg:col-span-4">
                <ChartFour />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
