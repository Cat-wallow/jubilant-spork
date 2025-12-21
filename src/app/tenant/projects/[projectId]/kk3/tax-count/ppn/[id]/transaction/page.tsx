import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function TransactionPage() {
  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-arial text-base font-bold leading-4 text-[#0A0A0A]">
          <FileText className="h-5 w-5" />
          List Transaksi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-arial text-sm text-[#717182]">
          Halaman List Transaksi akan menampilkan daftar semua transaksi PPN.
        </p>
      </CardContent>
    </Card>
  );
}
