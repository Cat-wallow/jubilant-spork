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
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
} from 'lucide-react';

const mappingData = [
  {
    id: '1101',
    accountNo: '1101',
    accountName: 'Kas',
    type: 'Asset',
    normalSide: 'Debit',
    taxMapping: ['No Tax'],
    status: 'Active',
  },
  {
    id: '1102',
    accountNo: '1102',
    accountName: 'Bank',
    type: 'Asset',
    normalSide: 'Debit',
    taxMapping: ['No Tax'],
    status: 'Active',
  },
  {
    id: '1201',
    accountNo: '1201',
    accountName: 'Piutang Dagang',
    type: 'Asset',
    normalSide: 'Debit',
    taxMapping: ['No Tax'],
    status: 'Active',
  },
  {
    id: '1301',
    accountNo: '1301',
    accountName: 'Piutang PPh 22',
    type: 'Asset',
    normalSide: 'Debit',
    taxMapping: ['PPh'],
    status: 'Active',
  },
  {
    id: '1302',
    accountNo: '1302',
    accountName: 'Piutang PPh 23',
    type: 'Asset',
    normalSide: 'Debit',
    taxMapping: ['PPh'],
    status: 'Active',
  },
  {
    id: '2101',
    accountNo: '2101',
    accountName: 'Hutang PPN',
    type: 'Liability',
    normalSide: 'Credit',
    taxMapping: ['PPN'],
    status: 'Active',
  },
  {
    id: '2201',
    accountNo: '2201',
    accountName: 'Uang Muka Penjualan',
    type: 'Liability',
    normalSide: 'Credit',
    taxMapping: ['No Tax'],
    status: 'Active',
  },
  {
    id: '4101',
    accountNo: '4101',
    accountName: 'Penjualan',
    type: 'Revenue',
    normalSide: 'Credit',
    taxMapping: ['PPN', 'PPh'],
    status: 'Active',
  },
  {
    id: '4102',
    accountNo: '4102',
    accountName: 'Penjualan Service',
    type: 'Revenue',
    normalSide: 'Credit',
    taxMapping: ['PPN', 'PPh'],
    status: 'Active',
  },
  {
    id: '4103',
    accountNo: '4103',
    accountName: 'Penjualan Sparepart',
    type: 'Revenue',
    normalSide: 'Credit',
    taxMapping: ['PPN', 'PPh'],
    status: 'Active',
  },
  {
    id: '2301',
    accountNo: '2301',
    accountName: 'Hutang Accrual',
    type: 'Liability',
    normalSide: 'Credit',
    taxMapping: ['No Tax'],
    status: 'Active',
  },
  {
    id: '5101',
    accountNo: '5101',
    accountName: 'Beban Operasional',
    type: 'Expense',
    normalSide: 'Debit',
    taxMapping: ['No Tax'],
    status: 'Active',
  },
  {
    id: '3101',
    accountNo: '3101',
    accountName: 'Modal Disetor',
    type: 'Equity',
    normalSide: 'Credit',
    taxMapping: ['No Tax'],
    status: 'Active',
  },
  {
    id: '3201',
    accountNo: '3201',
    accountName: 'Laba Ditahan',
    type: 'Equity',
    normalSide: 'Credit',
    taxMapping: ['No Tax'],
    status: 'Active',
  },
];

export function CoAMappingTable() {
  return (
    <div className="flex flex-col gap-[30px] rounded-[14px] bg-white pb-8">
      {/* Header & Toolbar */}
      <div className="flex flex-col gap-5 p-[30px] pb-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {/* Title placeholder if needed, though design shows it in the tab content area roughly */}
          </div>
          <Button className="gap-2 bg-[#2B7FFF] font-arial text-base font-medium text-white hover:bg-[#2B7FFF]/90">
            <Plus className="h-4 w-4" />
            New Account
          </Button>
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
                placeholder="Cari dokumen"
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
              <TableHead className="w-[197px] font-arial text-base font-bold text-[#717182]">Account No</TableHead>
              <TableHead className="w-[325px] font-arial text-base font-bold text-[#717182]">Account Name</TableHead>
              <TableHead className="w-[172px] font-arial text-base font-bold text-[#717182]">Type</TableHead>
              <TableHead className="w-[204px] font-arial text-base font-bold text-[#717182]">Normal Side</TableHead>
              <TableHead className="w-[215px] font-arial text-base font-bold text-[#717182]">Tax Mapping</TableHead>
              <TableHead className="w-[145px] font-arial text-base font-bold text-[#717182]">Status</TableHead>
              <TableHead className="w-[207px] font-arial text-base font-bold text-[#717182]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mappingData.map((row) => (
              <TableRow key={row.id} className="h-[49px] border-b border-[rgba(0,0,0,0.10)] hover:bg-muted/50">
                <TableCell className="font-arial text-base font-normal text-[#0A0A0A]">{row.accountNo}</TableCell>
                <TableCell className="font-arial text-base font-normal text-[#0A0A0A]">{row.accountName}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="h-[21px] rounded bg-[#F3F4F6] px-2 py-[3px] font-arial text-xs font-medium text-[#1F2937]">
                    {row.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="h-[21px] rounded bg-[#F3F4F6] px-2 py-[3px] font-arial text-xs font-medium text-[#1F2937]">
                    {row.normalSide}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {row.taxMapping.map((tax, idx) => (
                      <Badge key={idx} variant="secondary" className="h-[21px] rounded bg-[#F3F4F6] px-2 py-[3px] font-arial text-xs font-medium text-[#1F2937]">
                        {tax}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="h-[21px] rounded bg-[#E6F4EA] px-2 py-[3px] font-arial text-xs font-medium text-[#137333] hover:bg-[#E6F4EA]">
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-9">
                      <Edit2 className="h-4 w-4 text-[#717182]" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-9">
                      <Trash2 className="h-4 w-4 text-[#717182]" />
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
