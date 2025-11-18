'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useInviteUser } from '@/hooks/useTenantUsers';
import { useRoles } from '@/hooks/useRoles';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Input } from '@/components/ui/input';

interface InviteUserModalProps {
  tenantId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  roleId: z.string().min(1, { message: 'Role is required.' }),
});

export default function InviteUserModal({
  tenantId,
  isOpen,
  onClose,
  onSuccess,
}: InviteUserModalProps) {
  const inviteMutation = useInviteUser(tenantId);
  const { data: roles = [], isLoading: rolesLoading } = useRoles();
  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: '', roleId: '' },
  });

  const onSubmit = async (values: z.infer<typeof inviteSchema>) => {
    try {
      await inviteMutation.mutateAsync({
        email: values.email,
        role_id: values.roleId,
      });
      onSuccess();
      form.reset();
    } catch (error) {
      console.error('Failed to invite user:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Undang User Baru</DialogTitle>
          <DialogDescription>
            Masukkan email dan role untuk mengirim undangan.
          </DialogDescription>
        </DialogHeader>
        {inviteMutation.error && (
          <p className="text-sm text-destructive">
            {(inviteMutation.error as any)?.response?.data?.message ||
              'Invalid request data'}
          </p>
        )}
        {rolesLoading && (
          <p className="text-sm text-muted-foreground">Loading roles...</p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role*</FormLabel>
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
                      {roles.map((role) => (
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
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={inviteMutation.isPending || rolesLoading}>
                {inviteMutation.isPending ? 'Mengirim...' : 'Kirim Undangan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
