import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface PernyataanData {
  tempatTanggal: string;
  namaLengkap: string;
  ttd: string | null;
}

interface ValidationData {
  sumberData: {
    jurnalAkuntansi: number;
    fakturPajakMasukan: number;
    fakturPajakKeluaran: number;
  };
  tingkatAkurasi: number;
}

export function PernyataanSection({ 
  pernyataan, 
  validasi 
}: { 
  pernyataan: PernyataanData;
  validasi: ValidationData;
}) {
  return (
    <Card className="border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white rounded-[20px] shadow-sm">
      <CardHeader className="p-[10px] px-5 rounded-t-[20px] bg-[rgba(254,242,242,0.50)]">
        <CardTitle className="text-lg font-normal text-[#0A0A0A]">
          PERNYATAAN
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-5 pb-14">
        <div className="flex flex-col gap-8 mt-8">
          <p className="text-sm font-normal text-[#0A0A0A] leading-[22.75px]">
            Dengan menyadari sepenuhnya akan segala akibatnya termasuk sanksi-sanksi sesuai dengan 
            ketentuan peraturan perundang-undangan yang berlaku, saya menyatakan bahwa apa yang 
            telah saya beritahukan di atas beserta lampiran-lampirannya adalah benar, lengkap, dan jelas.
          </p>
          
          <div className="flex gap-8">
            <Card className="flex-1 border-[0.8px] border-[rgba(0,0,0,0.10)] shadow-sm rounded-[14px]">
              <CardContent className="p-4 flex flex-col gap-4">
                <p className="text-sm font-bold text-[#0A0A0A]">
                  Tempat dan tanggal:
                </p>
                <div className="border-b border-[rgba(0,0,0,0.10)] pb-3">
                  <p className="text-base font-normal text-[#0A0A0A]">
                    {pernyataan.tempatTanggal}
                  </p>
                </div>
                <p className="text-sm font-bold text-[#0A0A0A]">
                  PENGUSAHA KENA PAJAK/KUASA
                </p>
              </CardContent>
            </Card>
            
            <div className="flex-1 border-[1.6px] border-[#D1D5DC] rounded p-5 flex flex-col gap-4">
              <p className="text-sm font-bold text-[#0A0A0A]">
                Tanda tangan:
              </p>
              <div className="h-16 border border-[#D1D5DC] bg-[#F9FAFB]"></div>
              <p className="text-xs font-normal text-[#0A0A0A]">
                Nama lengkap
              </p>
              <div className="border-b border-[#99A1AF] pb-1">
                <p className="text-sm font-bold text-[#0A0A0A]">
                  {pernyataan.namaLengkap}
                </p>
              </div>
            </div>
          </div>
          
          <Card className="bg-[#F4F7FE] border-none rounded-[20px]">
            <CardContent className="p-5 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#155DFC]" fill="#155DFC" />
                <h4 className="text-base font-bold text-[#1C398E]">
                  VALIDASI AUTO-FILL SYSTEM
                </h4>
              </div>
              
              <div className="flex justify-between gap-8">
                <div className="flex-1 flex flex-col gap-2.5">
                  <p className="text-sm font-bold text-[#193CB8]">
                    Sumber Data:
                  </p>
                  <p className="text-sm font-normal text-[#0A0A0A]">
                    • Jurnal Akuntansi KK2: {validasi.sumberData.jurnalAkuntansi} transaksi
                  </p>
                  <p className="text-sm font-normal text-[#0A0A0A]">
                    • Faktur Pajak Masukan: {validasi.sumberData.fakturPajakMasukan} dokumen
                  </p>
                  <p className="text-sm font-normal text-[#0A0A0A]">
                    • Faktur Pajak Keluaran: {validasi.sumberData.fakturPajakKeluaran} dokumen
                  </p>
                </div>
                
                <div className="flex-1 flex flex-col gap-2.5">
                  <p className="text-sm font-bold text-[#193CB8]">
                    Tingkat Akurasi:
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[rgba(3,2,19,0.20)] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#030213]" 
                        style={{ width: `${validasi.tingkatAkurasi}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-[#0A0A0A]">
                      {validasi.tingkatAkurasi}%
                    </span>
                  </div>
                  <p className="text-xs font-normal text-[#155DFC]">
                    Berdasarkan validasi cross-check dengan Chart of Accounts dan Tax Mapping
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
