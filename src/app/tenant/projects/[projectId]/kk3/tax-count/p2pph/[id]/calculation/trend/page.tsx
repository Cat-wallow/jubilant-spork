'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrendPage() {
  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardHeader>
        <CardTitle className="font-arial text-base text-[#0A0A0A]">Trend Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Halaman analisis trend akan ditampilkan di sini.
        </p>
      </CardContent>
    </Card>
  );
}
