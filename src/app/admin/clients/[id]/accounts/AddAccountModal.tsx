'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateCoa } from '@/hooks/useClientCoa';
import { useToast } from '@/hooks/use-toast';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const accountSchema = z.object({
  account_type: z.enum(['Asset', 'Liability', 'Equity', 'Revenue', 'Expense']).default('Asset'),
  account_name: z.string().min(1, 'Nama account wajib diisi'),
  account_number: z.string().min(1, 'Nomor account wajib diisi'),
  parent_account_number: z.string().optional(),
  description: z.string().optional(),
});

export type AccountFormValues = z.infer<typeof accountSchema>;

interface AddAccountModalProps {
  tenantId: string;
  clientId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultValues: AccountFormValues = {
  account_type: 'Asset',
  account_name: '',
  account_number: '',
  parent_account_number: '',
  description: '',
};

export function AddAccountModal({ tenantId, clientId, open, onOpenChange }: AddAccountModalProps) {
  const { toast } = useToast();
  const createCoaMutation = useCreateCoa();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues,
  });

  const onSubmit = async (values: AccountFormValues) => {
    const normal_side: 'Debit' | 'Credit' =
      values.account_type === 'Asset' || values.account_type === 'Expense'
        ? 'Debit'
        : 'Credit';

    try {
      await createCoaMutation.mutateAsync({
        tenantId,
        clientId,
        data: {
          account_type: values.account_type,
          account_number: values.account_number,
          account_name: values.account_name,
          normal_side,
          status: 'Active',
          description: values.description || undefined,
          ...(values.parent_account_number
            ? { parent_code: values.parent_account_number }
            : {}),
        },
      });

      toast({
        title: 'Berhasil',
        description: 'Akun baru berhasil ditambahkan',
      });

      form.reset(defaultValues);
      onOpenChange(false);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Terjadi kesalahan saat menyimpan akun';

      toast({
        title: 'Gagal menyimpan',
        description: message,
        variant: 'destructive',
      });
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      form.reset(defaultValues);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold">Account</DialogTitle>
          <DialogDescription>Tambah akun baru</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="account_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe Account</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asset">Asset</SelectItem>
                        <SelectItem value="Liability">Liability</SelectItem>
                        <SelectItem value="Equity">Equity</SelectItem>
                        <SelectItem value="Revenue">Revenue</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Account</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama akun" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nomor akun" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parent_account_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Account (opsional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nomor akun induk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi catatan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi catatan"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={createCoaMutation.isPending}>
                {createCoaMutation.isPending ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
