'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DocumentTransaction, TransactionStatus } from '@/types/transaction';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/DataTableColumnHeader';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";
import{ format} from 'date-fns/format';
import Link from 'next/link';
import { Kk1ActionsMenu } from './Kk1ActionsMenu';


export const columns: ColumnDef<DocumentTransaction>[] = [
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

      if (!trxNumber) return null;

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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
    cell: ({ row }) => {
      // Use transaction date if available, otherwise document date
      const dateStr = row.original.transaction?.transaction_date || row.original.document_date;
      if (!dateStr) return <span>-</span>;
      try {
          return format(new Date(dateStr), 'yyyy-MM-dd');
      } catch (e) {
          return <span>-</span>;
      }
    },
  },
  {
    accessorKey: 'document_type',
    header: ({ column }) => <DataTableColumnHeader className='text-nowrap' column={column} title="Jenis" />,
    cell: ({ row }) => {
        return <span className="capitalize">{row.original.jenis_dokumen || '-'}</span>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'document_number',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Dokumen" />,
    cell: ({ row }) => {
        return <span>{row.original.nomor_dokumen || '-'}</span>;
    }
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => <DataTableColumnHeader column={column} title="currency" />,
    cell: ({ row }) => {
        return <span>{row.original.transaction?.currency || '-'}</span>;
    }
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Jumlah" />,
    cell: ({ row }) => {
      const amount = row.original.transaction?.amount;
      if (amount === undefined || amount === null) return <span>-</span>;
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: row.original.transaction?.currency || 'IDR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    }
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deskripsi" />,
    cell: ({ row }) => {
        // Prefer transaction description, fallback to document description
        return <span>{row.original.transaction?.description || row.original.description || row.original.original_filename}</span>
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      let status = (row.original.transaction?.status || TransactionStatus.NOT_STARTED) as TransactionStatus;
      let statusColorClass = '';
      let label = '';

      switch (status) {
        case TransactionStatus.LEADER_APPROVED:
        case TransactionStatus.PMO_APPROVED:
          statusColorClass = 'bg-[#D1FAE5] text-[#065F46] border-[#6EE7B7]';
          label = "Approved";
          break;
        case TransactionStatus.SUBMITTED:
          statusColorClass = 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]';
          label = "Reviewed";
          break;
        case TransactionStatus.IN_PROGRESS:
          statusColorClass = 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]';
          label = "In Progress";
          break;
        case TransactionStatus.NOT_STARTED:
        default:
          statusColorClass = 'bg-gray-100 text-gray-800 border-gray-300';
          label = "Pending"; // Or "Draft"
          break;
      }
      return (
        <Badge className={cn("border capitalize text-nowrap text-xs", statusColorClass)}>
          {label}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // Pass the whole object, Kk1ActionsMenu needs to adapt
      return (
        <Kk1ActionsMenu data={row.original}/>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
