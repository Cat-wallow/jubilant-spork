import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableItem {
  no: string;
  uraian: string;
  dpp: number;
  ppn: number;
}

interface LampiranAData {
  penyerahan: TableItem[];
  totalPenyerahan: { dpp: number; ppn: number };
  perolehan: TableItem[];
  totalPerolehan: { dpp: number; ppn: number };
}

export function LampiranASection({ data }: { data: LampiranAData }) {
  return (
    <Card className="border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white rounded-[20px] shadow-sm">
      <CardHeader className="p-[10px] px-5 rounded-t-[20px] bg-[rgba(255,247,237,0.50)]">
        <CardTitle className="text-lg font-bold text-[#0A0A0A]">
          LAMPIRAN A - REKAPITULASI PENYERAHAN DAN PEROLEHAN
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-6 pb-5">
        <div className="flex flex-col gap-8 mt-8">
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-[#0A0A0A]">
              I. REKAPITULASI PENYERAHAN
            </h4>
            
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[rgba(0,0,0,0.10)]">
                  <TableHead className="text-center text-sm font-bold text-[#0A0A0A] w-[80px]">No</TableHead>
                  <TableHead className="text-center text-sm font-bold text-[#0A0A0A]">URAIAN</TableHead>
                  <TableHead className="text-center text-sm font-bold text-[#0A0A0A]">DPP/JUMLAH PENYERAHAN</TableHead>
                  <TableHead className="text-center text-sm font-bold text-[#0A0A0A]">PPN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.penyerahan.map((item) => (
                  <TableRow key={item.no} className="border-b border-[rgba(0,0,0,0.10)]">
                    <TableCell className="text-center text-sm font-bold text-[#0A0A0A] font-[Consolas]">
                      {item.no}
                    </TableCell>
                    <TableCell className="text-sm font-normal text-[#0A0A0A] pl-4">
                      {item.uraian}
                    </TableCell>
                    <TableCell className="text-right text-sm font-bold text-[#0A0A0A] font-[Consolas]">
                      Rp {item.dpp.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="text-right text-sm font-bold text-[#0A0A0A] font-[Consolas]">
                      Rp {item.ppn.toLocaleString("id-ID")}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-[#FEFCE8]">
                  <TableCell colSpan={2} className="text-center text-sm font-bold text-[#0A0A0A]">
                    JUMLAH
                  </TableCell>
                  <TableCell className="text-right text-lg font-bold text-[#0A0A0A] font-[Consolas]">
                    Rp {data.totalPenyerahan.dpp.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right text-lg font-bold text-[#0A0A0A] font-[Consolas]">
                    Rp {data.totalPenyerahan.ppn.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-[#0A0A0A]">
              II. REKAPITULASI PEROLEHAN
            </h4>
            
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[rgba(0,0,0,0.10)]">
                  <TableHead className="text-center text-sm font-bold text-[#0A0A0A] w-[80px]">No</TableHead>
                  <TableHead className="text-center text-sm font-bold text-[#0A0A0A]">URAIAN</TableHead>
                  <TableHead className="text-right text-sm font-bold text-[#0A0A0A]">DPP/JUMLAH PEROLEHAN</TableHead>
                  <TableHead className="text-center text-sm font-bold text-[#0A0A0A]">PPN MASUKAN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.perolehan.map((item) => (
                  <TableRow key={item.no} className="border-b border-[rgba(0,0,0,0.10)]">
                    <TableCell className="text-center text-sm font-bold text-[#0A0A0A] font-[Consolas]">
                      {item.no}
                    </TableCell>
                    <TableCell className="text-sm font-normal text-[#0A0A0A] pl-4">
                      {item.uraian}
                    </TableCell>
                    <TableCell className="text-right text-sm font-bold text-[#0A0A0A] font-[Consolas]">
                      Rp {item.dpp.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="text-right text-sm font-bold text-[#0A0A0A] font-[Consolas]">
                      Rp {item.ppn.toLocaleString("id-ID")}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-[#F0FDF4]">
                  <TableCell colSpan={2} className="text-center text-sm font-bold text-[#0A0A0A]">
                    JUMLAH
                  </TableCell>
                  <TableCell className="text-right text-lg font-bold text-[#0A0A0A] font-[Consolas]">
                    Rp {data.totalPerolehan.dpp.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right text-lg font-bold text-[#0A0A0A] font-[Consolas]">
                    Rp {data.totalPerolehan.ppn.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
