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
import { Plus, Upload, Search, Loader2 } from 'lucide-react';
import RBAC from '@/components/rbac/RBAC';
import { Card } from '@/components/ui/card';

interface DataTableToolbarProps {
  onInvite: () => void;
  onImport: () => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  onStatusFilterChange: (value: 'all' | 'active' | 'inactive') => void;
  isFetching?: boolean;
}

export function UsersTableToolbar({
  onInvite,
  onImport,
  searchQuery,
  onSearchQueryChange,
  statusFilter,
  onStatusFilterChange,
  isFetching,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Card className="relative">
          <Search className="absolute  left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            className="h-10 w-[150px] pl-10 lg:w-[250px]"
            disabled={isFetching}
          />
          {isFetching && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
        </Card>
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
      </div>
      <div className="flex gap-3">
        <RBAC requiredPermission="tenant:user_manage">
          <Button
            variant="secondary"
            onClick={onImport}
            className="gap-2"
            disabled={isFetching}
          >
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
        </RBAC>
        <RBAC requiredPermission="tenant:user_create">
          <Button
            onClick={onInvite}
            className="gap-2"
            disabled={isFetching}
          >
            <Plus className="h-4 w-4" />
            Undang User
          </Button>
        </RBAC>
      </div>
    </div>
  );
}
