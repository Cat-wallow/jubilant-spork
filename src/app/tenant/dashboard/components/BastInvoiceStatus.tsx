import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BastInvoiceStatusProps {
  data: {
    title: string;
    items: Array<{
      label: string;
      count: number;
      action: string;
    }>;
    footer: {
      label: string;
      value: string;
    };
    actions: Array<{
      label: string;
    }>;
  };
}

export function BastInvoiceStatus({ data }: BastInvoiceStatusProps) {
  return (
    <Card className="rounded-[20px] border-none bg-white shadow-sm">
      <CardHeader className="p-[30px] pb-[30px]">
        <CardTitle className="text-2xl font-bold text-[#4C5062]">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-[30px] p-[30px] pt-0">
        {/* Status Items */}
        <div className="flex flex-col gap-[30px]">
          {data.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <p className="text-base text-[#6E6E80]">{item.label}</p>
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
            <p className="text-base text-[#62677C]">{data.footer.label}</p>
            <p className="text-sm font-bold text-[#404040]">{data.footer.value}</p>
          </div>
          <div className="flex items-center gap-0">
            {data.actions.map((action, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="h-11 flex-1 rounded-sm border-[#E9EBED] bg-[#F8FAFC] text-[13px] font-normal text-[#717A8B]"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
