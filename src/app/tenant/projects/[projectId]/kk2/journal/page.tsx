import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function KK2JournalPage() {
  return (
    <Card className="rounded-[20px]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-[#332687]" />
          <CardTitle>Journal</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex h-[400px] items-center justify-center text-muted-foreground">
          Journal page coming soon...
        </div>
      </CardContent>
    </Card>
  );
}
