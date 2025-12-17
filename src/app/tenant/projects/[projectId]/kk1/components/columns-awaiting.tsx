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

export const columnsAwaiting: ColumnDef<DocumentTransaction>[] = [
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
    accessorKey: 'jenis_dokumen',
    header: ({ column }) => <DataTableColumnHeader className='text-nowrap' column={column} title="Jenis Dokumen" />,
    cell: ({ row }) => {
        return <span className="capitalize">{row.original.jenis_dokumen || '-'}</span>;
    },
  },
  {
    accessorKey: 'nomor_dokumen',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nomor Dokumen" />,
    cell: ({ row }) => {
        // Link to add page even for awaiting
        return (
            <Link href={`/tenant/projects/${row.original.project_id}/kk1/${row.original.id}/add`}>
              <span className="font-medium hover:underline ">
                {row.original.nomor_dokumen || '-'}
              </span>
            </Link>
        );
    }
  },
  {
    accessorKey: 'document_date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
    cell: ({ row }) => {
      const dateStr = row.original.document_date;
      if (!dateStr) return <span>-</span>;
      try {
          return format(new Date(dateStr), 'yyyy-MM-dd');
      } catch (e) {
          return <span>-</span>;
      }
    },
  },
  {
    accessorKey: 'jumlah_lembar',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Jml Lembar" />,
    cell: ({ row }) => <span>{row.original.jumlah_lembar || 0}</span>,
  },
  {
    accessorKey: 'asal_dokumen_source',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Asal Dokumen" />,
    cell: ({ row }) => <span className="capitalize">{row.original.asal_dokumen_source || '-'}</span>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status Transaksi" />,
    cell: ({ row }) => {
      let status = (row.original.transaction?.status || TransactionStatus.NOT_STARTED) as TransactionStatus;
      let statusColorClass = 'bg-gray-100 text-gray-800 border-gray-300';
      let label = "Pending";

      if (status === TransactionStatus.IN_PROGRESS) {
          statusColorClass = 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]';
          label = "In Progress";
      } else if (status === TransactionStatus.SUBMITTED) {
          statusColorClass = 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]';
          label = "Reviewed";
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
      return (
        <Kk1ActionsMenu data={row.original}/>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
