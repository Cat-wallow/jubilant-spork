'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SPTItem {
  id: string;
  type: string;
  period: string;
  status: string;
  statusColor: string;
  autoFill: string;
  autoFillPercentage: string;
  approval: string;
  approvalColor: string;
  approvedBy: string;
  deadline: string;
  taxAmount: string;
  actions: string[];
}

interface SPTTableProps {
  data: SPTItem[];
}

const statusColorMap: Record<string, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-orange-100 text-orange-800',
  info: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
};

const approvalColorMap: Record<string, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-orange-100 text-orange-800',
  info: 'bg-blue-100 text-blue-800',
};

export function SPTTable({ data }: SPTTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="min-w-40">SPT ID</TableHead>
              <TableHead className="min-w-32">Jenis</TableHead>
              <TableHead className="min-w-24">Periode</TableHead>
              <TableHead className="min-w-24">Status</TableHead>
              <TableHead className="min-w-32">Auto-Fill</TableHead>
              <TableHead className="min-w-28">Approval</TableHead>
              <TableHead className="min-w-32">Deadline</TableHead>
              <TableHead className="min-w-32 text-right">Jumlah Pajak</TableHead>
              <TableHead className="min-w-24 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{item.id}</TableCell>
                <TableCell className="text-gray-600">{item.type}</TableCell>
                <TableCell className="text-gray-600">{item.period}</TableCell>
                <TableCell>
                  <Badge className={`${statusColorMap[item.statusColor]}`}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50">
                      {item.autoFill}
                    </Badge>
                    <span className="text-xs text-gray-600">{item.autoFillPercentage}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${approvalColorMap[item.approvalColor]}`}>
                    {item.approval}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{item.deadline}</TableCell>
                <TableCell className="text-right font-semibold text-gray-900">
                  {item.taxAmount}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, data.length)} of{' '}
          {data.length} products
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
          {totalPages > 5 && <span className="text-gray-600">...</span>}
          {totalPages > 5 && (
            <Button
              variant={totalPages === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
