"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Chart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
Chart.displayName = "Chart";

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
ChartContainer.displayName = "ChartContainer";

const ChartTooltip = ({
  active,
  payload,
  label,
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-lg">
        <p className="mb-2 text-sm font-semibold text-[#0F172B]">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-[#62748E]">
              {entry.name}: {entry.value?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ChartLegend = ({ payload }: any) => {
  return (
    <div className="flex items-center justify-center gap-6">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-[#62748E]">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export { Chart, ChartContainer, ChartTooltip, ChartLegend };
