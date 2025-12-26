import { Card } from "@/components/ui/card";
import { Users, Briefcase, Clock, ClipboardCheck, DollarSign } from "lucide-react";

const iconMap = {
  users: Users,
  briefcase: Briefcase,
  clock: Clock,
  clipboard: ClipboardCheck,
  dollar: DollarSign,
};

interface KpiCardProps {
  data: Array<{
    icon: keyof typeof iconMap;
    label: string;
    value: string;
    change: string;
    changeLabel: string;
    changeColor: string;
  }>;
}

export function KpiCards({ data }: KpiCardProps) {
  return (
    <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-5">
      {data.map((card, idx) => {
        const Icon = iconMap[card.icon];
        return (
          <Card key={idx} className="h-[97px] rounded-[20px] border-none bg-white shadow-sm">
            <div className="flex h-full items-center gap-[18px] p-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
                <Icon className="h-[30px] w-[30px] text-[#332687]" />
              </div>
              <div className="flex flex-col gap-[3px]">
                <p className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
                  {card.label}
                </p>
                <p className="text-2xl font-bold leading-8 tracking-[-0.48px] text-[#0B1437]">
                  {card.value}
                </p>
                <div className="flex items-center gap-1 text-xs font-normal leading-5 tracking-[-0.24px]">
                  <span className={`font-bold ${card.changeColor}`}>{card.change}</span>
                  <span className="text-[#A3AED0]">{card.changeLabel}</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
