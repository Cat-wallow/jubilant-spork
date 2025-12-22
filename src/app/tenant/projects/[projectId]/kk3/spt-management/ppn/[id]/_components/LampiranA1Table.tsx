import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EksporItem {
  no: number;
  tanggalDokumen: string;
  nomorDokumen: string;
  namaEksportir: string;
  npwpEksportir: string;
  namaPembeli: string;
  alamatPembeli: string;
  uraianBkp: string;
  jumlahHarga: number;
  ppn: number;
  ppnbm: number;
  keterangan: string;
}

interface LampiranA1Data {
  eksporList: EksporItem[];
  totalEkspor: { jumlahHarga: number; ppn: number; ppnbm: number };
}

export function LampiranA1Table({ data }: { data: LampiranA1Data }) {
  return (
    <Card className="border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white rounded-[20px] shadow-sm overflow-hidden">
      <div className="bg-[rgba(236,254,255,0.50)] px-5 py-[10px] rounded-t-[20px]">
        <h3 className="text-lg font-bold text-[#0A0A0A]">
          LAMPIRAN A1 - DAFTAR EKSPOR BARANG KENA PAJAK
        </h3>
      </div>
      <CardContent className="p-0 px-5 pb-5">
        <div className="mt-5 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[rgba(0,0,0,0.10)]">
                <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[40px]">
                  No
                </TableHead>
                <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[120px]">
                  TANGGAL DOKUMEN
                </TableHead>
                <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[150px]">
                  NOMOR DOKUMEN EKSPOR
                </TableHead>
                <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[140px]">
                  NAMA EKSPORTIR
                </TableHead>
                <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[140px]">
                  NPWP EKSPORTIR
                </TableHead>
                <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[130px]">
                  NAMA PEMBELI
                </TableHead>
                <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[130px]">
                  ALAMAT PEMBELI
                </TableHead>
                <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[100px]">
                  URAIAN BKP
                </TableHead>
                <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[150px]">
                  JUMLAH HARGA (FOB/CFR/CIF)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.eksporList.map((item) => (
                <TableRow key={item.no} className="border-b border-[rgba(0,0,0,0.10)]">
                  <TableCell className="text-center text-xs font-bold text-[#0A0A0A] font-[Consolas]">
                    {String(item.no).padStart(2, "0")}
                  </TableCell>
                  <TableCell className="text-center text-xs font-normal text-[#0A0A0A] font-[Consolas]">
                    {item.tanggalDokumen}
                  </TableCell>
                  <TableCell className="text-center text-xs font-normal text-[#0A0A0A] font-[Consolas]">
                    {item.nomorDokumen}
                  </TableCell>
                  <TableCell className="text-xs font-normal text-[#0A0A0A] pl-2">
                    {item.namaEksportir}
                  </TableCell>
                  <TableCell className="text-center text-xs font-normal text-[#0A0A0A] font-[Consolas]">
                    {item.npwpEksportir}
                  </TableCell>
                  <TableCell className="text-xs font-normal text-[#0A0A0A] pl-2">
                    {item.namaPembeli}
                  </TableCell>
                  <TableCell className="text-xs font-normal text-[#0A0A0A] pl-2">
                    {item.alamatPembeli}
                  </TableCell>
                  <TableCell className="text-xs font-normal text-[#0A0A0A] pl-2">
                    {item.uraianBkp}
                  </TableCell>
                  <TableCell className="text-right text-xs font-bold text-[#0A0A0A] font-[Consolas]">
                    Rp {item.jumlahHarga.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-[#FEFCE8]">
                <TableCell colSpan={8} className="text-center text-xs font-bold text-[#0A0A0A] py-4">
                  JUMLAH
                </TableCell>
                <TableCell className="text-right text-base font-bold text-[#0A0A0A] font-[Consolas] py-4">
                  A.2 Rp {data.totalEkspor.jumlahHarga.toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
