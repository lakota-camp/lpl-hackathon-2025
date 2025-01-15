"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useStateData } from "../../hooks/useMockData";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function CustomToolTips({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const value = payload[0]?.value;
    const color = payload[0]?.color || "var(--chart-1)"; // Default color fallback

    return (
      <div className="min-w-[8rem] p-2 rounded-lg border border-border/50 bg-background shadow-xl text-xs">
        {/* Label */}
        <div className="font-medium mb-1">{label}</div>
        {/* Value with indicator */}
        <div className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: color,
            }}
          ></div>
          <span className="font-mono font-medium text-foreground">
            {value?.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }

  return null;
}

export function ChartFour() {
  const { data, error, isLoading } = useStateData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available to display.</div>;
  }
  console.log("Data in ChartFour", data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>US State Data</CardTitle>
        <CardDescription>State Population Data from each State</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="state"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<CustomToolTips />} />
            <Bar dataKey="population" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
