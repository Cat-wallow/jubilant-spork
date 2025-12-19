'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Calendar, Filter, MoreHorizontal, ChevronDown } from 'lucide-react';

interface ReportFiltersProps {
  showAddButton?: boolean;
  addButtonText?: string;
  onAdd?: () => void;
}

export default function ReportFilters({
  showAddButton = false,
  addButtonText = 'Tambah Akun',
  onAdd,
}: ReportFiltersProps) {
  return (
    <div className="space-y-4">
      {showAddButton && (
        <div className="flex items-center justify-between border border-[#8C8C8C] p-4">
          <div>
            <h2 className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#2B3674]">
              General Ledger
            </h2>
            <p className="font-roboto text-xs leading-4 tracking-wide text-[#2B3674]">
              Daftar jurnal per akun dengan kemampuan drill-down ke voucher detail
            </p>
          </div>
          <Button
            onClick={onAdd}
            className="rounded-lg bg-[#332687] px-4 py-3 text-white hover:bg-[#2a1f6f]"
          >
            <span className="mr-2 text-xl">+</span>
            {addButtonText}
          </Button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Select defaultValue="20">
          <SelectTrigger className="h-[54px] w-[120px] rounded-lg border border-[#D9D9D9]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="h-[54px] w-[150px] rounded-lg border border-[#D9D9D9]">
            <SelectValue placeholder="Pilih Akun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Akun</SelectItem>
            <SelectItem value="1102">1102 - Bank</SelectItem>
            <SelectItem value="2101">2101 - Hutang PPN</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#332687]" />
          <Input
            placeholder="Nama tugas"
            className="h-[54px] rounded-lg border border-[#D9D9D9] pl-10 font-dm text-base text-[#8F9BBA]"
          />
        </div>

        <Button
          variant="outline"
          className="h-[54px] gap-2 rounded-lg border border-[#D9D9D9] px-4"
        >
          Rentang Waktu
          <Calendar className="h-5 w-5 text-[#332687]" />
        </Button>

        <div className="flex gap-2">
          <Select defaultValue="all-status">
            <SelectTrigger className="h-[54px] w-[140px] rounded-lg border border-[#D9D9D9]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-type">
            <SelectTrigger className="h-[54px] w-[130px] rounded-lg border border-[#D9D9D9]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-type">All Type</SelectItem>
              <SelectItem value="journal">Journal</SelectItem>
              <SelectItem value="voucher">Voucher</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="h-[54px] gap-2 rounded-lg border border-[#D9D9D9] px-4"
          >
            <Filter className="h-4 w-4 text-[#332687]" />
            Filter
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-[54px] w-[54px] rounded-lg border border-[#D9D9D9]"
          >
            <MoreHorizontal className="h-6 w-6 text-[#4318FF]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
