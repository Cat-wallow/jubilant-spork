'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Plus, Calculator, Search, Filter, MoreHorizontal, Eye, RotateCcw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { entriesData } from '../data/entries-data';

export function EntriesTable() {
  return (
    <Card className="flex flex-col items-start gap-5 self-stretch rounded-[20px] bg-white p-[30px]">
      {/* Header */}
      <div className="flex flex-col items-start gap-5 self-stretch">
        <div className="flex items-start justify-between self-stretch">
          <div className="flex flex-col items-start">
            <h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
              PPN 1111 Entries
            </h2>
            <p className="font-roboto text-xs font-normal leading-4 tracking-[0.4px] text-[#2B3674]">
              Daftar SPT di dalam Project
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button variant="outline" className="gap-1">
              <Download className="h-[30px] w-[30px]" />
              <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
                Export XLSX
              </span>
            </Button>
            <Button variant="outline" className="gap-1">
              <Download className="h-[30px] w-[30px]" />
              <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
                Export PDF
              </span>
            </Button>
            <Button className="gap-3.5 rounded-lg bg-[#030213] px-2.5 py-1.5">
              <Calculator className="h-6 w-6" />
              <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
                Compute
              </span>
            </Button>
            <Button className="h-12 gap-1 rounded-[10px] bg-[#08F] px-3 py-1.5">
              <Plus className="h-6 w-6" />
              <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
                Buat Manual
              </span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-5 self-stretch rounded-[10px] bg-[#F4F7FE] p-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-[54px] gap-1 rounded-[10px] border-[#D9D9D9] bg-white px-[5px] py-0">
                <span className="px-1.5 py-1.5 font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
                  20
                </span>
                <svg width="12" height="24" viewBox="0 0 24 12" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.2884 10.1569L5.63137 4.49994L7.04537 3.08594L11.9954 8.03594L16.9454 3.08594L18.3594 4.49994L12.7024 10.1569C12.5148 10.3444 12.2605 10.4497 11.9954 10.4497C11.7302 10.4497 11.4759 10.3444 11.2884 10.1569Z"
                    fill="#332687"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>10</DropdownMenuItem>
              <DropdownMenuItem>20</DropdownMenuItem>
              <DropdownMenuItem>50</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border border-[#D9D9D9] bg-white px-5">
            <Search className="h-5 w-5 text-[#332687]" />
            <Input
              placeholder="Cari dokumen"
              className="h-auto border-0 p-0 font-dm text-base font-normal leading-5 tracking-[-0.32px] text-[#8F9BBA] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-[54px] gap-1 rounded-[10px] border-[#D9D9D9] bg-white px-[5px] py-0">
                  <span className="px-1.5 py-1.5 font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
                    All Status
                  </span>
                  <svg width="12" height="24" viewBox="0 0 24 12" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.2884 10.1569L5.63137 4.49994L7.04537 3.08594L11.9954 8.03594L16.9454 3.08594L18.3594 4.49994L12.7024 10.1569C12.5148 10.3444 12.2605 10.4497 11.9954 10.4497C11.7302 10.4497 11.4759 10.3444 11.2884 10.1569Z"
                      fill="#332687"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Status</DropdownMenuItem>
                <DropdownMenuItem>Valid</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-[54px] gap-1 rounded-[10px] border-[#D9D9D9] bg-white px-[5px] py-0">
                  <span className="px-1.5 py-1.5 font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
                    All Type
                  </span>
                  <svg width="12" height="24" viewBox="0 0 24 12" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.2884 10.1569L5.63137 4.49994L7.04537 3.08594L11.9954 8.03594L16.9454 3.08594L18.3594 4.49994L12.7024 10.1569C12.5148 10.3444 12.2605 10.4497 11.9954 10.4497C11.7302 10.4497 11.4759 10.3444 11.2884 10.1569Z"
                      fill="#332687"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Type</DropdownMenuItem>
                <DropdownMenuItem>PPN Keluaran</DropdownMenuItem>
                <DropdownMenuItem>PPN Masukan</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="h-[54px] gap-1 rounded-[10px] border-[#D9D9D9] bg-[#F9FAFB] px-[5px] py-0">
              <Filter className="h-[18px] w-[18px] text-[#332687]" />
              <span className="px-1.5 py-1.5 font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">
                Filter
              </span>
            </Button>

            <Button className="h-[54px] w-[54px] rounded-[10px] bg-[#F4F7FE]">
              <MoreHorizontal className="h-[35px] w-[35px] text-[#4318FF]" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[rgba(0,0,0,0.10)]">
              <TableHead className="font-arial text-sm font-normal text-[#0A0A0A]">Pos SPT</TableHead>
              <TableHead className="font-arial text-sm font-normal text-[#0A0A0A]">Form Ref</TableHead>
              <TableHead className="font-arial text-sm font-normal text-[#0A0A0A]">No Faktur/PEB/PIB</TableHead>
              <TableHead className="font-arial text-sm font-normal text-[#0A0A0A]">Tanggal Faktur</TableHead>
              <TableHead className="text-right font-arial text-sm font-normal text-[#0A0A0A]">DPP</TableHead>
              <TableHead className="text-right font-arial text-sm font-normal text-[#0A0A0A]">PPN</TableHead>
              <TableHead className="font-arial text-sm font-normal text-[#0A0A0A]">Masa</TableHead>
              <TableHead className="font-arial text-sm font-normal text-[#0A0A0A]">FP Pengganti</TableHead>
              <TableHead className="font-arial text-sm font-normal text-[#0A0A0A]">Progress</TableHead>
              <TableHead className="font-arial text-sm font-normal text-[#0A0A0A]">Approval</TableHead>
              <TableHead className="font-arial text-sm font-normal text-[#0A0A0A]">Status</TableHead>
              <TableHead className="text-center font-arial text-sm font-normal text-[#0A0A0A]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entriesData.map((entry, index) => (
              <TableRow key={index} className="border-b border-[rgba(0,0,0,0.10)]">
                <TableCell>
                  <Badge className="rounded-lg border-0 bg-[#DBEAFE] px-2 py-0.5 font-arial text-xs font-normal text-[#193CB8]">
                    {entry.posSpt}
                  </Badge>
                </TableCell>
                <TableCell className="font-consolas text-sm text-[#0A0A0A]">{entry.formRef}</TableCell>
                <TableCell className="font-consolas text-sm text-[#0A0A0A]">{entry.noFaktur}</TableCell>
                <TableCell className="font-arial text-sm text-[#0A0A0A]">{entry.tanggalFaktur}</TableCell>
                <TableCell className="text-right font-arial text-sm text-[#0A0A0A]">{entry.dpp}</TableCell>
                <TableCell className="text-right font-arial text-sm text-[#0A0A0A]">{entry.ppn}</TableCell>
                <TableCell className="font-arial text-sm text-[#0A0A0A]">{entry.masa}</TableCell>
                <TableCell className="font-arial text-sm text-[#717182]">{entry.fpPengganti}</TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-lg border-0 px-2 py-0.5 font-arial text-xs font-normal ${
                      entry.progress === 'Completed'
                        ? 'bg-[#D0FAE5] text-[#006045]'
                        : entry.progress === 'Review Required'
                          ? 'bg-[#FEF9C2] text-[#894B00]'
                          : entry.progress === 'In Progress'
                            ? 'bg-[#DBEAFE] text-[#193CB8]'
                            : 'bg-[#F3F4F6] text-[#1E2939]'
                    }`}
                  >
                    {entry.progress}
                  </Badge>
                </TableCell>
                <TableCell>
                  {entry.approval ? (
                    <div className="flex flex-col gap-1">
                      <Badge className="w-fit rounded-lg border-0 bg-[#DCFCE7] px-2 py-0.5 font-arial text-xs font-normal text-[#016630]">
                        Approved
                      </Badge>
                      <div className="font-arial text-xs text-[#717182]">{entry.approval.by}</div>
                      <div className="font-arial text-xs text-[#717182]">{entry.approval.date}</div>
                    </div>
                  ) : (
                    <Badge className="rounded-lg border-0 bg-[#FEF9C2] px-2 py-0.5 font-arial text-xs font-normal text-[#894B00]">
                      Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className="rounded-lg border-0 bg-[#DCFCE7] px-2 py-0.5 font-arial text-xs font-normal text-[#016630]">
                    {entry.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between self-stretch">
        <div className="font-geist text-sm font-normal leading-[150%] tracking-[0.07px] text-[#737373]">
          Showing 1-10 of 100 products
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="border-[#D4D4D4]">
            1
          </Button>
          <Button variant="ghost" size="sm">
            2
          </Button>
          <Button variant="ghost" size="sm">
            3
          </Button>
          <Button variant="ghost" size="sm">
            4
          </Button>
          <Button variant="ghost" size="sm">
            ...
          </Button>
          <Button variant="ghost" size="sm">
            10
          </Button>
          <Button variant="ghost" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
