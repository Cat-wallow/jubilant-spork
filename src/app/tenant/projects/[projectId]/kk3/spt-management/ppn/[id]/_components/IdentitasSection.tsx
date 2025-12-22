import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IdentitasData {
  npwp: string;
  nama: string;
  klasifikasiUsaha: string;
  nomorTelepon: string;
  email: string;
  alamat: string;
}

export function IdentitasSection({ data }: { data: IdentitasData }) {
  return (
    <Card className="border-[0.8px] border-[rgba(145,158,171,0.20)] bg-white rounded-[20px]">
      <CardHeader className="p-[10px] px-6 rounded-t-[20px] border-b-[1.6px] border-[rgba(145,158,171,0.20)] bg-[rgba(207,247,211,1)]">
        <CardTitle className="text-lg font-bold text-[#0A0A0A]">
          BAGIAN A - IDENTITAS PEMOTONG PAJAK
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0 pb-5">
        <div className="flex gap-6 mt-5">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#364153]">NPWP</label>
              <div className="border border-[rgba(145,158,171,0.20)] rounded bg-[#F9FAFB] px-3.5 py-3.5">
                <p className="text-lg font-normal text-[#0A0A0A] tracking-[0.9px] font-[Consolas]">
                  {data.npwp}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#364153]">NAMA</label>
              <div className="border border-[rgba(145,158,171,0.20)] rounded bg-[#F9FAFB] px-3.5 py-3">
                <p className="text-base font-normal text-[#0A0A0A]">
                  {data.nama}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#364153]">KLASIFIKASI USAHA</label>
              <div className="border border-[rgba(145,158,171,0.20)] rounded bg-[#F9FAFB] px-3.5 py-3.5">
                <p className="text-base font-normal text-[#0A0A0A] font-[Consolas]">
                  {data.klasifikasiUsaha}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#364153]">NOMOR TELEPON:</label>
              <div className="border border-[rgba(145,158,171,0.20)] rounded bg-[#F9FAFB] px-3.5 py-3.5">
                <p className="text-base font-normal text-[#0A0A0A] font-[Consolas]">
                  {data.nomorTelepon}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#364153]">EMAIL:</label>
              <div className="border border-[rgba(145,158,171,0.20)] rounded bg-[#F9FAFB] px-3.5 py-3">
                <p className="text-base font-normal text-[#0A0A0A]">
                  {data.email}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#364153]">ALAMAT:</label>
              <div className="border border-[rgba(145,158,171,0.20)] rounded bg-[#F9FAFB] px-3.5 py-3 h-[120px]">
                <p className="text-base font-normal text-[#0A0A0A]">
                  {data.alamat}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
