import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BagianIIData {
  dasarPengenaan: number;
  ppnTerutang: number;
  ppnMasukanDikreditkan: number;
  ppnMasukanDimintaKembali: number;
  jumlahPpnMasukan: number;
  ppnKurangBayar: number;
  ppnLebihBayar: number;
  ppnKompensasi: number;
  ppnRestitusi: number;
  saldoPpnLebihBayar: number;
}

export function BagianIISection({ data }: { data: BagianIIData }) {
  return (
    <Card className="border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white rounded-[20px] shadow-sm">
      <CardHeader className="p-[10px] px-5 rounded-t-[20px] bg-[rgba(255,151,158,0.50)]">
        <CardTitle className="text-lg font-bold text-[#0A0A0A]">
          BAGIAN II - PENGHITUNGAN PPN KURANG BAYAR ATAU PPN LEBIH BAYAR
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-5 pb-6">
        <div className="flex gap-8 mt-8">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
              <span className="text-sm font-bold text-[#0A0A0A]">
                1. Dasar Pengenaan Pajak PPN yang terutang
              </span>
              <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                Rp {data.dasarPengenaan.toLocaleString("id-ID")}
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
              <span className="text-sm font-bold text-[#0A0A0A]">
                2. PPN yang terutang
              </span>
              <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                Rp {data.ppnTerutang.toLocaleString("id-ID")}
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
              <span className="text-sm font-bold text-[#0A0A0A]">
                3. PPN Masukan yang dapat dikreditkan
              </span>
              <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                Rp {data.ppnMasukanDikreditkan.toLocaleString("id-ID")}
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
              <span className="text-sm font-bold text-[#0A0A0A]">
                4. PPN Masukan yang diminta kembali
              </span>
              <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                Rp {data.ppnMasukanDimintaKembali.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
              <span className="text-sm font-bold text-[#0A0A0A]">
                5. Jumlah PPN Masukan (3+4)
              </span>
              <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                Rp {data.jumlahPpnMasukan.toLocaleString("id-ID")}
              </span>
            </div>
            
            <div className="flex justify-between items-center bg-[#FEF2F2] border border-[#FFC9C9] rounded-[10px] px-4 py-5">
              <span className="text-sm font-bold text-[#9F0712]">
                6. PPN Kurang Bayar (2-5)
              </span>
              <span className="text-lg font-bold text-[#9F0712] font-[Consolas]">
                Rp {data.ppnKurangBayar.toLocaleString("id-ID")}
              </span>
            </div>
            
            <div className="flex justify-between items-center bg-[#F0FDF4] border border-[#B9F8CF] rounded-[10px] px-4 py-5">
              <span className="text-sm font-bold text-[#016630]">
                7. PPN Lebih Bayar (5-2)
              </span>
              <span className="text-lg font-bold text-[#016630] font-[Consolas]">
                Rp {data.ppnLebihBayar.toLocaleString("id-ID")}
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
              <span className="text-sm font-bold text-[#0A0A0A]">
                8. PPN yang diminta kompensasi
              </span>
              <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                Rp {data.ppnKompensasi.toLocaleString("id-ID")}
              </span>
            </div>
            
            <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.10)] pb-3">
              <span className="text-sm font-bold text-[#0A0A0A]">
                9. PPN yang diminta restitusi
              </span>
              <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                Rp {data.ppnRestitusi.toLocaleString("id-ID")}
              </span>
            </div>
            
            <div className="flex justify-between items-center bg-[#EFF6FF] border border-[#BEDBFF] rounded-[10px] px-4 py-5">
              <span className="text-sm font-bold text-[#193CB8]">
                10. Saldo PPN Lebih Bayar (7-8-9)
              </span>
              <span className="text-lg font-bold text-[#193CB8] font-[Consolas]">
                Rp {data.saldoPpnLebihBayar.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
