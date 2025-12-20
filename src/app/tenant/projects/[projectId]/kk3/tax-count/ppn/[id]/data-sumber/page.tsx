import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';

export default function DataSumberPage() {
  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-arial text-base font-bold leading-4 text-[#0A0A0A]">
          <Database className="h-5 w-5" />
          Data Sumber
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-arial text-sm text-[#717182]">
          Halaman Data Sumber akan menampilkan sumber data untuk perhitungan PPN.
        </p>
      </CardContent>
    </Card>
  );
}
