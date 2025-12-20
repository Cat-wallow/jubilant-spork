'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ByObjectPage() {
  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardHeader>
        <CardTitle className="font-arial text-base text-[#0A0A0A]">Per Objek Pajak</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Halaman perhitungan per objek pajak akan ditampilkan di sini.
        </p>
      </CardContent>
    </Card>
  );
}
