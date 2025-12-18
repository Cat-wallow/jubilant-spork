import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flag, Check, Clock } from 'lucide-react';

interface StatusOverviewProps {
  status: {
    transaction: string;
    vouching: string;
    processing: string;
    integration: string;
  };
  pipeline: Array<{
    name: string;
    completed: boolean;
    pending?: boolean;
  }>;
  systemFlags: string;
}

export function StatusOverview({ status, pipeline, systemFlags }: StatusOverviewProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Flag className="h-4 w-4" />
          Status Overview & Processing Stage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Transaction Status</p>
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
              {status.transaction}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Vouching Status</p>
            <Badge variant="outline" className="flex w-fit items-center gap-1 border-green-200 bg-green-50 text-green-700">
              <Check className="h-3 w-3" />
              {status.vouching}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Processing Stage</p>
            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
              {status.processing}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Integration Status</p>
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
              {status.integration}
            </Badge>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium">Processing Pipeline</h4>
          <div className="flex flex-wrap items-center gap-4">
            {pipeline.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                {step.completed && (
                  <Check className="h-3 w-3 text-green-600" />
                )}
                {step.pending && (
                  <Clock className="h-3 w-3 text-orange-600" />
                )}
                <span className="text-sm">{step.name}</span>
                {index < pipeline.length - 1 && (
                  <span className="text-gray-300">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">System Flags & Alerts</p>
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
            {systemFlags}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
