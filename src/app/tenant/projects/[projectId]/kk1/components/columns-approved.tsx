'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DocumentTransaction, TransactionStatus } from '@/types/transaction';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/DataTableColumnHeader';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns/format';
import Link from 'next/link';
import { Kk1ActionsMenu } from './Kk1ActionsMenu';

export const columnsApproved: ColumnDef<DocumentTransaction>[] = [
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No. Transaksi" />
    ),
    cell: ({ row }) => {
      const trxNumber = row.original.transaction?.transaction_number;

      if (!trxNumber) return <span>-</span>;

      return (
        <Link href={`/tenant/projects/${row.original.project_id}/kk1/${row.original.id}/add`}>
          <span className="font-medium hover:underline text-blue-600">
            {trxNumber}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: 'transaction_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const dateStr =
        row.original.transaction?.transaction_date ||
        row.original.document_date;

      if (!dateStr) return <span>-</span>;

      try {
        return format(new Date(dateStr), 'yyyy-MM-dd');
      } catch {
        return <span>-</span>;
      }
    },
  },
  {
    accessorKey: 'jenis_dokumen',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-nowrap"
        column={column}
        title="Jenis Dokumen"
      />
    ),
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.jenis_dokumen || '-'}
      </span>
    ),
  },
  {
    accessorKey: 'nomor_dokumen',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nomor Dokumen" />
    ),
    cell: ({ row }) => (
      <span>{row.original.nomor_dokumen || '-'}</span>
    ),
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
    cell: ({ row }) => (
      <span>{row.original.transaction?.currency || 'IDR'}</span>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.original.transaction?.amount;
      if (amount === undefined || amount === null) return <span>-</span>;

      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: row.original.transaction?.currency || 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    },
  },
  {
    accessorKey: 'ppn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PPN" />
    ),
    cell: ({ row }) => {
      const ppn = row.original.transaction?.transaction_taxes?.ppn;
      if (ppn === undefined || ppn === null) return <span>-</span>;

      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: row.original.transaction?.currency || 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(ppn);
    },
  },
  {
    id: 'pph_total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PPH" />
    ),
    cell: ({ row }) => {
      const taxes = row.original.transaction?.transaction_taxes;
      if (!taxes) return <span>-</span>;

      const pphTotal =
        (taxes.pph_21 || 0) +
        (taxes.pph_23 || 0) +
        (taxes.pph_4_2 || 0) +
        (taxes.pph_credit || 0) +
        (taxes.other_pph || 0);

      if (pphTotal === 0) return <span>-</span>;

      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: row.original.transaction?.currency || 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(pphTotal);
    },
  },
  {
    accessorKey: 'bill_type_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipe Tagihan" />
    ),
    cell: ({ row }) => (
      <span>{row.original.transaction?.bill_type_name || '-'}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = (row.original.transaction?.status ||
        TransactionStatus.NOT_STARTED) as TransactionStatus;

      let statusColorClass = '';
      let label = '';

      switch (status) {
        case TransactionStatus.LEADER_APPROVED:
        case TransactionStatus.PMO_APPROVED:
          statusColorClass =
            'bg-[#D1FAE5] text-[#065F46] border-[#6EE7B7]';
          label = 'Approved';
          break;
        default:
          statusColorClass =
            'bg-gray-100 text-gray-800 border-gray-300';
          label = status.replace(/_/g, ' ');
          break;
      }

      return (
        <Badge
          className={cn(
            'border capitalize text-nowrap text-xs',
            statusColorClass
          )}
        >
          {label}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Kk1ActionsMenu data={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];
