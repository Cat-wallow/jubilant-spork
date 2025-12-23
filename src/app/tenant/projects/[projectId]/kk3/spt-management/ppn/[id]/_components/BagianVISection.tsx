import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface LampiranItem {
  nama: string;
  checked: boolean;
}

interface BagianVIData {
  lampiran: LampiranItem[];
  jumlahLampiran: number;
}

export function BagianVISection({ data }: { data: BagianVIData }) {
  return (
    <Card className="border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white rounded-[20px] shadow-sm">
      <CardHeader className="p-[10px] px-5 rounded-t-[20px] bg-[rgba(187,227,255,0.50)]">
        <CardTitle className="text-lg font-bold text-[#0A0A0A]">
          BAGIAN VI - KELENGKAPAN SPT
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-5 pb-5">
        <div className="flex flex-col gap-6 mt-6">
          <p className="text-sm font-bold text-[#0A0A0A]">
            LAMPIRAN YANG DISERAHKAN BERSAMA SPT MASA PPN INI:
          </p>
          
          <div className="flex gap-8">
            <div className="flex-1 flex flex-col gap-4">
              {data.lampiran.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded border-[0.8px] flex items-center justify-center ${
                    item.checked 
                      ? 'border-[rgba(0,0,0,0.10)] bg-[rgba(236,236,240,0.30)]' 
                      : 'border-[rgba(0,0,0,0.10)] bg-[rgba(236,236,240,0.30)]'
                  }`}>
                    {item.checked && <Check className="w-4 h-4 text-[#00A63E]" strokeWidth={2} />}
                  </div>
                  <span className="text-sm font-normal text-[#0A0A0A]">
                    {item.nama}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex-1 flex flex-col gap-4">
              {data.lampiran.slice(3).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded border-[0.8px] flex items-center justify-center ${
                    item.checked 
                      ? 'border-[rgba(0,0,0,0.10)] bg-[rgba(236,236,240,0.30)]' 
                      : 'border-[rgba(0,0,0,0.10)] bg-[rgba(236,236,240,0.30)]'
                  }`}>
                    {item.checked && <Check className="w-4 h-4 text-[#00A63E]" strokeWidth={2} />}
                  </div>
                  <span className="text-sm font-normal text-[#0A0A0A]">
                    {item.nama}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-[rgba(236,236,240,0.30)] rounded-[10px] px-4 py-6">
            <span className="text-sm font-bold text-[#0A0A0A]">
              JUMLAH LAMPIRAN:
            </span>
            <div className="w-16 border border-[rgba(0,0,0,0.10)] bg-white rounded px-0 py-2 text-center">
              <span className="text-base font-bold text-[#0A0A0A] font-[Consolas]">
                {data.jumlahLampiran}
              </span>
            </div>
            <span className="text-sm font-bold text-[#0A0A0A]">
              LEMBAR
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
