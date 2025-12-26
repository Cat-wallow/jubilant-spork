import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ComplianceOverviewProps {
  data: {
    title: string;
    subtitle: string;
    items: Array<{
      label: string;
      count: number;
      percentage: number;
      color: string;
      bgColor: string;
    }>;
    period: string;
    totalCount: number;
  };
}

export function ComplianceOverview({ data }: ComplianceOverviewProps) {
  return (
    <Card className="rounded-[20px] border-none bg-white shadow-sm">
      <CardHeader className="p-[30px] pb-3">
        <CardTitle className="text-2xl font-bold text-[#3D4056]">{data.title}</CardTitle>
        <p className="text-base text-[#848A9A]">{data.subtitle}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-[30px] p-[30px] pt-0">
        {/* Status Items */}
        <div className="flex flex-col gap-[30px]">
          {data.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <p className="text-base text-[#656982]">{item.label}</p>
              <div className="flex items-center gap-3">
                <Badge
                  className="rounded-full px-[10px] py-1 font-normal"
                  style={{ backgroundColor: item.bgColor, color: item.color }}
                >
                  {item.count}
                </Badge>
                <p className="w-[42px] text-sm text-[#A2A6B3]">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="flex flex-col gap-5">
          <div className="h-[2px] w-full bg-[#D9D9D9]" />
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-[#9B9EAC]">{data.period}</p>
            <p className="text-xs text-[#9C9EAA]">{data.totalCount} total</p>
          </div>
          <div className="flex flex-col">
            <Progress value={100} className="h-[10px] bg-[#A3AED0]" indicatorClassName="bg-[#F9BE6C]" />
            <Progress value={80} className="h-[10px] bg-[#A3AED0]" indicatorClassName="bg-[#87A690]" />
          </div>
          <div className="flex flex-col">
            <Progress value={100} className="h-[10px] bg-[#A3AED0]" indicatorClassName="bg-[#A3AED0]" />
            <Progress value={91.7} className="h-[10px] bg-[#A3AED0]" indicatorClassName="bg-[#332687]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
