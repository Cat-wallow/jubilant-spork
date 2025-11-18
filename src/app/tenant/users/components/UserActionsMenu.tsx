'use client';

import { useState } from 'react';
import { MoreVertical, Edit, UserX, UserCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  useUpdateUserRole,
  useDeactivateUser,
  useReactivateUser,
} from '@/hooks/useTenantUsers';
import { useAuth } from '@/contexts/AuthContext';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User } from '@/types/users';

interface UserActionsMenuProps {
  tenantId: string;
  user: User;
  onSuccess: () => void;
}

const ROLES = [
  { id: 'admin_tenant', name: 'Admin Tenant' },
  { id: 'wajib_pajak', name: 'Wajib Pajak / WP' },
  { id: 'anggota_tim', name: 'Anggota Tim' },
  { id: 'ketua_tim', name: 'Ketua Tim' },
  { id: 'pmo', name: 'PMO (Project Manager)' },
  { id: 'direktur', name: 'Direktur' },
];

const roleSchema = z.object({
  roleId: z.string().min(1, { message: 'Role is required.' }),
});

const deactivateSchema = z.object({
  reason: z.string().optional(),
});

export default function UserActionsMenu({
  tenantId,
  user,
  onSuccess,
}: UserActionsMenuProps) {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const { permissions } = useAuth();
  const reactivateMutation = useReactivateUser(tenantId);
  const canManage = permissions.includes('tenant:user_manage');

  const handleReactivate = async () => {
    try {
      await reactivateMutation.mutateAsync(user.id);
      onSuccess();
    } catch (error) {
      console.error('Failed to reactivate user:', error);
    }
  };

  if (!canManage) {
    return null;
  }

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
          <DropdownMenuItem onSelect={() => setIsRoleModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Ubah Role
          </DropdownMenuItem>
          {user.status === 'active' ? (
            <DropdownMenuItem
              onSelect={() => setIsDeactivateModalOpen(true)}
              className="text-destructive"
            >
              <UserX className="mr-2 h-4 w-4" />
              Nonaktifkan
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onSelect={handleReactivate}>
              <UserCheck className="mr-2 h-4 w-4" />
              Aktifkan
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangeRoleModal
        isOpen={isRoleModalOpen}
        setIsOpen={setIsRoleModalOpen}
        tenantId={tenantId}
        user={user}
        onSuccess={onSuccess}
      />
      <DeactivateModal
        isOpen={isDeactivateModalOpen}
        setIsOpen={setIsDeactivateModalOpen}
        tenantId={tenantId}
        user={user}
        onSuccess={onSuccess}
      />
    </>
  );
}

// Sub-components for modals

function ChangeRoleModal({
  isOpen,
  setIsOpen,
  tenantId,
  user,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  tenantId: string;
  user: User;
  onSuccess: () => void;
}) {
  const updateRoleMutation = useUpdateUserRole(tenantId);
  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: { roleId: '' },
  });

  const onSubmit = async (values: z.infer<typeof roleSchema>) => {
    try {
      await updateRoleMutation.mutateAsync({
        userId: user.id,
        roleId: values.roleId,
      });
      onSuccess();
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Role User</DialogTitle>
          <DialogDescription>
            Mengubah role untuk: <strong>{user.name || user.email}</strong>
          </DialogDescription>
        </DialogHeader>
        {updateRoleMutation.error && (
          <p className="text-sm text-destructive">
            Gagal mengubah role. Silakan coba lagi.
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Baru*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={updateRoleMutation.isPending}>
                {updateRoleMutation.isPending ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function DeactivateModal({
  isOpen,
  setIsOpen,
  tenantId,
  user,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  tenantId: string;
  user: User;
  onSuccess: () => void;
}) {
  const deactivateMutation = useDeactivateUser(tenantId);
  const form = useForm<z.infer<typeof deactivateSchema>>({
    resolver: zodResolver(deactivateSchema),
    defaultValues: { reason: '' },
  });

  const onSubmit = async (values: z.infer<typeof deactivateSchema>) => {
    try {
      await deactivateMutation.mutateAsync({
        userId: user.id,
        reason: values.reason,
      });
      onSuccess();
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error('Failed to deactivate user:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nonaktifkan User</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menonaktifkan:{' '}
            <strong>{user.name || user.email}</strong>?
          </DialogDescription>
        </DialogHeader>
        {deactivateMutation.error && (
          <p className="text-sm text-destructive">
            Gagal menonaktifkan user. Silakan coba lagi.
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan (opsional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan alasan menonaktifkan user..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={deactivateMutation.isPending}
              >
                {deactivateMutation.isPending
                  ? 'Menonaktifkan...'
                  : 'Nonaktifkan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
