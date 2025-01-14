import { BarChart2, Users } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartOne } from "../components/dashboard/ChartOne";
import { ChartTwo } from "../components/dashboard/ChartTwo";
import { ChartThree } from "../components/dashboard/ChartThree";
import { ChartFour } from "../components/dashboard/ChartFour";
import { ChartFive } from "../components/dashboard/ChartFive";

export default function Dashboard() {
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

  return (
    <div className="space-y-6 m-2">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <ChartOne />
        </div>
        <div className="lg:col-span-2">
          <ChartTwo />
        </div>

        <div className="lg:col-span-2">
          <ChartFour />
        </div>
        <div className="lg:col-span-2">
          <ChartFive />
        </div>
      </div>
    </div>
  );
}
