'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CalculationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perhitungan PPN</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Halaman perhitungan akan ditampilkan di sini.
        </p>
      </CardContent>
    </Card>
  );
}
