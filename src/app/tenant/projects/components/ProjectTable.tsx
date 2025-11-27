'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ChevronDown, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProjectTableProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
}

const dummyProjects = [
  {
    id: 1,
    code: 'PRJ-25-MS.001',
    name: 'Konsultan Pajak PT Maju Bersama',
    client: 'PT. MAJU SUKSES',
    period: 'Jan 2024',
    modules: ['KK1', 'KK2', 'KK3', 'KK4', 'KK5'],
    status: 'Selesai',
    progress: 75.5,
    daysOverdue: 8,
    contact: 'Tim Solo',
  },
  {
    id: 2,
    code: 'PRJ-25-MS.002',
    name: 'Konsultan Pajak PT Maju Bersama',
    client: 'PT. MAJU SUKSES',
    period: 'Jan 2024',
    modules: ['KK1', 'KK2', 'KK3', 'KK4', 'KK5'],
    status: 'In Progress',
    progress: 75.5,
    daysOverdue: 8,
    contact: 'Tim Solo',
  },
  {
    id: 3,
    code: 'PRJ-25-MS.003',
    name: 'Konsultan Pajak PT Maju Bersama',
    client: 'PT. MAJU SUKSES',
    period: 'Jan 2024',
    modules: ['KK1', 'KK2', 'KK3', 'KK4', 'KK5'],
    status: 'Overdue',
    progress: 75.5,
    daysOverdue: 8,
    contact: 'Tim Solo',
  },
  {
    id: 4,
    code: 'PRJ-25-MS.004',
    name: 'Konsultan Pajak PT Maju Bersama',
    client: 'PT. MAJU SUKSES',
    period: 'Jan 2024',
    modules: ['KK1', 'KK2', 'KK3', 'KK4', 'KK5'],
    status: 'Overdue',
    progress: 75.5,
    daysOverdue: 8,
    contact: 'Tim Solo',
  },
];

export default function ProjectTable({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
}: ProjectTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { bg: string; text: string }> = {
      Selesai: { bg: 'bg-[#CFF7D3]', text: 'text-[#4A4459]' },
      'In Progress': { bg: 'bg-[#E8DEF8]', text: 'text-[#4A4459]' },
      Overdue: { bg: 'bg-[#EC221F]', text: 'text-white' },
    };

    const variant = variants[status] || variants['In Progress'];

    return (
      <span
        className={`inline-flex min-w-[48px] items-center justify-center gap-0.5 rounded-[50px] px-3 py-1.5 text-sm font-medium ${variant.bg} ${variant.text}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-[50px]">
      {/* Filters */}
      <div className="flex items-center gap-5 self-stretch rounded-[10px] bg-[#F4F7FE] p-2.5">
        <div className="flex h-[54px] items-center rounded-[10px] border border-[#D9D9D9] bg-white px-[5px]">
          <Select value="20">
            <SelectTrigger className="h-auto w-auto border-0 bg-transparent px-2.5 py-1.5 focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-1 items-center gap-[15px] rounded-[10px] border border-[#D9D9D9] bg-white px-5 py-0">
          <Search className="h-5 w-5 text-[#332687]" strokeWidth={3} />
          <Input
            placeholder="Cari Nama Project atau Nama Klien"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-[54px] border-0 bg-transparent font-dm text-base font-normal leading-5 tracking-[-0.32px] placeholder:text-[#8F9BBA] focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="h-[54px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-full rounded-[10px] border-[#D9D9D9] bg-white px-[5px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="selesai">Selesai</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-[54px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-full rounded-[10px] border-[#D9D9D9] bg-white px-[5px]">
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Type</SelectItem>
                <SelectItem value="type1">Type 1</SelectItem>
                <SelectItem value="type2">Type 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="h-[54px] rounded-[10px] border-[#D9D9D9] bg-[#F9FAFB] px-[5px]"
          >
            <Filter className="mr-1 h-[18px] w-[18px] text-[#332687]" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
              Filter
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-[54px] w-[54px] rounded-[10px] bg-[#F4F7FE] p-0"
          >
            <MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-2.5">
        <div className="h-px w-full bg-[#E9EDF7]" />

        <Table>
          <TableHeader>
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-2.5">
                  <Checkbox />
                  <span>Kode Project</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-[7px]">
                  <span>Klien/WP</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-[7px]">
                  <span>Periode</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-[7px]">
                  <span>Modul</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-[7px]">
                  <span>Status</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-[7px]">
                  <span>Propgress</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-[7px]">
                  <span>Days Overdue</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-[7px]">
                  <span>Contact</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-[7px]">
                  <span>Action</span>
                  <ChevronDown className="h-6 w-6" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyProjects.map((project) => (
              <TableRow key={project.id} className="border-0">
                <TableCell className="w-[120px]">
                  <div className="flex items-center gap-2.5">
                    <Checkbox />
                    <div className="flex flex-col">
                      <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
                        {project.name}
                      </span>
                      <span className="text-sm font-normal leading-[19.6px] text-[#2B3674]">
                        {project.code}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[120px]">
                  <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
                    {project.client}
                  </span>
                </TableCell>
                <TableCell className="w-[120px]">
                  <div className="inline-flex items-center justify-center rounded-[6.25px] border border-[#C2C5CC] bg-[#EEEFF1] px-[3px] py-[3px]">
                    <span className="font-inter text-[10.7px] font-normal text-[#7C7D8C]">
                      {project.period}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="w-[120px]">
                  <div className="flex flex-wrap gap-1">
                    {project.modules.map((module, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center justify-center rounded-[6.25px] border border-[rgba(145,158,171,0.2)] bg-[#F4F7FE] px-2.5 py-[5px]"
                      >
                        <span className="font-inter text-xs font-normal text-[#404040]">
                          {module}
                        </span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="w-[120px]">{getStatusBadge(project.status)}</TableCell>
                <TableCell className="w-[120px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
                      {project.progress}%
                    </span>
                    <div className="relative h-2 w-[63px] overflow-hidden rounded-[21px] bg-[#EFF4FB]">
                      <div
                        className="h-full rounded-[21px] bg-[#4318FF]"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[120px]">
                  <div className="inline-flex items-center justify-center rounded-[5.75px] border border-[#FEC4BE] bg-[#F9E6E7] px-2 py-1.5">
                    <span className="font-inter text-xs font-normal text-[#E47174]">
                      {project.daysOverdue} hari
                    </span>
                  </div>
                </TableCell>
                <TableCell className="w-[120px]">
                  <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674]">
                    {project.contact}
                  </span>
                </TableCell>
                <TableCell className="w-[120px]">
                  <div className="flex items-center gap-5">
                    <button className="p-0.5">
                      <Edit className="h-6 w-6 text-[#6750A4]" />
                    </button>
                    <button className="p-0.5">
                      <Trash2 className="h-[30px] w-[30px] text-[#BF6A02]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableRow>
          <TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between self-stretch">
          <span className="font-geist text-sm font-normal leading-[150%] tracking-[0.07px] text-[#737373]">
            Showing 1-10 of 100 products
          </span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="font-geist">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="font-geist">
              1
            </Button>
            <Button variant="ghost" size="sm" className="font-geist">
              2
            </Button>
            <Button variant="ghost" size="sm" className="font-geist">
              3
            </Button>
            <Button variant="ghost" size="sm" className="font-geist">
              4
            </Button>
            <span className="px-2">...</span>
            <Button variant="ghost" size="sm" className="font-geist">
              10
            </Button>
            <Button variant="ghost" size="sm" className="font-geist">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}