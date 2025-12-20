'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Edit2,
  FileText,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal as MoreIcon
} from 'lucide-react';

// Mock Data
const sptData = [
  {
    id: 1,
    type: 'PPN',
    subType: 'PPN Keluaran',
    dasarPengenaan: 'Rp 125.000.000',
    tarif: '11%',
    pajakTerutang: 'Rp 13.750.000',
    kredit: 'Rp 0',
    neto: 'Rp 13.750.000',
    status: 'final',
    sptStatus: 'Ready',
  },
  {
    id: 2,
    type: 'PPN',
    subType: 'PPN Masukan',
    dasarPengenaan: 'Rp 85.000.000',
    tarif: '11%',
    pajakTerutang: 'Rp 9.350.000',
    kredit: 'Rp 9.350.000',
    neto: 'Rp 0',
    status: 'final',
    sptStatus: 'Ready',
  },
  {
    id: 3,
    type: 'PPh',
    subType: 'PPh 21',
    dasarPengenaan: 'Rp 45.000.000',
    tarif: '5%',
    pajakTerutang: 'Rp 2.250.000',
    kredit: 'Rp 0',
    neto: 'Rp 2.250.000',
    status: 'final',
    sptStatus: 'Ready',
  },
  {
    id: 4,
    type: 'PPh',
    subType: 'PPh 23',
    dasarPengenaan: 'Rp 35.000.000',
    tarif: '2%',
    pajakTerutang: 'Rp 700.000',
    kredit: 'Rp 0',
    neto: 'Rp 700.000',
    status: 'final',
    sptStatus: 'Ready',
  },
  {
    id: 5,
    type: 'PPh',
    subType: 'PPh 25',
    dasarPengenaan: 'Rp 180.000.000',
    tarif: '25%',
    pajakTerutang: 'Rp 45.000.000',
    kredit: 'Rp 42.000.000',
    neto: 'Rp 3.000.000',
    status: 'final',
    sptStatus: 'Ready',
  },
  {
    id: 6,
    type: 'PPh',
    subType: 'PPh 22',
    dasarPengenaan: 'Rp 25.000.000',
    tarif: '0.5%',
    pajakTerutang: 'Rp 125.000',
    kredit: 'Rp 0',
    neto: 'Rp 125.000',
    status: 'final',
    sptStatus: 'Pending',
  },
  {
    id: 7,
    type: 'PPh',
    subType: 'PPh 26',
    dasarPengenaan: 'Rp 15.000.000',
    tarif: '20%',
    pajakTerutang: 'Rp 3.000.000',
    kredit: 'Rp 0',
    neto: 'Rp 3.000.000',
    status: 'draft',
    sptStatus: 'Pending',
  },
  {
    id: 8,
    type: 'PPh',
    subType: 'PPh Final',
    dasarPengenaan: 'Rp 12.000.000',
    tarif: '0.5%',
    pajakTerutang: 'Rp 60.000',
    kredit: 'Rp 0',
    neto: 'Rp 60.000',
    status: 'final',
    sptStatus: 'Ready',
  },
  {
    id: 9,
    type: 'PPN',
    subType: 'PPN Ekspor (0%)',
    dasarPengenaan: 'Rp 50.000.000',
    tarif: '0%',
    pajakTerutang: 'Rp 0',
    kredit: 'Rp 0',
    neto: 'Rp 0',
    status: 'final',
    sptStatus: 'Ready',
  },
  {
    id: 10,
    type: 'PPh',
    subType: 'PPh 29',
    dasarPengenaan: 'Rp 95.000.000',
    tarif: '25%',
    pajakTerutang: 'Rp 23.750.000',
    kredit: 'Rp 22.000.000',
    neto: 'Rp 1.750.000',
    status: 'draft',
    sptStatus: 'Pending',
  },
];

export function DaftarSPTTable() {
  return (
    <div className="flex flex-col gap-[30px] rounded-[14px] bg-white pb-8">
      {/* Header & Toolbar */}
      <div className="flex flex-col gap-5 p-[30px] pb-0">
        <div className="flex flex-col gap-1">
          <h3 className="font-arial text-2xl font-bold leading-8 text-[#0A0A0A]">
            Daftar SPT
          </h3>
          <p className="font-arial text-base font-normal leading-4 text-[#717182]">
            Kelola dan pantau status pelaporan SPT
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" className="gap-2 text-[#0A0A0A]">
            Label
            <ChevronLeft className="h-3 w-3 rotate-[-90deg]" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="relative w-[895px]">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0A0A0A]" />
              <Input
                placeholder="Cari nama user"
                className="h-[54px] rounded-[10px] border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white pl-[55px] font-arial text-base"
              />
            </div>
            
            <div className="flex items-center gap-3">
                <Button variant="outline" className="h-[54px] gap-2 rounded-[10px] px-4 font-arial text-base text-[#0A0A0A]">
                  Label
                  <ChevronLeft className="h-3 w-3 rotate-[-90deg]" />
                </Button>
                <Button variant="outline" className="h-[54px] gap-2 rounded-[10px] px-4 font-arial text-base text-[#0A0A0A]">
                  Label
                  <ChevronLeft className="h-3 w-3 rotate-[-90deg]" />
                </Button>
                <Button variant="outline" className="h-[54px] gap-2 rounded-[10px] px-4 font-arial text-base text-[#0A0A0A]">
                  <Filter className="h-[18px] w-[18px]" />
                  Label
                </Button>
                <Button variant="outline" className="h-[54px] w-[54px] rounded-[10px] p-0">
                  <MoreHorizontal className="h-[35px] w-[35px] text-[#0A0A0A]" />
                </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-[30px]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[217px] font-arial text-base font-bold text-[#717182]">Jenis Pajak</TableHead>
              <TableHead className="w-[160px] font-arial text-base font-bold text-[#717182]">Dasar Pengenaan</TableHead>
              <TableHead className="w-[58px] font-arial text-base font-bold text-[#717182]">Tarif</TableHead>
              <TableHead className="w-[139px] font-arial text-base font-bold text-[#717182]">Pajak Terutang</TableHead>
              <TableHead className="w-[130px] font-arial text-base font-bold text-[#717182]">Kredit</TableHead>
              <TableHead className="w-[131px] font-arial text-base font-bold text-[#717182]">Neto</TableHead>
              <TableHead className="w-[76px] font-arial text-base font-bold text-[#717182]">Status</TableHead>
              <TableHead className="w-[100px] font-arial text-base font-bold text-[#717182]">SPT</TableHead>
              <TableHead className="w-[117px] font-arial text-base font-bold text-[#717182]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sptData.map((row) => (
              <TableRow key={row.id} className="h-[49px] border-b border-[rgba(0,0,0,0.10)] hover:bg-muted/50">
                <TableCell className="font-arial text-base font-normal text-[#0A0A0A]">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="h-[21px] rounded bg-[#F3F4F6] px-2 py-[3px] font-arial text-xs font-medium text-[#1F2937]">
                      {row.type}
                    </Badge>
                    <span>{row.subType}</span>
                  </div>
                </TableCell>
                <TableCell className="font-arial text-base font-normal text-[#0A0A0A]">{row.dasarPengenaan}</TableCell>
                <TableCell className="font-arial text-base font-normal text-[#0A0A0A]">{row.tarif}</TableCell>
                <TableCell className="font-arial text-base font-normal text-[#0A0A0A]">{row.pajakTerutang}</TableCell>
                <TableCell className="font-arial text-base font-normal text-[#0A0A0A]">{row.kredit}</TableCell>
                <TableCell className="font-arial text-base font-bold text-[#0A0A0A]">{row.neto}</TableCell>
                <TableCell>
                  <Badge
                    variant={row.status === 'final' ? 'default' : 'secondary'}
                    className={`h-[21px] rounded px-2 py-[3px] font-arial text-xs font-medium capitalize ${
                      row.status === 'final'
                        ? 'bg-[#E6F4EA] text-[#137333] hover:bg-[#E6F4EA]'
                        : 'bg-[#F3F4F6] text-[#1F2937] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`h-4 w-4 rounded-full border-2 ${row.sptStatus === 'Ready' ? 'border-[#00C950]' : 'border-[#FFB020]'}`} />
                    <span className="font-arial text-base font-normal text-[#0A0A0A]">
                      {row.sptStatus}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-9">
                      <Download className="h-4 w-4 text-[#717182]" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-9">
                      <Edit2 className="h-4 w-4 text-[#717182]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-[30px]">
        <span className="font-arial text-sm font-normal text-[#717182]">
          Showing 1-10 of 100 products
        </span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-[10px] border-[rgba(0,0,0,0.10)]" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="default" className="h-9 w-9 rounded-[10px] bg-[#2B7FFF] p-0 font-arial text-sm font-medium text-white hover:bg-[#2B7FFF]/90">
            1
          </Button>
          <Button variant="ghost" className="h-9 w-9 rounded-[10px] p-0 font-arial text-sm font-normal text-[#717182]">
            2
          </Button>
          <Button variant="ghost" className="h-9 w-9 rounded-[10px] p-0 font-arial text-sm font-normal text-[#717182]">
            3
          </Button>
          <Button variant="ghost" className="h-9 w-9 rounded-[10px] p-0 font-arial text-sm font-normal text-[#717182]">
            4
          </Button>
          <span className="flex h-9 w-9 items-center justify-center font-arial text-sm text-[#717182]">...</span>
          <Button variant="ghost" className="h-9 w-9 rounded-[10px] p-0 font-arial text-sm font-normal text-[#717182]">
            10
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-[10px] border-[rgba(0,0,0,0.10)]">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
