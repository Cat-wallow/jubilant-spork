'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Upload,
  Search as SearchIcon,
  Filter as FilterIcon,
  Loader2,
} from 'lucide-react';
import RBAC from '@/components/rbac/RBAC';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onInvite: () => void;
  onImport: () => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  onStatusFilterChange: (value: 'all' | 'active' | 'inactive') => void;
  isFetching?: boolean;
}

export function UsersTableToolbar<TData>({
  table,
  onInvite,
  onImport,
  searchQuery,
  onSearchQueryChange,
  statusFilter,
  onStatusFilterChange,
  isFetching,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari nama atau email..."
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          className="h-10 w-full pl-10 lg:w-[250px]"
          disabled={isFetching}
        />
        {isFetching && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={statusFilter}
          onValueChange={
            onStatusFilterChange as (value: string) => void | undefined
          }
          disabled={isFetching}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Nonaktif</SelectItem>
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <RBAC requiredPermission="tenant:user_manage">
          <Button
            variant="third"
            onClick={onImport}
            className="gap-2"
            disabled={isFetching}
          >
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
        </RBAC>

        <RBAC requiredPermission="tenant:user_create">
          <Button onClick={onInvite} className="gap-2" disabled={isFetching}>
            <Plus className="h-4 w-4" />
            Undang User
          </Button>
        </RBAC>
      </div>
    </div>
  );
}
