"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SptStatusChartProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    chartData: Array<{
      month: string;
      dihasilkan: number;
      pending: number;
      disetujui: number;
    }>;
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="border-[0.8px] border-black/10 shadow-lg">
        <CardContent className="flex flex-col gap-2 p-3">
          <p className="text-sm font-normal text-[#0A0A0A]">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-normal text-[#0A0A0A]">{entry.name}</span>
              </div>
              <span className="text-sm font-normal text-[#0A0A0A]">{entry.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  return null;
};

export function SptStatusChart({ data }: SptStatusChartProps) {
  return (
    <Card className="rounded-[20px] border-none bg-white shadow-sm">
      <CardHeader className="p-[30px] pb-5">
        <CardTitle className="text-2xl font-bold text-[#3D4056]">{data.title}</CardTitle>
        <p className="text-sm text-[#848A9A]">{data.subtitle}</p>
      </CardHeader>
      <CardContent className="px-[30px] pb-[30px]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF7" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#A3AED0", fontSize: 12 }}
              axisLine={{ stroke: "#E9EDF7" }}
            />
            <YAxis
              tick={{ fill: "#A3AED0", fontSize: 12 }}
              axisLine={{ stroke: "#E9EDF7" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
            <Bar dataKey="disetujui" stackId="a" fill="#4F46E5" radius={[0, 0, 0, 0]} />
            <Bar dataKey="pending" stackId="a" fill="#FC0" radius={[0, 0, 0, 0]} />
            <Bar dataKey="dihasilkan" stackId="a" fill="#16A34A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-4 text-sm text-[#717182]">{data.description}</p>
      </CardContent>
    </Card>
  );
}
