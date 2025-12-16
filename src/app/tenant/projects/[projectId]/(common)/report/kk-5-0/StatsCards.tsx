import { FileText, FileCheck, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const statsData = [
  {
    icon: FileText,
    iconColor: "#332687",
    label: "Total BAST",
    value: "22",
    subtitle: (
      <div className="flex items-start gap-[5px]">
        <span className="font-dm text-xs font-bold leading-5 tracking-[-0.24px] text-[#05CD99]">
          2 Signed
        </span>
        <span className="font-dm text-xs font-normal leading-5 tracking-[-0.24px] text-[#A3AED0]">
          2 Pending
        </span>
      </div>
    ),
  },
  {
    icon: FileCheck,
    iconColor: "#332687",
    label: "Total Invoice",
    value: "22",
    subtitle: (
      <span className="font-dm text-xs font-normal leading-5 tracking-[-0.24px] text-[#A3AED0]">
        Semua invoice project
      </span>
    ),
  },
  {
    icon: CheckCircle2,
    iconColor: "#332687",
    label: "Paid Amount",
    value: "Rp. 12.000.000",
    subtitle: null,
  },
  {
    icon: Clock,
    iconColor: "#332687",
    label: "Unpaid Amount",
    value: "Rp.20.000.000",
    subtitle: null,
  },
  {
    icon: AlertCircle,
    iconColor: "#332687",
    label: "Overdue",
    value: "3 Invoice",
    subtitle: null,
  },
];

export function StatsCards() {
  return (
    <div className="flex items-start gap-[30px] self-stretch">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] border border-[rgba(145,158,171,0.20)] px-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]"
        >
          <div className="flex h-[56px] w-[56px] items-center justify-center gap-2.5 rounded-[28px]">
            <stat.icon className="h-[30px] w-[30px] shrink-0" style={{ color: stat.iconColor }} />
          </div>
          <div className="flex flex-col items-start">
            <div className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
              {stat.label}
            </div>
            <div className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">
              {stat.value}
            </div>
            {stat.subtitle}
          </div>
        </div>
      ))}
    </div>
  );
}
