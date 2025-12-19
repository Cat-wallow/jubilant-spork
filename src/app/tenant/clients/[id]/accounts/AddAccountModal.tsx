'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useCreateCoa, AccountType, NormalBalance } from '@/hooks/useClientCoa';
import api from '@/lib/api';

const formSchema = z.object({
  account_number: z.string().min(1, 'Nomor akun wajib diisi').regex(/^\d+$/, 'Nomor akun harus berupa angka'),
  account_name: z.string().min(1, 'Nama akun wajib diisi'),
  account_type: z.string().min(1, 'Tipe akun wajib dipilih'),
  normal_balance: z.enum(['debit', 'credit'] as const).optional(),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddAccountModalProps {
  tenantId: string;
  clientId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddAccountModal({
  tenantId,
  clientId,
  open,
  onOpenChange,
}: AddAccountModalProps) {
  const { toast } = useToast();
  const createCoaMutation = useCreateCoa();
  const [accountTypeOptions, setAccountTypeOptions] = useState<Array<{ id: string; name: string }>>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account_number: '',
      account_name: '',
      account_type: '',
      normal_balance: 'debit',
      description: '',
    },
  });

  useEffect(() => {
    let cancelled = false;

    const loadAccountTypes = async () => {
      try {
        const resp = await api.get('project/reference-types', {
          params: { type: 'TIPE_AKUN' },
        });

        const data = resp?.data?.data ?? resp?.data ?? [];

        const normalized = Array.isArray(data)
          ? data
              .map((item: any) => ({
                id: String(item?.id ?? item?.name ?? ''),
                name: String(item?.name ?? item?.description ?? item?.id ?? ''),
              }))
              .filter((x: any) => x.id && x.name)
          : [];

        if (!cancelled) setAccountTypeOptions(normalized);
      } catch (error) {
        console.error('Failed to load account types:', error);
        if (!cancelled) setAccountTypeOptions([]);
      }
    };

    if (open) {
      loadAccountTypes();
    }

    return () => {
      cancelled = true;
    };
  }, [open]);

  const onSubmit = async (values: FormValues) => {
    try {
      await createCoaMutation.mutateAsync({
        tenantId,
        clientId,
        data: {
          account_number: values.account_number,
          account_name: values.account_name,
          account_type: values.account_type as AccountType,
          normal_balance: values.normal_balance,
          description: values.description,
          is_active: true,
        },
      });

      toast({
        title: 'Berhasil',
        description: 'Akun berhasil ditambahkan',
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Gagal',
        description: 'Gagal menambahkan akun',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Akun Baru</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="account_number">Nomor Akun</Label>
            <Input
              id="account_number"
              {...form.register('account_number')}
              placeholder="Contoh: 1100"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                form.setValue('account_number', value);
              }}
            />
            {form.formState.errors.account_number && (
              <p className="text-sm text-red-500">{form.formState.errors.account_number.message}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="account_name">Nama Akun</Label>
            <Input
              id="account_name"
              {...form.register('account_name')}
              placeholder="Contoh: Kas Kecil"
            />
            {form.formState.errors.account_name && (
              <p className="text-sm text-red-500">{form.formState.errors.account_name.message}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="account_type">Tipe Akun</Label>
            <Select
              onValueChange={(value) => form.setValue('account_type', value)}
              defaultValue={form.getValues('account_type')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe akun" />
              </SelectTrigger>
              <SelectContent>
                {accountTypeOptions.length > 0 ? (
                  accountTypeOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.name}>
                      {opt.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-muted-foreground text-center">
                    Memuat tipe akun...
                  </div>
                )}
              </SelectContent>
            </Select>
            {form.formState.errors.account_type && (
              <p className="text-sm text-red-500">{form.formState.errors.account_type.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="normal_balance">Saldo Normal</Label>
            <Select
              onValueChange={(value) => form.setValue('normal_balance', value as NormalBalance)}
              defaultValue={form.getValues('normal_balance')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih saldo normal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              {...form.register('description')}
              placeholder="Deskripsi tambahan (opsional)"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={createCoaMutation.isPending}>
              {createCoaMutation.isPending ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
