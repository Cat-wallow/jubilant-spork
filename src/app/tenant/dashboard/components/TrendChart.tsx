"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface TrendChartProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    chartData: Array<{
      month: string;
      percentage: number;
    }>;
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="border-[0.8px] border-black/10 shadow-lg">
        <CardContent className="flex flex-col gap-1 p-3">
          <p className="text-sm font-normal text-[#0A0A0A]">{label}</p>
          <p className="text-lg font-semibold text-[#4F46E5]">
            {payload[0].value.toFixed(1)}%
          </p>
        </CardContent>
      </Card>
    );
  }
  return null;
};

export function TrendChart({ data }: TrendChartProps) {
  return (
    <Card className="rounded-[20px] border-none bg-white shadow-sm">
      <CardHeader className="p-[30px] pb-5">
        <CardTitle className="text-2xl font-bold text-[#3D4056]">{data.title}</CardTitle>
        <p className="text-sm text-[#848A9A]">{data.subtitle}</p>
      </CardHeader>
      <CardContent className="px-[30px] pb-[30px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF7" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#A3AED0", fontSize: 12 }}
              axisLine={{ stroke: "#E9EDF7" }}
            />
            <YAxis
              tick={{ fill: "#A3AED0", fontSize: 12 }}
              axisLine={{ stroke: "#E9EDF7" }}
              domain={[80, 95]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ fill: "#4F46E5", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-4 text-sm text-[#717182]">{data.description}</p>
      </CardContent>
    </Card>
  );
}
