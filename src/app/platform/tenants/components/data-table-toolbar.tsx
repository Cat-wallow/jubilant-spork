'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search as SearchIcon, Filter as FilterIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  planFilter: string;
  setPlanFilter: (plan: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  planFilter,
  setPlanFilter,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="text"
          placeholder="Cari Nama Tenant"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9" // tambahkan padding-left agar text tidak menimpa icon
        />
      </div>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>

      <Select value={planFilter} onValueChange={setPlanFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plan</SelectItem>
          <SelectItem value="basic">Basic</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <FilterIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id === 'max_projects'
                    ? 'Active Projects'
                    : column.id === 'max_users'
                      ? 'Users'
                      : column.id === 'storage_quota_gb'
                        ? 'Storage'
                        : column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={() => router.push('/platform/tenants/new')} className="gap-2">
        <Plus className="h-4 w-4" />
        Tambah Tenant
      </Button>
    </div>
  );
}
