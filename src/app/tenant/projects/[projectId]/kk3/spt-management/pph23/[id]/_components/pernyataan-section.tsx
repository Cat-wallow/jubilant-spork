import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PernyataanSectionProps {
  tempatTanggal: string;
  namaLengkap: string;
}

export function PernyataanSection({ tempatTanggal, namaLengkap }: PernyataanSectionProps) {
  return (
    <Card className="border-black/10 bg-white rounded-[20px]">
      <CardHeader className="bg-[#FEF2F2] border-b-2 border-[#FFC9C9] rounded-t-[20px]">
        <CardTitle className="text-lg font-bold">
          BAGIAN E - PERNYATAAN
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-6">
        <p className="text-base leading-6">
          Dengan menyadari sepenuhnya akan segala akibatnya termasuk sanksi-sanksi sesuai dengan 
          ketentuan peraturan perundang-undangan yang berlaku, saya menyatakan bahwa apa yang 
          telah saya beritahukan di atas beserta lampiran-lampirannya adalah benar, lengkap, dan jelas.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-gray-300 p-4 space-y-2">
            <p className="text-sm font-bold">Tempat dan tanggal:</p>
            <div className="pb-2 border-b border-gray-400">
              <span className="text-base">{tempatTanggal}</span>
            </div>
            <p className="text-sm font-bold pt-1">PEMOTONG PAJAK/KUASA</p>
          </div>
          
          <div className="border-2 border-gray-300 p-5 space-y-4">
            <p className="text-sm font-bold">Tanda tangan:</p>
            <div className="h-16 border border-gray-300 bg-gray-50"></div>
            <div>
              <p className="text-xs text-gray-600">Nama lengkap</p>
              <div className="pt-1 border-b border-gray-400 pb-1">
                <span className="text-sm font-bold">{namaLengkap}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
