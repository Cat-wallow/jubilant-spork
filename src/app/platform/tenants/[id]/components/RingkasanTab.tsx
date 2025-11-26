import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { metricsData, usageTrendData } from '../data/dummy-data';

interface RingkasanTabProps {
  tenant: {
    id: string;
    companyName: string;
    pic: string;
    slug: string;
    picEmail: string;
    status: string;
    createdAt: string;
    plan: string;
    lastActivity: string;
  };
}

export default function RingkasanTab({ tenant }: RingkasanTabProps) {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Company Information Card */}
      <Card className="flex flex-col gap-5 self-stretch rounded-[20px] bg-white p-5">
        <h2 className="text-[22px] font-medium leading-7 text-[#2B3674]">
          Ringkasan Informasi Perusahaan
        </h2>
        
        <div className="flex flex-col gap-[10px]">
          {/* Row 1 */}
          <div className="flex gap-5 self-stretch">
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-normal leading-5 tracking-[0.25px] text-[#3F3F3F]">
                Nama Perusahaan:
              </label>
              <div className="h-[45px]">
                <p className="py-[3px] text-base font-medium leading-6 tracking-[0.5px] text-[#404040]">
                  {tenant.companyName}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-normal leading-5 tracking-[0.25px] text-[#3F3F3F]">
                PIC
              </label>
              <div className="h-[45px]">
                <p className="py-[3px] text-base font-medium leading-6 tracking-[0.5px] text-[#404040]">
                  {tenant.pic}
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-5 self-stretch">
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-normal leading-5 tracking-[0.25px] text-[#3F3F3F]">
                Slug
              </label>
              <div className="h-[45px]">
                <p className="py-[3px] text-base font-medium leading-6 tracking-[0.5px] text-[#404040]">
                  {tenant.slug}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-normal leading-5 tracking-[0.25px] text-[#3F3F3F]">
                PIC Email
              </label>
              <div className="h-[45px]">
                <p className="py-[3px] text-base font-medium leading-6 tracking-[0.5px] text-[#404040]">
                  {tenant.picEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex gap-5 self-stretch">
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-normal leading-5 tracking-[0.25px] text-[#3F3F3F]">
                Status
              </label>
              <div className="h-[29px]">
                <Badge className="rounded-[5px] bg-[rgba(103,80,164,0.08)] px-[10px] py-0 font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674] hover:bg-[rgba(103,80,164,0.08)]">
                  {tenant.status}
                </Badge>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-normal leading-5 tracking-[0.25px] text-[#3F3F3F]">
                Created At
              </label>
              <div className="h-[45px]">
                <p className="py-[3px] text-base font-medium leading-6 tracking-[0.5px] text-[#404040]">
                  {tenant.createdAt}
                </p>
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex gap-5 self-stretch">
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-normal leading-5 tracking-[0.25px] text-[#3F3F3F]">
                Plan
              </label>
              <div className="h-[29px]">
                <Badge className="rounded-[5px] bg-[rgba(103,80,164,0.08)] px-[10px] py-0 font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674] hover:bg-[rgba(103,80,164,0.08)]">
                  {tenant.plan}
                </Badge>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-sm font-normal leading-5 tracking-[0.25px] text-[#3F3F3F]">
                Last Activity
              </label>
              <div className="h-[45px]">
                <p className="py-[3px] text-base font-medium leading-6 tracking-[0.5px] text-[#404040]">
                  {tenant.lastActivity}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Metrics Cards */}
      <div className="flex items-center gap-[30px] self-stretch">
        {metricsData.map((metric, index) => (
          <Card
            key={index}
            className="flex h-[103px] flex-1 flex-col items-start justify-center rounded-[10.5px] border border-black/15 bg-white pl-[21px]"
          >
            <div className="flex items-center gap-[14px]">
              <div className={`flex h-[35px] w-[35px] items-center justify-center rounded-[7px] ${metric.bgColor} p-[7px]`}>
                <span className={`text-2xl ${metric.iconColor}`}>{metric.icon}</span>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-xs font-medium leading-[17.5px] text-[#64748B]">
                  {metric.label}
                </p>
                <div className="flex items-center gap-[3.5px]">
                  <p className="text-[21px] font-bold leading-7 text-[#1E293B]">{metric.value}</p>
                  {metric.total && (
                    <p className="text-xs font-normal leading-[17.5px] text-[#64748B]">
                      /{metric.total}
                    </p>
                  )}
                  {metric.unit && (
                    <p className="text-xs font-normal leading-[17.5px] text-[#64748B]">
                      {metric.unit}
                    </p>
                  )}
                </div>
                {metric.progress && (
                  <div className="mt-1 h-[7px] w-full self-stretch overflow-hidden rounded-full bg-[rgba(79,70,229,0.2)]">
                    <div
                      className="h-full bg-[#4F46E5]"
                      style={{ width: `${metric.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Usage Trend Card */}
      <Card className="flex flex-col items-start gap-[26.25px] self-stretch rounded-[10.5px] border border-black/15 bg-white p-6">
        <h3 className="text-sm font-normal leading-[14px] text-[#1E293B]">
          Usage Trend (30 Days)
        </h3>
        <div className="flex items-center gap-[30px] self-stretch">
          {usageTrendData.map((item, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-[10px] rounded-[7px] bg-white p-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
            >
              <p className={`text-[30px] font-bold leading-7 ${item.color}`}>{item.value}</p>
              <p className="text-center text-sm font-normal leading-[14px] text-[#64748B]">
                {item.label}
              </p>
              <p
                className={`text-sm font-normal leading-[14px] ${item.changePositive ? 'text-[#00A63E]' : 'text-[#E7000B]'}`}
              >
                {item.change}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
