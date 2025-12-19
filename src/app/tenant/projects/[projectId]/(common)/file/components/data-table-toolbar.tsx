'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, X } from 'lucide-react';
import { DataTableViewOptions } from '@/components/data-table-view-options';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  fileTypeFilter: string;
  onFileTypeFilterChange: (value: string) => void;
  fileTypeOptions: { label: string; value: string }[];
}

export function DataTableToolbar<TData>({
  table,
  searchQuery,
  onSearchChange,
  fileTypeFilter,
  onFileTypeFilterChange,
  fileTypeOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = searchQuery.length > 0 || fileTypeFilter !== 'all';

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari file..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        {fileTypeOptions.length > 0 && (
          <div className="flex flex-col h-full space-y-1 ">
            <Label htmlFor="file-type-filter" className="sr-only">Filter by File Type</Label>
            <Select
              value={fileTypeFilter}
              onValueChange={onFileTypeFilterChange}
            >
              <SelectTrigger className="h-10 w-[150px] lg:w-[180px]">
                <SelectValue placeholder="Filter Tipe File" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                {fileTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => {
              onSearchChange('');
              onFileTypeFilterChange('all');
            }}
            className="h-10 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
