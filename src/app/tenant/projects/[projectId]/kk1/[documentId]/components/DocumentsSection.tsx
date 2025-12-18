import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Edit, Receipt, AlertTriangle } from 'lucide-react';

interface DocumentsSectionProps {
  documents: {
    supporting: Array<{
      id: string;
      type: string;
    }>;
    systemGenerated: Array<{
      id: string;
      status?: string;
      code?: string;
      type: string;
    }>;
  };
}

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'receipt':
        return <Receipt className="h-4 w-4 text-blue-600" />;
      case 'journal':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'tax':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Dokumen & Lampiran
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-medium">Supporting Documents</h4>
            {documents.supporting.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-gray-600" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{doc.id}</p>
                    <p className="text-xs text-gray-500">{doc.type}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">System Generated</h4>
            {documents.systemGenerated.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
              >
                <div className="flex items-center gap-3">
                  {getIcon(doc.type)}
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{doc.id}</p>
                    {doc.code && <p className="text-xs text-gray-500">{doc.code}</p>}
                    {doc.status && <p className="text-xs text-gray-500">{doc.status}</p>}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
