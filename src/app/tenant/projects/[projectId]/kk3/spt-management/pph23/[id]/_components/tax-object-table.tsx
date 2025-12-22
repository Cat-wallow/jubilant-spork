import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaxObjectEntry, formatCurrency } from "./spt-data";

interface TaxObjectTableProps {
  taxObjects: TaxObjectEntry[];
  totalPenerima: number;
  totalPenghasilanBruto: number;
  totalPPhDipotong: number;
}

export function TaxObjectTable({
  taxObjects,
  totalPenerima,
  totalPenghasilanBruto,
  totalPPhDipotong
}: TaxObjectTableProps) {
  return (
    <Card className="border-black/10 bg-white rounded-[20px]">
      <CardHeader className="bg-[#FEFCE8] border-b-2 border-[#FFF085] rounded-t-[20px]">
        <CardTitle className="text-lg font-bold">
          BAGIAN B - OBJEK PAJAK
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border border-gray-300">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center font-bold text-black border-r border-gray-300 w-12">No</TableHead>
                <TableHead className="text-center font-bold text-black border-r border-gray-300 w-36">
                  KODE OBJEK PAJAK
                </TableHead>
                <TableHead className="text-center font-bold text-black border-r border-gray-300">
                  URAIAN OBJEK PAJAK
                </TableHead>
                <TableHead className="text-center font-bold text-black border-r border-gray-300 w-48">
                  JUMLAH PENERIMA<br/>PENGHASILAN
                </TableHead>
                <TableHead className="text-center font-bold text-black border-r border-gray-300 w-56">
                  JUMLAH PENGHASILAN BRUTO (Rp)
                </TableHead>
                <TableHead className="text-center font-bold text-black w-56">
                  JUMLAH PPh YANG DIPOTONG (Rp)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxObjects.map((obj, index) => (
                <TableRow
                  key={obj.no}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <TableCell className="text-center font-mono border-r border-gray-300">
                    {obj.no}
                  </TableCell>
                  <TableCell className="text-center font-mono font-bold border-r border-gray-300">
                    {obj.kodeObjekPajak}
                  </TableCell>
                  <TableCell className="text-sm border-r border-gray-300">
                    {obj.uraianObjekPajak}
                  </TableCell>
                  <TableCell className="text-center font-mono border-r border-gray-300">
                    {obj.jumlahPenerimaanPenghasilan > 0 ? obj.jumlahPenerimaanPenghasilan : '-'}
                  </TableCell>
                  <TableCell className="text-right font-mono border-r border-gray-300">
                    {obj.jumlahPenghasilanBruto > 0 ? formatCurrency(obj.jumlahPenghasilanBruto) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {obj.jumlahPPhDipotong > 0 ? formatCurrency(obj.jumlahPPhDipotong) : '-'}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-blue-100 font-bold">
                <TableCell colSpan={3} className="text-center border-r border-gray-300">
                  JUMLAH
                </TableCell>
                <TableCell className="text-center font-mono border-r border-gray-300">
                  {totalPenerima}
                </TableCell>
                <TableCell className="text-right font-mono border-r border-gray-300">
                  {formatCurrency(totalPenghasilanBruto)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(totalPPhDipotong)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
