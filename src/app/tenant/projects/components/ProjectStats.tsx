import { ClipboardList, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function ProjectStats() {
  const stats = [
    {
      icon: ClipboardList,
      label: 'Active Project',
      value: '30',
      change: '+23%',
      changeLabel: 'dari tahun lalu',
      changeColor: 'text-[#05CD99]',
    },
    {
      icon: Users,
      label: 'Team Members',
      value: '10',
      change: '2 active',
      changeLabel: 'assignmet',
      changeColor: 'text-[#05CD99]',
    },
    {
      icon: AlertCircle,
      label: 'Overdue',
      value: '10',
      change: 'Requires',
      changeLabel: 'your attention',
      changeColor: 'text-[#05CD99]',
    },
    {
      icon: CheckCircle,
      label: 'Ready for BAST',
      value: '10',
      change: 'Ready',
      changeLabel: 'to finalize',
      changeColor: 'text-[#05CD99]',
    },
  ];

  return (
    <div className="flex items-start gap-[30px]">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] bg-white px-5 py-[6px]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
              <Icon className="h-[30px] w-[30px] text-[#332687]" />
            </div>
            <div className="flex flex-col">
              <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
                {stat.label}
              </span>
              <span className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">
                {stat.value}
              </span>
              <div className="flex items-center gap-1">
                <span className={`font-dm text-xs font-bold leading-5 tracking-[-0.24px] ${stat.changeColor}`}>
                  {stat.change}
                </span>
                <span className="font-dm text-xs font-normal leading-5 tracking-[-0.24px] text-[#A3AED0]">
                  {stat.changeLabel}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
