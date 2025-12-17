import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function KK2ReportsPage() {
  return (
    <Card className="rounded-[20px]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-[#332687]" />
          <CardTitle>Reports</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex h-[400px] items-center justify-center text-muted-foreground">
          Reports page coming soon...
        </div>
      </CardContent>
    </Card>
  );
}
