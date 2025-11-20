'use client';

import { useState } from 'react';
import { MoreVertical, Edit, UserX, UserCheck } from 'lucide-react';
import { useToggleTenantStatus } from '@/hooks/usePlatformTenants';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tenant } from '@/types/tenant';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface TenantActionsMenuProps {
  tenant: Tenant;
}

export function TenantActionsMenu({ tenant }: TenantActionsMenuProps) {
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const router = useRouter();

  const toggleStatusMutation = useToggleTenantStatus();

  const handleToggleStatus = async () => {
    await toggleStatusMutation.mutateAsync(tenant.id);
    if (isDeactivateModalOpen) {
      setIsDeactivateModalOpen(false);
    }
    toast.success(
      `Tenant ${tenant.name} berhasil di${
        tenant.status === 'active' ? 'nonaktifkan' : 'aktifkan'
      }.`
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => router.push(`/platform/tenants/${tenant.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Tenant
          </DropdownMenuItem>
          {tenant.status === 'active' ? (
            <DropdownMenuItem
              onSelect={() => setIsDeactivateModalOpen(true)}
              className="text-destructive"
            >
              <UserX className="mr-2 h-4 w-4" />
              Nonaktifkan
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onSelect={handleToggleStatus}>
              <UserCheck className="mr-2 h-4 w-4" />
              Aktifkan
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Deactivate Confirmation Dialog */}
      <Dialog
        open={isDeactivateModalOpen}
        onOpenChange={setIsDeactivateModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nonaktifkan Tenant</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menonaktifkan tenant{' '}
              <strong>{tenant.name}</strong>? Tenant dapat diaktifkan kembali
              nanti.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeactivateModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="destructive"
              onClick={handleToggleStatus}
              disabled={toggleStatusMutation.isPending}
            >
              {toggleStatusMutation.isPending
                ? 'Menonaktifkan...'
                : 'Nonaktifkan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
