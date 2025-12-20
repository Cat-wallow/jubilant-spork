import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Paperclip, Download, User, Calendar, History } from 'lucide-react';

interface JournalAttachment {
  id: string;
  file_name: string;
  file_url: string;
  uploaded_at: string;
  uploaded_by: string;
}

interface JournalAuditLog {
  id: string;
  action: string;
  timestamp: string;
  user: string;
  details: string;
}

interface JournalDetailData {
  attachments: JournalAttachment[];
  audit_log: JournalAuditLog[];
}

interface DetailTabsProps {
  data: JournalDetailData;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const DetailTabs: React.FC<DetailTabsProps> = ({ data }) => {
  return (
    <Tabs defaultValue="attachments" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="attachments">Attachments</TabsTrigger>
        <TabsTrigger value="audit-log">Audit Log</TabsTrigger>
      </TabsList>
      <TabsContent value="attachments">
        <Card className="rounded-[20px] border border-[rgba(145,158,171,0.20)] shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]">
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            {data.attachments?.length > 0 ? (
              <ul className="space-y-4">
                {data.attachments.map((attachment) => (
                  <li
                    key={attachment.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <Paperclip className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{attachment.file_name}</p>
                        <p className="text-sm text-gray-500">
                          Uploaded by {attachment.uploaded_by} on {formatDate(attachment.uploaded_at)}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={attachment.file_url} download>
                        <Download className="h-4 w-4 mr-2" /> Download
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">No attachments found.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="audit-log">
        <Card className="rounded-[20px] border border-[rgba(145,158,171,0.20)] shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]">
          <CardHeader>
            <CardTitle>Audit Log</CardTitle>
          </CardHeader>
          <CardContent>
            {data.audit_log?.length > 0 ? (
              <ul className="space-y-4">
                {data.audit_log.map((log) => (
                  <li key={log.id} className="p-4 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <History className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">
                          {log.action}: {log.details}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center space-x-2">
                          <User className="h-4 w-4" /> <span>{log.user}</span>
                          <Calendar className="h-4 w-4" /> <span>{formatDate(log.timestamp)}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">No audit log entries found.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
