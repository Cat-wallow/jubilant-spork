import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface InformasiTambahanProps {
  tanggalPembuatan: string;
  deadlinePenyampaian: string;
  autoFillStatus: 'auto-filled' | 'manual';
  dataSource: string;
  terakhirDiubah: string;
}

export function InformasiTambahan({
  tanggalPembuatan,
  deadlinePenyampaian,
  autoFillStatus,
  dataSource,
  terakhirDiubah
}: InformasiTambahanProps) {
  return (
    <Card className="border-black/10 bg-white rounded-2xl">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-base font-bold text-center">
          INFORMASI TAMBAHAN
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-700">Tanggal Pembuatan:</label>
              <p className="text-base font-normal mt-1">{tanggalPembuatan}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-700">Deadline Penyampaian:</label>
              <p className="text-base font-bold text-red-600 mt-1">{deadlinePenyampaian}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-700">Auto-Fill Status:</label>
              <div className="mt-2 space-y-2">
                <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50">
                  <Zap className="w-3 h-3 mr-1" />
                  Auto-Filled
                </Badge>
                <p className="text-xs text-gray-600">Data source: {dataSource}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-700">Terakhir Diubah:</label>
              <p className="text-base font-normal mt-1">{terakhirDiubah}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
