import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "./spt-data";

interface TaxCalculationProps {
  pphTerutang: number;
  pphDipotongSebelumnya: number;
  pphHarusDipotong: number;
  pphKurangDipotong: number;
  pphLebihDipotong: number;
  pphHarusDisetor: number;
}

export function TaxCalculation({
  pphTerutang,
  pphDipotongSebelumnya,
  pphHarusDipotong,
  pphKurangDipotong,
  pphLebihDipotong,
  pphHarusDisetor
}: TaxCalculationProps) {
  return (
    <Card className="border-black/10 bg-white rounded-[20px]">
      <CardHeader className="bg-[#F0FDF4] border-b-2 border-[#B9F8CF] rounded-t-[20px]">
        <CardTitle className="text-lg font-bold">
          BAGIAN C - PENGHITUNGAN PPh PASAL 21/26 YANG TERUTANG
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="pb-3 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base">1. PPh Pasal 21/26 yang terutang:</span>
                <span className="font-mono text-lg font-bold">{formatCurrency(pphTerutang)}</span>
              </div>
            </div>
            
            <div className="pb-3 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base">2. PPh Pasal 21/26 yang telah dipotong sebelumnya:</span>
                <span className="font-mono text-lg font-bold">{formatCurrency(pphDipotongSebelumnya)}</span>
              </div>
            </div>
            
            <div className="pb-3 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base">3. PPh Pasal 21/26 yang harus dipotong (1-2):</span>
                <span className="font-mono text-lg font-bold">{formatCurrency(pphHarusDipotong)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="pb-3 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base">4. PPh Pasal 21/26 yang kurang dipotong:</span>
                <span className="font-mono text-lg font-bold">{formatCurrency(pphKurangDipotong)}</span>
              </div>
            </div>
            
            <div className="pb-3 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base">5. PPh Pasal 21/26 yang lebih dipotong:</span>
                <span className="font-mono text-lg font-bold">{formatCurrency(pphLebihDipotong)}</span>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border-2 border-green-400 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base text-green-900">6. PPh Pasal 21/26 yang harus disetor:</span>
                <span className="font-mono text-xl font-bold text-green-900">{formatCurrency(pphHarusDisetor)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
