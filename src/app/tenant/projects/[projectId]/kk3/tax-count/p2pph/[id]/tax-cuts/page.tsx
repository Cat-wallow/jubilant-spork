'use client';

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, ChevronDown } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatsCard } from './stats-card';
import { transactionData, type Transaction } from './data';

export default function TaxCutsPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.33203 1.66602V18.3327L4.9987 17.4993L6.66536 18.3327L8.33203 17.4993L9.9987 18.3327L11.6654 17.4993L13.332 18.3327L14.9987 17.4993L16.6654 18.3327V1.66602L14.9987 2.49935L13.332 1.66602L11.6654 2.49935L9.9987 1.66602L8.33203 2.49935L6.66536 1.66602L4.9987 2.49935L3.33203 1.66602Z" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.3346 6.66602H8.33464C7.89261 6.66602 7.46869 6.84161 7.15612 7.15417C6.84356 7.46673 6.66797 7.89065 6.66797 8.33268C6.66797 8.77471 6.84356 9.19863 7.15612 9.51119C7.46869 9.82375 7.89261 9.99935 8.33464 9.99935H11.668C12.11 9.99935 12.5339 10.1749 12.8465 10.4875C13.159 10.8001 13.3346 11.224 13.3346 11.666C13.3346 12.108 13.159 12.532 12.8465 12.8445C12.5339 13.1571 12.11 13.3327 11.668 13.3327H6.66797" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 14.5827V5.41602" stroke="#155DFC" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Total Transaksi',
      value: '5',
      bgColor: 'bg-blue-100',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 1.66602V18.3327" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.1667 4.16602H7.91667C7.14312 4.16602 6.40125 4.47331 5.85427 5.02029C5.30729 5.56727 5 6.30913 5 7.08268C5 7.85623 5.30729 8.5981 5.85427 9.14508C6.40125 9.69206 7.14312 9.99935 7.91667 9.99935H12.0833C12.8569 9.99935 13.5987 10.3066 14.1457 10.8536C14.6927 11.4006 15 12.1425 15 12.916C15 13.6896 14.6927 14.4314 14.1457 14.9784C13.5987 15.5254 12.8569 15.8327 12.0833 15.8327H5" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Total PPh',
      value: 'Rp 3.450.000',
      bgColor: 'bg-green-100',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.9987 1.66602H4.9987C4.07822 1.66602 3.33203 2.41221 3.33203 3.33268V16.666C3.33203 17.5865 4.07822 18.3327 4.9987 18.3327H14.9987C15.9192 18.3327 16.6654 17.5865 16.6654 16.666V3.33268C16.6654 2.41221 15.9192 1.66602 14.9987 1.66602Z" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 18.3333V15H12.5V18.3333" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.66797 5H6.6763" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.332 5H13.3404" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 5H10.0083" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 8.33398H10.0083" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 11.666H10.0083" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.332 8.33398H13.3404" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.332 11.666H13.3404" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.66797 8.33398H6.6763" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.66797 11.666H6.6763" stroke="#F54900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Total DPP',
      value: 'Rp 88.000.000',
      bgColor: 'bg-orange-100',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8346 17.5V15.8333C15.8346 14.9493 15.4834 14.1014 14.8583 13.4763C14.2332 12.8512 13.3854 12.5 12.5013 12.5H7.5013C6.61725 12.5 5.7694 12.8512 5.14428 13.4763C4.51916 14.1014 4.16797 14.9493 4.16797 15.8333V17.5" stroke="#9810FA" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.0013 9.16667C11.8423 9.16667 13.3346 7.67428 13.3346 5.83333C13.3346 3.99238 11.8423 2.5 10.0013 2.5C8.16035 2.5 6.66797 3.99238 6.66797 5.83333C6.66797 7.67428 8.16035 9.16667 10.0013 9.16667Z" stroke="#9810FA" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Wajib Pajak',
      value: '5',
      bgColor: 'bg-purple-100',
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(transactionData.map(t => t.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-6">
        <div className="mb-5">
          <h2 className="font-dm text-2xl font-bold text-[#2B3674] leading-8 tracking-[-0.48px]">
            Transaksi Pemotongan
          </h2>
          <p className="text-xs text-[#2B3674] leading-4 tracking-[0.4px]">
            Daftar transkasi tercatat
          </p>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-5 rounded-lg bg-[#F4F7FE] p-2.5">
          <Select value={itemsPerPage.toString()} onValueChange={(v) => setItemsPerPage(Number(v))}>
            <SelectTrigger className="w-auto h-[54px] rounded-lg border border-[#D9D9D9] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1 flex items-center gap-4 h-[54px] px-5 rounded-lg border border-[#D9D9D9] bg-white">
            <Search className="h-5 w-5 text-[#332687]" />
            <Input
              placeholder="Cari nama user"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 p-0 h-auto text-base text-[#8F9BBA] placeholder:text-[#8F9BBA] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <Select defaultValue="all-status">
              <SelectTrigger className="w-auto h-[54px] rounded-lg border border-[#D9D9D9] bg-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="review">Review</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-type">
              <SelectTrigger className="w-auto h-[54px] rounded-lg border border-[#D9D9D9] bg-white">
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-type">All Type</SelectItem>
                <SelectItem value="pph-21">PPh 21</SelectItem>
                <SelectItem value="pph-23">PPh 23</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="h-[54px] rounded-lg border border-[#D9D9D9] bg-[#F9FAFB]">
              <Filter className="h-[18px] w-[18px] text-[#332687]" />
              <span className="text-sm font-medium text-[#49454F]">Filter</span>
            </Button>

            <Button variant="ghost" className="h-[54px] w-[54px] rounded-lg bg-[#F4F7FE] p-0 hover:bg-[#F4F7FE]/80">
              <MoreHorizontal className="h-9 w-9 text-[#4318FF]" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10">
                <th className="h-10 px-2 text-left">
                  <Checkbox
                    checked={selectedRows.length === transactionData.length}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Bukti Potong</th>
                <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Pasal</th>
                <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Wajib Pajak</th>
                <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Objek Pajak</th>
                <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">DPP</th>
                <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Tarif</th>
                <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">PPh Dipotong</th>
                <th className="h-10 px-2 text-left text-sm font-normal text-[#0A0A0A]">Status</th>
                <th className="h-10 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((transaction) => (
                <tr key={transaction.id} className="border-b border-black/10">
                  <td className="h-14 px-2">
                    <Checkbox
                      checked={selectedRows.includes(transaction.id)}
                      onCheckedChange={(checked) => handleSelectRow(transaction.id, checked as boolean)}
                    />
                  </td>
                  <td className="h-14 px-2">
                    <div className="flex flex-col">
                      <span className="text-sm text-[#0A0A0A]">{transaction.buktiPotong}</span>
                      <span className="text-sm text-[#717182]">{transaction.date}</span>
                    </div>
                  </td>
                  <td className="h-14 px-2">
                    <Badge
                      className={`rounded-lg border-0 text-xs font-normal ${
                        transaction.pasal === 'PPh 23'
                          ? 'bg-green-100 text-[#016630]'
                          : 'bg-blue-100 text-[#193CB8]'
                      }`}
                    >
                      {transaction.pasal}
                    </Badge>
                  </td>
                  <td className="h-14 px-2">
                    <div className="flex flex-col">
                      <span className="text-sm text-[#0A0A0A]">{transaction.wajibPajak.name}</span>
                      <span className="text-sm font-mono text-[#717182]">{transaction.wajibPajak.npwp}</span>
                    </div>
                  </td>
                  <td className="h-14 px-2">
                    <span className="text-sm text-[#0A0A0A]">{transaction.objekPajak}</span>
                  </td>
                  <td className="h-14 px-2">
                    <span className="text-sm text-[#0A0A0A]">{transaction.dpp}</span>
                  </td>
                  <td className="h-14 px-2">
                    <Badge variant="outline" className="rounded-lg text-xs font-normal text-[#0A0A0A]">
                      {transaction.tarif}
                    </Badge>
                  </td>
                  <td className="h-14 px-2">
                    <span className="text-sm font-bold text-[#030213]">{transaction.pphDipotong}</span>
                  </td>
                  <td className="h-14 px-2">
                    <Badge
                      className={`rounded-lg border-0 text-xs font-normal flex items-center gap-2 ${
                        transaction.status === 'VALID'
                          ? 'bg-green-100 text-[#016630]'
                          : 'bg-blue-100 text-[#193CB8]'
                      }`}
                    >
                      {transaction.status === 'VALID' ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.8993 4.99975C11.1277 6.1204 10.9649 7.28546 10.4383 8.30065C9.91157 9.31583 9.05278 10.1198 8.00509 10.5784C6.9574 11.037 5.78414 11.1226 4.68098 10.8209C3.57782 10.5192 2.61142 9.84845 1.94297 8.92046C1.27451 7.99247 0.94439 6.86337 1.00766 5.72144C1.07093 4.57952 1.52377 3.4938 2.29065 2.64534C3.05754 1.79688 4.09212 1.23697 5.22186 1.05898C6.3516 0.880989 7.50822 1.09568 8.49883 1.66725" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4.5 5.5L6 7L11 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.03125 6.17369C0.989582 6.06143 0.989582 5.93795 1.03125 5.82569C1.4371 4.84162 2.12601 4.00021 3.01064 3.40814C3.89527 2.81607 4.93577 2.5 6.00025 2.5C7.06473 2.5 8.10524 2.81607 8.98987 3.40814C9.87449 4.00021 10.5634 4.84162 10.9693 5.82569C11.0109 5.93795 11.0109 6.06143 10.9693 6.17369C10.5634 7.15776 9.87449 7.99917 8.98987 8.59124C8.10524 9.18331 7.06473 9.49938 6.00025 9.49938C4.93577 9.49938 3.89527 9.18331 3.01064 8.59124C2.12601 7.99917 1.4371 7.15776 1.03125 6.17369Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {transaction.status}
                    </Badge>
                  </td>
                  <td className="h-14 px-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-9 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-[#737373]">Showing 1-10 of 100 products</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="w-9">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="ghost" size="sm">4</Button>
            <Button variant="ghost" size="sm">...</Button>
            <Button variant="ghost" size="sm">10</Button>
            <Button variant="ghost" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
