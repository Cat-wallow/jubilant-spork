import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, MoreHorizontal } from "lucide-react";

interface TopAttentionTableProps {
  data: {
    title: string;
    subtitle: string;
    columns: string[];
    rows: Array<{
      projectCode: string;
      client: string;
      period: string;
      module: string;
      daysOverdue: string;
      owner: string;
      riskLevel: string;
      riskVariant: "destructive" | "default";
    }>;
  };
}

export function TopAttentionTable({ data }: TopAttentionTableProps) {
  return (
    <Card className="rounded-[20px] border-none bg-white shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between p-[30px]">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-2xl font-bold text-[#2B3674]">{data.title}</CardTitle>
          <p className="text-xs leading-4 tracking-[0.4px] text-[#2B3674]">{data.subtitle}</p>
        </div>
        <div className="flex items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-1 rounded-[10px] border-[#CAC4D0] bg-white px-3 py-2"
              >
                <span className="text-sm font-medium text-[#49454F]">All Status</span>
                <ChevronDown className="h-3 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Status</DropdownMenuItem>
              <DropdownMenuItem>High Risk</DropdownMenuItem>
              <DropdownMenuItem>Medium Risk</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="gap-1 rounded-[10px] border-[#CAC4D0] bg-[#F9FAFB] px-3 py-2"
          >
            <Filter className="h-6 w-6" />
            <span className="text-sm font-medium text-[#49454F]">Filter</span>
          </Button>

          <Button variant="ghost" size="icon" className="h-[37px] w-[37px] rounded-[10px] bg-[#F4F7FE]">
            <MoreHorizontal className="h-6 w-6 text-[#4318FF]" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-[10px] p-[30px] pt-0">
        {/* Table Header */}
        <div className="flex items-center justify-between">
          {data.columns.map((column, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2"
              style={{ width: idx === data.columns.length - 1 ? "196px" : "120px" }}
            >
              <span className="text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
                {column}
              </span>
              <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="h-[1px] w-full bg-[#E9EDF7]" />

        {/* Table Rows */}
        {data.rows.map((row, idx) => (
          <div key={idx} className="flex items-center justify-between py-2">
            <div style={{ width: "120px" }}>
              <p className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
                {row.projectCode}
              </p>
            </div>
            <div style={{ width: "120px" }}>
              <p className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
                {row.client}
              </p>
            </div>
            <div style={{ width: "120px" }}>
              <Badge
                variant="outline"
                className="rounded-md border-[#C2C5CC] bg-[#EEEFF1] font-normal text-[#7C7D8C]"
              >
                {row.period}
              </Badge>
            </div>
            <div style={{ width: "120px" }}>
              <Badge
                variant="outline"
                className="rounded-md border-[#C3C7CE] bg-[#EEEEF0] font-normal text-[#80838F]"
              >
                {row.module}
              </Badge>
            </div>
            <div style={{ width: "120px" }}>
              <Badge className="rounded-md border-[#FEC4BE] bg-[#F9E6E7] font-normal text-[#E47174]">
                {row.daysOverdue}
              </Badge>
            </div>
            <div style={{ width: "120px" }}>
              <p className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
                {row.owner}
              </p>
            </div>
            <div style={{ width: "120px" }}>
              <Badge
                className="rounded-md border-[#FEC4BF] bg-[#F9E6E7] font-normal text-[#E3646A]"
              >
                {row.riskLevel}
              </Badge>
            </div>
            <div style={{ width: "196px" }} className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-[#676A79]">View</span>
              <Button
                variant="outline"
                size="sm"
                className="h-[31px] rounded-md border-[#C5C4C5] bg-[#FEFDFE] text-sm font-bold text-[#6C7383]"
              >
                Assign
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-[31px] rounded-md border-[#C4C3C4] bg-[#FEFDFE] text-sm font-normal text-[#62687A]"
              >
                Nudge
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
