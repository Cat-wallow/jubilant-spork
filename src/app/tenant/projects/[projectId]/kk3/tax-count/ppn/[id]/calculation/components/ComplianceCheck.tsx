import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComplianceCheckProps {
  compliance: Array<{
    title: string;
    description: string;
    status: 'success' | 'info';
  }>;
}

export function ComplianceCheck({ compliance }: ComplianceCheckProps) {
  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardContent className="flex flex-col gap-[30px] p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 font-arial text-lg leading-7 text-[#0A0A0A]">
            <CheckCircle2 className="h-4 w-4 text-[#00A63E]" />
            Compliance Check
          </CardTitle>
        </CardHeader>

        <div className="flex flex-col gap-[30px]">
          {compliance.map((item, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center gap-3 rounded-[10px] p-3',
                item.status === 'success'
                  ? 'bg-[#F0FDF4]'
                  : 'bg-[#EFF6FF]'
              )}
            >
              {item.status === 'success' ? (
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#00A63E]" />
              ) : (
                <Info className="h-4 w-4 flex-shrink-0 text-[#155DFC]" />
              )}

              <div className="flex flex-col gap-0">
                <span
                  className={cn(
                    'font-arial text-sm leading-5',
                    item.status === 'success'
                      ? 'text-[#016630]'
                      : 'text-[#193CB8]'
                  )}
                >
                  {item.title}
                </span>
                <span
                  className={cn(
                    'font-arial text-xs leading-4',
                    item.status === 'success'
                      ? 'text-[#00A63E]'
                      : 'text-[#155DFC]'
                  )}
                >
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
