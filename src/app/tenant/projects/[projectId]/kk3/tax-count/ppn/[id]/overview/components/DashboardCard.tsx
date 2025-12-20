import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon } from 'lucide-react';

interface DashboardCardProps {
  data: {
    status: string;
    period: string;
    completeness: number;
    deadline: string;
    remainingDays: number;
  };
}

export function DashboardCard({ data }: DashboardCardProps) {
  return (
    <Card className="flex-1 rounded-[14px] border-[0.8px] border-black/10">
      <CardContent className="flex flex-col gap-[30px] p-5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-arial text-xl font-bold leading-7 text-[#0A0A0A]">
              SPT PPN 1111 Dashboard
            </h2>
            <Badge className="rounded-lg border-[0.8px] border-transparent bg-[#DBEAFE] px-2 py-0.5 text-xs font-normal leading-4 text-[#193CB8]">
              {data.status}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-sm leading-6 text-[#717182]">
            <CalendarIcon className="h-4 w-4" />
            <span className="font-arial">Periode {data.period}</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
                Kelengkapan Data
              </span>
              <span className="font-[Consolas] text-sm leading-5 text-[#0A0A0A]">
                {data.completeness}%
              </span>
            </div>
            <Progress value={data.completeness} className="h-2" />
          </div>

          <div className="flex items-start gap-4">
            <div className="flex flex-col gap-0">
              <span className="font-arial text-sm leading-5 text-[#717182]">
                Deadline
              </span>
              <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
                {data.deadline}
              </span>
            </div>

            <div className="flex flex-col gap-0">
              <span className="font-arial text-sm leading-5 text-[#717182]">
                Sisa Waktu
              </span>
              <span className="font-arial text-sm leading-5 text-[#155DFC]">
                {data.remainingDays} hari
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
