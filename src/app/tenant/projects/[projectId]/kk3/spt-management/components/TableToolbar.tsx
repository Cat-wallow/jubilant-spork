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
import { Search, Plus, Settings2 } from 'lucide-react';

interface TableToolbarProps {
  onSearch?: (value: string) => void;
  onStatusFilter?: (value: string) => void;
  onTypeFilter?: (value: string) => void;
}

export function TableToolbar({
  onSearch,
  onStatusFilter,
  onTypeFilter,
}: TableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Cari dokumen"
            className="pl-10"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Select onValueChange={(value) => onStatusFilter?.(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onTypeFilter?.(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Type</SelectItem>
            <SelectItem value="ppn">PPN</SelectItem>
            <SelectItem value="pph21">PPH 21</SelectItem>
            <SelectItem value="pph23">PPH 23</SelectItem>
            <SelectItem value="pph25">PPH 25</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
