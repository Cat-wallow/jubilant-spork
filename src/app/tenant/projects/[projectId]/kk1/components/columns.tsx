'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Transaction, TransactionStatus } from '@/types/transaction';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/DataTableColumnHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import{ format} from 'date-fns/format';
import Link from 'next/link';
import { Kk1ActionsMenu } from './Kk1ActionsMenu';

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'transaction_number',
    header: ({ column }) => <DataTableColumnHeader column={column} title="No. Transaksi" />,
    cell: ({ row }) => {
      return (
        <Link href={`/tenant/projects/${row.original.project_id}/kk1/${row.original.id}/add`}>
          <span className="font-medium">{row.getValue('transaction_number')}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deskripsi" />,

  },
  {
    accessorKey: 'document_type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Jenis Dokumen" />,
    cell: ({ row }) => {
        return <span className="capitalize">{row.original.document_type || '-'}</span>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'document_number',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Dokumen" />,
    cell: ({ row }) => {
        return <span>{row.original.document_number || '-'}</span>;
    }
  },
  {
    accessorKey: 'transaction_date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Transaksi" />,
    cell: ({ row }) => {
      const date = row.getValue('transaction_date') as string;
      return format(date, 'dd/mm/yyyy');
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Jumlah" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: row.original.currency || 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      let status = row.getValue('status') as TransactionStatus;
      let statusColorClass = '';
      switch (status) {

        case TransactionStatus.LEADER_APPROVED:
        case TransactionStatus.PMO_APPROVED:
          statusColorClass = 'bg-[#D1FAE5] text-[#065F46] border-[#6EE7B7]';
          status = "Approved"
          break;
        case TransactionStatus.SUBMITTED:
          statusColorClass = 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]';
          status = "Reviewed"
          break;
        case TransactionStatus.IN_PROGRESS:
          statusColorClass = 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]';
          status = "In Progress"
          break;
        default:
          statusColorClass = 'bg-gray-100 text-gray-800 border-gray-300';
          status = "Pending"
          break;
      }
      return (
        <Badge className={cn("border capitalize text-nowrap text-xs", statusColorClass)}>
          {status.replace(/_/g, ' ')}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <Kk1ActionsMenu transaction={row.original}/>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
