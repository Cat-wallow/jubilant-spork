import { Building2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface OfficialFormHeaderProps {
  masaPajak: string;
  tahunPajak: string;
}

export function OfficialFormHeader({ masaPajak, tahunPajak }: OfficialFormHeaderProps) {
  return (
    <div className="border-2 border-black/20 rounded-[20px] bg-white p-8 space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold">KEMENTERIAN KEUANGAN</p>
            <p className="text-sm font-bold">REPUBLIK INDONESIA</p>
            <p className="text-xs">DIREKTORAT JENDERAL PAJAK</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs">FORMULIR</p>
          <p className="text-2xl font-bold">1721</p>
        </div>
      </div>

      <div className="border-t-2 border-b-2 border-gray-300 py-4 space-y-2">
        <h1 className="text-2xl font-bold text-center">
          SURAT PEMBERITAHUAN MASA
        </h1>
        <h2 className="text-xl font-bold text-center">
          PAJAK PENGHASILAN PASAL 21 DAN/ATAU PASAL 26
        </h2>
        
        <div className="flex justify-center items-center gap-8 pt-3">
          <div className="text-center">
            <p className="text-sm">MASA PAJAK</p>
            <div className="mt-1 border-2 border-gray-400 px-4 py-2 min-w-[80px]">
              <span className="font-mono text-lg">{masaPajak}</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm">TAHUN PAJAK</p>
            <div className="mt-1 border-2 border-gray-400 px-6 py-2 min-w-[100px]">
              <span className="font-mono text-lg">{tahunPajak}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
