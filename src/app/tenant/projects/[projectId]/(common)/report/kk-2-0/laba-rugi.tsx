"use client";

import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from "lucide-react";
import { labaRugiData } from "./data";
import { ReportFilters } from "./components/report-filters";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function LabaRugiTab() {
  return (
    <div className="flex flex-col gap-5 self-stretch rounded-[20px] shadow-[0_1px_2px_0_rgba(0,0,0,0.3),0_1px_3px_1px_rgba(0,0,0,0.15)]">
      <div className="flex items-start justify-between self-stretch">
        <div className="flex flex-col">
          <h2 className="font-dm-sans text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
            Laba-Rugi Statement
          </h2>
          <p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
            Kelola Invoice di dalam Project
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            className="flex items-center gap-1 rounded-[10px] border border-[#D9D9D9]"
          >
            <Download className="h-[30px] w-[30px] text-[#404040]" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
              Export XLSX
            </span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1 rounded-[10px] border border-[#D9D9D9]"
          >
            <Download className="h-[30px] w-[30px] text-[#404040]" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
              Export PDF
            </span>
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-5 self-stretch">
        <div className="flex flex-1 flex-col gap-5">
          <ReportFilters />

          <div className="flex w-[823px] flex-col gap-2.5">
            <div className="flex w-[1080px] items-center justify-between">
              <div className="flex w-[150px] shrink-0 items-center gap-2.5">
                <div className="font-dm-sans text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
                  Akun
                </div>
                <ChevronDown className="h-6 w-6 shrink-0 text-[#A3AED0]" />
              </div>
              <div className="flex w-[150px] shrink-0 items-center gap-2.5">
                <div className="font-dm-sans text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
                  Januari
                </div>
                <ChevronDown className="h-6 w-6 shrink-0 text-[#A3AED0]" />
              </div>
              <div className="flex w-[120px] shrink-0 items-center gap-[7px]">
                <div className="font-dm-sans text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
                  Februari
                </div>
                <ChevronDown className="h-6 w-6 shrink-0 text-[#A3AED0]" />
              </div>
              <div className="flex w-[120px] shrink-0 items-center gap-[7px]">
                <div className="font-dm-sans text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
                  Market
                </div>
                <ChevronDown className="h-6 w-6 shrink-0 text-[#A3AED0]" />
              </div>
              <div className="flex w-[120px] shrink-0 items-center gap-[7px]">
                <div className="font-dm-sans text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
                  YTD
                </div>
              </div>
            </div>

            {labaRugiData.categories.map((category, idx) => (
              <div key={idx} className="flex w-[1070px] items-center justify-between">
                <div className="flex w-[150px] shrink-0 items-center gap-2.5">
                  <div className="w-[120px] shrink-0 font-inter text-sm font-medium leading-[14px] text-[#404040]">
                    {category.name}
                  </div>
                </div>
                <div className="flex w-[120px] shrink-0 flex-col gap-2.5">
                  <div className="w-[120px] font-inter text-sm font-medium leading-[14px] text-[#404040]">
                    {category.januari}
                  </div>
                </div>
                <div className="flex w-[120px] shrink-0 flex-col gap-2.5">
                  <div className="w-[120px] font-inter text-sm font-medium leading-[14px] text-[#404040]">
                    {category.februari}
                  </div>
                </div>
                <div className="flex w-[120px] shrink-0 flex-col gap-2.5">
                  <div className="w-[120px] font-inter text-sm font-medium leading-[14px] text-[#404040]">
                    {category.maret}
                  </div>
                </div>
                <div className="flex w-[120px] shrink-0 flex-col gap-2.5">
                  <div className="w-[120px] font-inter text-sm font-medium leading-[14px] text-[#404040]">
                    {category.ytd}
                  </div>
                </div>
              </div>
            ))}

            <div className="h-px w-[1080px]" />
          </div>
        </div>

        <div className="h-[410px] w-[600px] rounded-[20px] border border-[rgba(145,158,171,0.2)] p-4">
          <div className="mb-4 font-dm-sans text-lg font-bold text-[#2B3674]">
            Trend Analysis
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={labaRugiData.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis stroke="#6B7280" tick={{ fill: "#6B7280", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="pendapatan"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", r: 4 }}
                name="Pendapatan"
              />
              <Line
                type="monotone"
                dataKey="hpp"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: "#EF4444", r: 4 }}
                name="HPP"
              />
              <Line
                type="monotone"
                dataKey="labaKotor"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: "#F59E0B", r: 4 }}
                name="Laba Kotor"
              />
              <Line
                type="monotone"
                dataKey="bebanOperasional"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: "#8B5CF6", r: 4 }}
                name="Beban Operasional"
              />
              <Line
                type="monotone"
                dataKey="labaBersih"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", r: 4 }}
                name="Laba Bersih"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
