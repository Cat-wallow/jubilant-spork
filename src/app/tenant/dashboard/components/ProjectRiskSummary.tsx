import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProjectRiskSummaryProps {
  data: {
    title: string;
    subtitle: string;
    items: Array<{
      label: string;
      count: number;
      action: string;
      actionVariant: "default" | "secondary" | "outline";
    }>;
    footer: {
      label: string;
      value: string;
    };
  };
}

export function ProjectRiskSummary({ data }: ProjectRiskSummaryProps) {
  return (
    <Card className="rounded-[20px] border-none bg-white shadow-sm">
      <CardHeader className="p-[30px] pb-3">
        <CardTitle className="text-2xl font-bold text-[#3F4156]">{data.title}</CardTitle>
        <p className="text-base text-[#868A98]">{data.subtitle}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-[30px] p-[30px] pt-0">
        {/* Risk Items */}
        <div className="flex flex-col gap-[30px]">
          {data.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <p className="text-[17px] text-[#6A697B]">{item.label}</p>
              <div className="flex items-center gap-3">
                <Badge
                  className="h-7 rounded-md px-3 font-normal"
                  variant={
                    item.count === 5
                      ? "destructive"
                      : "secondary"
                  }
                  style={
                    item.count === 5
                      ? { backgroundColor: "#F74546", color: "#F9C9C7" }
                      : { backgroundColor: "#DAFAE3", color: "#519877" }
                  }
                >
                  {item.count}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 border-[#C5C4C5] bg-[#FEFDFE] text-sm font-bold text-[#6C7383]"
                >
                  {item.action}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-5">
          <div className="h-[2px] w-full bg-[#D9D9D9]" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6E7184]">{data.footer.label}</p>
            <p className="text-xs text-[#9C9EAA]">{data.footer.value}</p>
          </div>
          <div className="flex flex-col">
            <Progress value={100} className="h-[10px] bg-[#A3AED0]" indicatorClassName="bg-[#A3AED0]" />
            <Progress value={80} className="h-[10px] bg-[#A3AED0]" indicatorClassName="bg-[#332687]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
