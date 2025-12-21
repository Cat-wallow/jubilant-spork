import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ImporItem {
  no: number;
  namaPenjual: string;
  nomorDokumen: string;
  tanggalDokumen: string;
  dpp: number;
  ppn: number;
  ppnbm: number;
  keterangan: string;
}

interface LampiranB1Data {
  imporList: ImporItem[];
  totalImpor: { dpp: number; ppn: number; ppnbm: number };
}

export function LampiranB1Table({ data }: { data: LampiranB1Data }) {
  return (
    <Card className="border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white rounded-[20px] shadow-sm p-0.5">
      <div className="p-5 flex flex-col gap-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-normal text-[#0A0A0A] max-w-[960px]">
            LAMPIRAN B1 - DAFTAR PAJAK MASUKAN YANG DAPAT DIKREDITKAN ATAS IMPOR BKP DAN 
            PEMANFAATAN BKP TIDAK BERWUJUD DARI LUAR DAERAH PABEAN
          </h3>
          <div className="flex flex-col items-end">
            <p className="text-xs font-bold text-[#717182]">FORMULIR 1111 B1</p>
            <p className="text-xs font-normal text-[#717182]">
              (Bila tidak ada transaksi tidak perlu dilampirkan)
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <div className="flex gap-2">
            <span className="font-bold text-[#717182]">NAMA PKP:</span>
            <span className="font-normal text-[#717182]">PT CONTOH PERUSAHAAN</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-[#717182]">MASA:</span>
            <span className="font-normal text-[#717182]">03</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-[#717182]">TH:</span>
            <span className="font-normal text-[#717182]">2024</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold text-[#717182]">Pembetulan Ke:</span>
            <span className="font-normal text-[#717182]">( 0 )</span>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <span className="text-xs font-bold text-[#717182]">NPWP:</span>
          <span className="text-xs font-normal text-[#717182] font-[Consolas]">12.345.678.9-012.345</span>
        </div>
      </div>
      
      <div className="overflow-x-auto px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[40px]">
                No
              </TableHead>
              <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[180px]">
                <div className="flex flex-col items-center py-2">
                  <span>Nama Penjual BKP/</span>
                  <span>JKP Tidak Berwujud/</span>
                  <span>Pemberi JKP</span>
                </div>
              </TableHead>
              <TableHead className="text-center text-xs font-bold text-[#0A0A0A]">
                <div className="flex flex-col items-center py-2">
                  <span>Dokumen Tertentu</span>
                </div>
              </TableHead>
              <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[100px]">
                <div className="flex flex-col items-center">
                  <span>Nomor</span>
                </div>
              </TableHead>
              <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[120px]">
                <div className="flex flex-col items-center">
                  <span>Tanggal</span>
                  <span>(dd/mm/yyyy)</span>
                </div>
              </TableHead>
              <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[130px]">
                <div className="flex flex-col items-center">
                  <span>DPP</span>
                  <span>(Rupiah)</span>
                </div>
              </TableHead>
              <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[120px]">
                <div className="flex flex-col items-center">
                  <span>PPN</span>
                  <span>(Rupiah)</span>
                </div>
              </TableHead>
              <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[100px]">
                <div className="flex flex-col items-center">
                  <span>PPnBM</span>
                  <span>(Rupiah)</span>
                </div>
              </TableHead>
              <TableHead className="text-center text-xs font-bold text-[#0A0A0A] min-w-[150px]">
                Keterangan
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.imporList.map((item) => (
              <TableRow key={item.no} className="border-b border-[rgba(0,0,0,0.10)]">
                <TableCell className="text-center text-xs font-bold text-[#0A0A0A] font-[Consolas]">
                  {item.no}
                </TableCell>
                <TableCell className="text-xs font-normal text-[#0A0A0A] pl-2">
                  {item.namaPenjual}
                </TableCell>
                <TableCell colSpan={1}></TableCell>
                <TableCell className="text-center text-xs font-normal text-[#0A0A0A] font-[Consolas]">
                  {item.nomorDokumen}
                </TableCell>
                <TableCell className="text-center text-xs font-normal text-[#0A0A0A] font-[Consolas]">
                  {item.tanggalDokumen}
                </TableCell>
                <TableCell className="text-right text-xs font-bold text-[#0A0A0A] font-[Consolas]">
                  Rp {item.dpp.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right text-xs font-bold text-[#0A0A0A] font-[Consolas]">
                  Rp {item.ppn.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right text-xs font-bold text-[#0A0A0A] font-[Consolas]">
                  Rp {item.ppnbm.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-xs font-normal text-[#0A0A0A] pl-2">
                  {item.keterangan}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-[#F0FDF4]">
              <TableCell colSpan={5} className="text-center text-xs font-bold text-[#0A0A0A] py-3">
                JUMLAH
              </TableCell>
              <TableCell className="text-right text-base font-bold text-[#0A0A0A] font-[Consolas] py-3">
                B.1 Rp {data.totalImpor.dpp.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-right text-base font-bold text-[#0A0A0A] font-[Consolas] py-3">
                Rp {data.totalImpor.ppn.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-right text-base font-bold text-[#0A0A0A] font-[Consolas] py-3">
                Rp {data.totalImpor.ppnbm.toLocaleString("id-ID")}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
