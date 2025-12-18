import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Check } from 'lucide-react';

interface ActivityTimelineProps {
  timeline: Array<{
    title: string;
    description: string;
    date: string;
    status?: string;
    completed?: boolean;
    pending?: boolean;
  }>;
  lastSync: string;
  transactionHash: string;
}

export function ActivityTimeline({
  timeline,
  lastSync,
  transactionHash,
}: ActivityTimelineProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4" />
          Activity Timeline & Audit Trail
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative space-y-4">
          <div className="absolute left-4 top-6 bottom-6 w-px bg-gray-200" />
          
          {timeline.map((event, index) => (
            <div key={index} className="relative flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-white shadow">
                {event.completed && <Check className="h-4 w-4 text-green-600" />}
                {event.pending && <Clock className="h-4 w-4 text-orange-600" />}
              </div>
              <div className="flex-1 space-y-1 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-medium">{event.title}</h4>
                  {event.status && (
                    <Badge variant="outline" className="border-gray-200">
                      {event.status}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-xs text-gray-500">{event.date}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
          <p>Last system sync: {lastSync}</p>
          <p>Transaction hash: {transactionHash}</p>
        </div>
      </CardContent>
    </Card>
  );
}
