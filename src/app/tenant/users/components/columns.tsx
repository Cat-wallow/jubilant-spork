'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/users.d'; // Assuming you'll create this type
import { Badge } from '@/components/ui/badge';
import UserActionsMenu from './UserActionsMenu';
import { UserCheck, UserX } from 'lucide-react';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
              {user.name?.charAt(0).toUpperCase() ||
                user.email.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                {user.name || 'No Name'}
              </div>
              {user.isCurrentUser && (
                <Badge
                  variant="outline"
                  className="border-brand-500 bg-brand-500/10 px-2 py-[2px] text-xs font-medium text-brand-600 dark:bg-brand-500/40 dark:text-white"
                >
                  You
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {user.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return <Badge variant="secondary">{row.getValue('role')}</Badge>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status');
      return status === 'active' ? (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40">
          <UserCheck className="mr-1 h-3 w-3" />
          Aktif
        </Badge>
      ) : (
        <Badge variant="destructive">
          <UserX className="mr-1 h-3 w-3" />
          Nonaktif
        </Badge>
      );
    },
  },
  {
    accessorKey: 'joinedAt',
    header: 'Bergabung',
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(row.getValue('joinedAt')).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      // This assumes tenantId and onSuccess are available in the scope where DataTable is rendered
      // We will need to pass them down or use a context.
      // For now, we'll pass them as props to the cell renderer.
      return (
        <div className="text-right">
          <UserActionsMenu user={user} onSuccess={() => {}} tenantId="" />
        </div>
      );
    },
  },
];
