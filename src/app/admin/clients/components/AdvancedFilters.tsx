'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search as SearchIcon, Filter as FilterIcon, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AdvancedFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  pkpFilter: string;
  onPkpFilterChange: (value: string) => void;
  onClearFilters: () => void;
  isFetching?: boolean;
}

export function AdvancedFilters({
  searchQuery,
  onSearchQueryChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  pkpFilter,
  onPkpFilterChange,
  onClearFilters,
  isFetching,
}: AdvancedFiltersProps) {
  const hasActiveFilters = statusFilter || typeFilter || pkpFilter || searchQuery;

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4">
      {/* Search Bar */}
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari Nama Klien, NPWP, atau Jenis Usaha"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          className="h-10 w-full pl-10"
          disabled={isFetching}
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={statusFilter || 'all'}
          onValueChange={(value) => onStatusFilterChange(value === 'all' ? '' : value)}
          disabled={isFetching}
        >
          <SelectTrigger className="h-10 w-[140px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Non Aktif</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={typeFilter || 'all'}
          onValueChange={(value) => onTypeFilterChange(value === 'all' ? '' : value)}
          disabled={isFetching}
        >
          <SelectTrigger className="h-10 w-[140px]">
            <SelectValue placeholder="All Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Type</SelectItem>
            <SelectItem value="corporate">Konstruksi</SelectItem>
            <SelectItem value="individual">Trading</SelectItem>
            <SelectItem value="other">Manufaktur</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={pkpFilter || 'all'}
          onValueChange={(value) => onPkpFilterChange(value === 'all' ? '' : value)}
          disabled={isFetching}
        >
          <SelectTrigger className="h-10 w-[140px]">
            <SelectValue placeholder="Status PKP" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status PKP</SelectItem>
            <SelectItem value="pkp">PKP</SelectItem>
            <SelectItem value="non_pkp">NON PKP</SelectItem>
          </SelectContent>
        </Select>

        {/* Action Buttons */}
        <div className="ml-auto flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="h-10 px-3"
              disabled={isFetching}
            >
              Clear
            </Button>
          )}

          <Button variant="outline" className="h-10 px-4" disabled={isFetching}>
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <Button variant="outline" size="sm" className="h-10 w-10 p-0" disabled={isFetching}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
