import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface InformasiTambahanData {
  tanggalPembuatan: string;
  deadlinePenyampaian: string;
  terakhirDiubah: string;
  autoFillStatus: string;
  dataSource: string;
}

export function InformasiTambahanSection({ data }: { data: InformasiTambahanData }) {
  return (
    <Card className="border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white rounded-[20px]">
      <CardHeader className="p-[10px] px-5 rounded-t-[20px] bg-[#F9FAFB]">
        <CardTitle className="text-base font-bold text-[#0A0A0A]">
          INFORMASI TAMBAHAN
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-5 pb-5">
        <div className="flex justify-between gap-6 mt-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-0.5">
              <label className="text-sm font-normal text-[#364153]">
                Tanggal Pembuatan:
              </label>
              <p className="text-base font-normal text-[#0A0A0A]">
                {data.tanggalPembuatan}
              </p>
            </div>
            
            <div className="flex flex-col gap-0.5">
              <label className="text-sm font-normal text-[#364153]">
                Deadline Penyampaian:
              </label>
              <p className="text-base font-bold text-[#E7000B]">
                {data.deadlinePenyampaian}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-0.5">
              <label className="text-sm font-normal text-[#364153]">
                Terakhir Diubah:
              </label>
              <p className="text-base font-normal text-[#0A0A0A]">
                {data.terakhirDiubah}
              </p>
            </div>
            
            <div className="flex flex-col gap-0.5">
              <label className="text-sm font-normal text-[#364153]">
                Auto-Fill Status:
              </label>
              <div className="flex flex-col gap-2">
                <Badge className="w-fit bg-[#DCFCE7] text-[#016630] border-[0.8px] border-transparent rounded-lg px-3 py-1 text-xs font-normal h-auto flex items-center gap-2">
                  <Zap className="w-3 h-3" fill="#016630" />
                  {data.autoFillStatus}
                </Badge>
                <p className="text-xs font-normal text-[#717182]">
                  Data source: {data.dataSource}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
