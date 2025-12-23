import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface TaxpayerIdentityViewProps {
  npwp: string;
  namaWajibPajak: string;
  alamat: string;
  nomorTelepon: string;
  email: string;
}

export function TaxpayerIdentityView({
  npwp,
  namaWajibPajak,
  alamat,
  nomorTelepon,
  email
}: TaxpayerIdentityViewProps) {
  return (
    <Card className="border-black/10 bg-white rounded-[20px]">
      <CardHeader className="bg-[#CFE4FF] border-b-2 border-[#B7CBE4] rounded-t-[20px]">
        <CardTitle className="text-lg font-bold">
          BAGIAN A - IDENTITAS PEMOTONG PAJAK
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-bold text-gray-700">1. NPWP:</label>
              <div className="mt-2 p-3.5 bg-gray-50 border border-black/20 rounded">
                <span className="font-mono text-lg tracking-wider">{npwp}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-bold text-gray-700">2. NAMA PEMOTONG PAJAK:</label>
              <div className="mt-2 p-3 bg-gray-50 border border-black/20 rounded">
                <span className="text-base">{namaWajibPajak}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-bold text-gray-700">4. NOMOR TELEPON:</label>
              <div className="mt-2 p-3 bg-gray-50 border border-black/20 rounded">
                <span className="font-mono text-base">{nomorTelepon}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-bold text-gray-700">3. ALAMAT:</label>
              <div className="mt-2 p-3 bg-gray-50 border border-black/20 rounded min-h-[120px]">
                <span className="text-base">{alamat}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-bold text-gray-700">5. EMAIL:</label>
              <div className="mt-2 p-3 bg-gray-50 border border-black/20 rounded">
                <span className="text-base">{email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
