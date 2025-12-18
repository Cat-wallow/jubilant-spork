import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Check, Clock, X } from 'lucide-react';

interface IntegrationStatusProps {
  integration: {
    modules: Array<{
      name: string;
      status: string;
      synced?: boolean;
      pending?: boolean;
      notStarted?: boolean;
    }>;
    generatedEntries: Array<{
      title: string;
      details: string[];
    }>;
  };
}

export function IntegrationStatus({ integration }: IntegrationStatusProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Share2 className="h-4 w-4" />
          Integration Status & Module Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-medium">Module Integration Status</h4>
            <div className="space-y-3">
              {integration.modules.map((module, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded border border-gray-200 p-3"
                >
                  <div className="flex items-center gap-2">
                    {module.synced && <Check className="h-3 w-3 text-green-600" />}
                    {module.pending && <Clock className="h-3 w-3 text-orange-600" />}
                    {module.notStarted && <X className="h-3 w-3 text-gray-400" />}
                    <span className="text-sm">{module.name}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      module.synced
                        ? 'border-green-200 bg-green-50 text-green-700'
                        : module.pending
                          ? 'border-orange-200 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-gray-50 text-gray-700'
                    }
                  >
                    {module.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Generated Entries</h4>
            <div className="space-y-3">
              {integration.generatedEntries.map((entry, index) => (
                <div key={index} className="space-y-2 rounded border border-gray-200 p-3">
                  <p className="text-sm font-medium">{entry.title}</p>
                  {entry.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-xs text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
