'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Tenant } from '@/types/tenant';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/DataTableColumnHeader';
import { TenantActionsMenu } from './TenantActionsMenu';

export const columns: ColumnDef<Tenant>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tenant" />,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <span
          className={`inline-flex rounded px-2 py-1 text-xs font-semibold capitalize ${
            status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
          }`}
        >
          {status}
        </span>
      );
    },
  },
  // {
  //   accessorKey: 'plan',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Plan" />,
  //   cell: ({ row }) => {
  //     const plan = row.getValue('plan') as string;
  //     return (
  //       <span className="inline-flex rounded bg-accent/10 px-2 py-1 text-xs font-semibold capitalize text-accent">
  //         {plan}
  //       </span>
  //     );
  //   },
  // },
  {
    accessorKey: 'max_projects',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Active Project" />,
  },
  {
    accessorKey: 'max_users',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Users" />,
  },
  // {
  //   accessorKey: 'storage_quota_gb',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Storage" />,
  //   cell: ({ row }) => `${row.getValue('storage_quota_gb')} GB`,
  // },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Update" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'));
      return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
      });
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <TenantActionsMenu tenant={row.original} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];
