'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useClient, useUpdateClient, useDeleteClient } from '@/hooks/useClients';
import { useClientContacts, useUpsertClientContact } from '@/hooks/useClientContacts';
import { useClientBranches, useUpsertClientBranch, useDeleteClientBranch } from '@/hooks/useClientBranches';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Save, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

// Zod Schema (Simplified version of CreateClientModalUpdated)
const clientFormSchema = z.object({
  name: z.string().min(1, 'Nama perusahaan wajib diisi'),
  brand_name: z.string().optional(),
  type: z.string().min(1, 'Tipe klien wajib diisi'),
  phone: z.string().min(1, 'Nomor telepon wajib diisi'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  website: z.string().url('Website tidak valid').optional().or(z.literal('')),
  address: z.string().min(1, 'Alamat wajib diisi'),
  country: z.string().default('Indonesia'),
  province: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  
  // Corporate Info
  nik: z.string().optional(),
  npwp: z.string().optional(),
  nib: z.string().optional(),
  deed_number: z.string().optional(),
  notary_name: z.string().optional(),
  notary_location: z.string().optional(),
  notary_contact: z.string().optional(),
  establishment_date: z.string().optional(),
  employee_count: z.number().optional(),
  basic_capital: z.number().optional(),
  paid_capital: z.number().optional(),
  
  // Classification
  business_scale: z.string().optional(),
  industry: z.string().optional(),
  industry_sector: z.string().optional(),
  annual_revenue: z.number().optional(),
  service_package: z.string().optional(),
  
  // Tax Identity
  taxpayer_type: z.string().optional(),
  kpp_office: z.string().optional(),
  pkp_status: z.boolean().optional(),
  applicable_taxes: z.array(z.string()).optional(),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

type BranchForm = {
  id?: string;
  shareholder: string;
  position: string;
  country: string;
  province: string;
  city: string;
  phone: string;
  address: string;
  is_hq: boolean;
  pic_name: string;
  pic_position: string;
  pic_email: string;
  pic_phone: string;
};

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const { tenant } = useAuth();
  const { toast } = useToast();
  const id = params.id as string;
  
  const updateClientMutation = useUpdateClient();
  const deleteClientMutation = useDeleteClient();
  const { data: client, isLoading } = useClient(tenant.id, id);
  const { data: contacts } = useClientContacts(tenant.id, id);
  const upsertContactMutation = useUpsertClientContact();
  const { data: branches } = useClientBranches(tenant.id, id);
  const upsertBranchMutation = useUpsertClientBranch();
  const deleteBranchMutation = useDeleteClientBranch();
  
  const [activeTab, setActiveTab] = useState('identity');

  const [picContact, setPicContact] = useState({
    id: '',
    name: '',
    position: '',
    email: '',
    phone: '',
  });

  const [billingContact, setBillingContact] = useState({
    id: '',
    name: '',
    position: '',
    email: '',
    phone: '',
  });

  const [branchesState, setBranchesState] = useState<BranchForm[]>([]);
  const [deletedBranchIds, setDeletedBranchIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      country: 'Indonesia',
      applicable_taxes: [],
      pkp_status: false,
    },
  });

  const watchedTaxes = watch('applicable_taxes') || [];
  console.log('Current watched taxes:', watchedTaxes); // DEBUG LOG

  // Sync existing contacts into local PIC & Billing state
  useEffect(() => {
    if (!contacts || contacts.length === 0) return;

    const primary = contacts.find((c) => c.is_primary);
    const billing = contacts.find((c) => c.is_billing_contact);

    if (primary) {
      setPicContact({
        id: primary.id,
        name: primary.name || '',
        position: primary.position || '',
        email: primary.email || '',
        phone: primary.phone || '',
      });
    }

    if (billing) {
      setBillingContact({
        id: billing.id,
        name: billing.name || '',
        position: billing.position || '',
        email: billing.email || '',
        phone: billing.phone || '',
      });
    }
  }, [contacts]);

  // Sync existing branches into local editable state
  useEffect(() => {
    if (!branches) return;

    setBranchesState(
      branches.map((b) => ({
        id: b.id,
        shareholder: b.shareholder || '',
        position: b.position || '',
        country: b.country || 'Indonesia',
        province: b.province || '',
        city: b.city || '',
        phone: b.phone || '',
        address: b.address || '',
        is_hq: !!b.is_hq,
        pic_name: b.pic_name || '',
        pic_position: b.pic_position || '',
        pic_email: b.pic_email || '',
        pic_phone: b.pic_phone || '',
      })),
    );
  }, [branches]);

  // Populate form when data loads
  useEffect(() => {
    if (client) {
      reset({
        name: client.name || '',
        brand_name: client.brand_name || '',
        type: client.type || 'corporate',
        phone: client.phone || '',
        email: client.email || '',
        website: client.website || '',
        address: client.address || '',
        country: client.country || 'Indonesia',
        province: client.province || '',
        city: client.city || '',
        postal_code: client.postal_code || '',
        nik: client.nik || '',
        npwp: client.npwp || '',
        nib: client.nib || '',
        deed_number: client.deed_number || '',
        notary_name: client.notary_name || '',
        notary_location: client.notary_location || '',
        notary_contact: client.notary_contact || '',
        establishment_date: client.establishment_date ? new Date(client.establishment_date).toISOString().split('T')[0] : '',
        employee_count: client.employee_count || 0,
        basic_capital: client.basic_capital || 0,
        paid_capital: client.paid_capital || 0,
        
        // Classification
        business_scale: client.business_scale || '',
        industry: client.industry || '',
        industry_sector: client.industry_sector || '',
        annual_revenue: client.annual_revenue || 0,
        service_package: client.service_package || '',
        
        // Tax
        taxpayer_type: client.taxpayer_type || '',
        kpp_office: client.kpp_office || '',
        pkp_status: client.pkp_status || false,
        applicable_taxes: client.applicable_taxes || [],
      });
    }
  }, [client, reset]);

  const handleAddBranch = () => {
    setBranchesState((prev) => [
      ...prev,
      {
        shareholder: '',
        position: '',
        country: 'Indonesia',
        province: '',
        city: '',
        phone: '',
        address: '',
        is_hq: false,
        pic_name: '',
        pic_position: '',
        pic_email: '',
        pic_phone: '',
      },
    ]);
  };

  const handleBranchChange = (
    index: number,
    field: keyof BranchForm,
    value: string | boolean,
  ) => {
    setBranchesState((prev) =>
      prev.map((branch, i) =>
        i === index
          ? {
              ...branch,
              [field]: value,
            }
          : branch,
      ),
    );
  };

  const handleRemoveBranch = (index: number) => {
    setBranchesState((prev) => {
      const toRemove = prev[index];
      if (toRemove?.id) {
        setDeletedBranchIds((ids) =>
          ids.includes(toRemove.id as string)
            ? ids
            : [...ids, toRemove.id as string],
        );
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const onSubmit = async (data: any) => {
    console.log('Submitting form data:', data); // DEBUG LOG
    try {
      const result = await updateClientMutation.mutateAsync({
        tenantId: tenant.id,
        id,
        data,
      });
      console.log('Update successful, server response:', result); // DEBUG LOG
      
      // Upsert PIC & Billing contacts + cabang
      const mutationPromises: Promise<any>[] = [];

      if (picContact.name || picContact.email || picContact.phone) {
        mutationPromises.push(
          upsertContactMutation.mutateAsync({
            tenantId: tenant.id,
            clientId: id,
            contactId: picContact.id || undefined,
            data: {
              name: picContact.name,
              position: picContact.position,
              email: picContact.email,
              phone: picContact.phone,
              is_primary: true,
              is_authorized_signer: true,
              is_billing_contact: false,
            },
          }),
        );
      }

      if (billingContact.name || billingContact.email || billingContact.phone) {
        mutationPromises.push(
          upsertContactMutation.mutateAsync({
            tenantId: tenant.id,
            clientId: id,
            contactId: billingContact.id || undefined,
            data: {
              name: billingContact.name,
              position: billingContact.position,
              email: billingContact.email,
              phone: billingContact.phone,
              is_primary: false,
              is_billing_contact: true,
            },
          }),
        );
      }

      // Upsert branches (create/update)
      for (const branch of branchesState) {
        const payload = {
          shareholder: branch.shareholder || null,
          position: branch.position || null,
          country: branch.country || 'Indonesia',
          province: branch.province || null,
          city: branch.city || null,
          phone: branch.phone || null,
          address: branch.address || null,
          is_hq: branch.is_hq ?? false,
          pic_name: branch.pic_name || null,
          pic_position: branch.pic_position || null,
          pic_email: branch.pic_email || null,
          pic_phone: branch.pic_phone || null,
        };

        mutationPromises.push(
          upsertBranchMutation.mutateAsync({
            tenantId: tenant.id,
            clientId: id,
            branchId: branch.id,
            data: payload,
          }),
        );
      }

      // Delete removed branches
      for (const branchId of deletedBranchIds) {
        mutationPromises.push(
          deleteBranchMutation.mutateAsync({
            tenantId: tenant.id,
            clientId: id,
            branchId,
          }),
        );
      }

      if (mutationPromises.length) {
        await Promise.all(mutationPromises);
      }

      toast({
        title: 'Berhasil',
        description: 'Data klien berhasil diperbarui',
      });
      
      router.push(`/admin/clients/${id}`);
    } catch (error) {
      console.error('Failed to update client:', error);
      const anyErr = error as any;
      const errorMessage = anyErr?.response?.data?.message || anyErr?.message || 'Terjadi kesalahan saat menyimpan data';
      console.error('Error details:', anyErr?.response?.data || anyErr?.message); // DEBUG LOG
      
      toast({
        title: 'Gagal menyimpan',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const onValidationError = (validationErrors: FieldErrors<ClientFormData>) => {
    console.log('Validation errors:', validationErrors);
    const errorFields = Object.keys(validationErrors);

    if (!errorFields.length) return;

    toast({
      title: 'Form tidak lengkap',
      description: `Mohon lengkapi field berikut: ${errorFields.join(', ')}`,
      variant: 'destructive',
    });
  };

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus klien ini?')) {
      deleteClientMutation.mutate(
        { tenantId: tenant.id, id },
        {
          onSuccess: () => {
            router.push('/admin/clients');
          },
        }
      );
    }
  };

  if (isLoading) {
    return <div className="p-6 space-y-6">
      <Skeleton className="h-12 w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/admin/clients" className="hover:text-primary">Client</Link>
          <span>/</span>
          <Link href={`/admin/clients/${id}`} className="hover:text-primary">Detail Client</Link>
          <span>/</span>
          <span>Edit Client</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Edit Data Klien</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              type="button"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </Button>
            <Button 
              type="submit"
              form="edit-client-form"
              className="bg-blue-600 hover:bg-blue-700 dark:text-white"
              disabled={isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none space-x-6 mb-6 overflow-x-auto">
          <TabsTrigger
            value="identity"
            className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 data-[state=active]:bg-transparent font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Identitas Perusahaan
          </TabsTrigger>
          <TabsTrigger
            value="classification"
            className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 data-[state=active]:bg-transparent font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Klasifikasi Usaha dan Pajak
          </TabsTrigger>
          <TabsTrigger
            value="contacts"
            className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 data-[state=active]:bg-transparent font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Kontak & Cabang
          </TabsTrigger>
        </TabsList>

        <form id="edit-client-form" onSubmit={handleSubmit(onSubmit, onValidationError)}>
          <TabsContent value="identity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informasi Dasar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Informasi Dasar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama *</Label>
                      <Input 
                        id="name" 
                        {...register('name')} 
                        placeholder="Nama klien/wajib pajak" 
                        className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand_name">Nama Merek</Label>
                      <Input id="brand_name" {...register('brand_name')} placeholder="Merek A" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipe Klien *</Label>
                      <Select onValueChange={(val) => setValue('type', val)} defaultValue={client?.type || 'corporate'}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tipe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corporate">Badan Usaha</SelectItem>
                          <SelectItem value="individual">Perorangan</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telepon *</Label>
                      <Input 
                        id="phone" 
                        {...register('phone')} 
                        placeholder="08123456789" 
                        className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" {...register('website')} placeholder="https://example.com" />
                  </div>
                </CardContent>
              </Card>

              {/* Alamat */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Alamat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Textarea 
                      id="address" 
                      {...register('address')} 
                      placeholder="Jl. Contoh, No 321" 
                      className={`h-24 ${errors.address ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Negara *</Label>
                      <Input id="country" {...register('country')} defaultValue="Indonesia" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Provinsi</Label>
                      <Input id="province" {...register('province')} placeholder="DKI Jakarta" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota</Label>
                      <Input id="city" {...register('city')} placeholder="Jakarta Selatan" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal_code">Kode Pos</Label>
                      <Input id="postal_code" {...register('postal_code')} placeholder="12345" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informasi Korporasi */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Informasi Korporasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nik">NIK</Label>
                      <Input id="nik" {...register('nik')} placeholder="16 Digit NIK" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="npwp">NPWP</Label>
                      <Input id="npwp" {...register('npwp')} placeholder="15/16 Digit NPWP" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nib">NIB</Label>
                      <Input id="nib" {...register('nib')} placeholder="13 Digit NIB" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deed_number">No. Akta Pendirian/Perubahan</Label>
                      <Input id="deed_number" {...register('deed_number')} placeholder="AHU-123..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="notary_name">Nama Notaris</Label>
                      <Input id="notary_name" {...register('notary_name')} placeholder="Nama Notaris" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notary_location">Lokasi Notaris</Label>
                      <Input id="notary_location" {...register('notary_location')} placeholder="Kota Notaris" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="establishment_date">Tanggal Berdiri</Label>
                      <Input type="date" id="establishment_date" {...register('establishment_date')} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employee_count">Jumlah Karyawan</Label>
                      <Input 
                        type="number" 
                        id="employee_count" 
                        {...register('employee_count', { valueAsNumber: true })} 
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="basic_capital">Modal Dasar (Rp)</Label>
                      <Input 
                        type="number" 
                        id="basic_capital" 
                        {...register('basic_capital', { valueAsNumber: true })} 
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paid_capital">Modal Disetor (Rp)</Label>
                      <Input 
                        type="number" 
                        id="paid_capital" 
                        {...register('paid_capital', { valueAsNumber: true })} 
                        placeholder="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="classification" className="space-y-6">
            {/* Informasi Bisnis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Informasi Bisnis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Jenis Usaha *</Label>
                    <Input id="industry" {...register('industry')} placeholder="Konstruksi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business_scale">Skala Bisnis *</Label>
                    <Select onValueChange={(val) => setValue('business_scale', val)} defaultValue={client?.business_scale || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih skala" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mikro">Mikro</SelectItem>
                        <SelectItem value="kecil">Kecil</SelectItem>
                        <SelectItem value="menengah">Menengah</SelectItem>
                        <SelectItem value="besar">Besar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry_sector_detail">Sektor Industri *</Label>
                    <Select onValueChange={(val) => setValue('industry_sector', val)} defaultValue={client?.industry_sector || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih sektor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sipil">Sipil, Warehouse, dll</SelectItem>
                        <SelectItem value="trading">Trading & Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufaktur</SelectItem>
                        <SelectItem value="services">Jasa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annual_revenue">Revenue Tahunan (Rp)</Label>
                    <Input 
                      id="annual_revenue" 
                      {...register('annual_revenue', { valueAsNumber: true })} 
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_package">Paket Layanan</Label>
                  <Select onValueChange={(val) => setValue('service_package', val)} defaultValue={client?.service_package || ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih paket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standar</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Identitas Perpajakan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Identitas Perpajakan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status PKP</Label>
                    <Select 
                      onValueChange={(val) => setValue('pkp_status', val === 'true')} 
                      defaultValue={client?.pkp_status ? 'true' : 'false'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">PKP</SelectItem>
                        <SelectItem value="false">Non PKP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="establishment_date_tax">Tanggal Berdiri</Label>
                    <Input type="date" id="establishment_date_tax" {...register('establishment_date')} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxpayer_type">Tipe Wajib Pajak</Label>
                    <Select onValueChange={(val) => setValue('taxpayer_type', val)} defaultValue={client?.taxpayer_type || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe WP" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="badan">Badan Usaha</SelectItem>
                        <SelectItem value="orang_pribadi">Orang Pribadi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kpp_office">Kantor Pelayanan Pajak (KPP)</Label>
                    <Input id="kpp_office" {...register('kpp_office')} placeholder="KPP Pratama Jakarta" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Jenis Pajak yang Berlaku</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {['PPh 21', 'PPh 22', 'PPh 23', 'PPh 4 ayat 2', 'PPh 15', 'PPN', 'PBB', 'Lainnya'].map((tax) => (
                      <div 
                        key={tax} 
                        className="flex items-center space-x-2"
                        onClick={() => console.log('Div clicked for tax:', tax)} // DEBUG LOG
                      >
                        <Controller
                          name="applicable_taxes"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              id={`tax-${tax}`}
                              checked={field.value?.includes(tax) || false}
                              onCheckedChange={(checked) => {
                                console.log('Controller checkbox change:', { tax, checked, currentValue: field.value }); // DEBUG LOG
                                const current = field.value || [];
                                if (checked) {
                                  const newTaxes = [...current, tax];
                                  console.log('Adding tax, new array:', newTaxes); // DEBUG LOG
                                  field.onChange(newTaxes);
                                } else {
                                  const newTaxes = current.filter((t: string) => t !== tax);
                                  console.log('Removing tax, new array:', newTaxes); // DEBUG LOG
                                  field.onChange(newTaxes);
                                }
                              }}
                            />
                          )}
                        />
                        <label
                          htmlFor={`tax-${tax}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {tax}
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground bg-slate-50 dark:bg-slate-900 p-3 rounded mt-2">
                    Jenis Pajak yang dipilih akan mempengaruhi template COA dan requirement dokumen yang akan dibuat secara otomatis
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Informasi Surat Perpajakan (Mock UI) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Surat Keterangan Terdaftar</CardTitle>
                  <Checkbox />
                </CardHeader>
                <CardContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Input placeholder="Deskripsi" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nomor</Label>
                      <Input placeholder="Deskripsi" />
                    </div>
                    <div className="space-y-2">
                      <Label>Tanggal *</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Surat Pengukuhan Pengusaha Kena Pajak</CardTitle>
                  <Checkbox />
                </CardHeader>
                <CardContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Input placeholder="Deskripsi" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nomor</Label>
                      <Input placeholder="Deskripsi" />
                    </div>
                    <div className="space-y-2">
                      <Label>Tanggal *</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                    Person in Charge (PIC)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama PIC *</Label>
                      <Input
                        placeholder="Nama lengkap PIC"
                        value={picContact.name}
                        onChange={(e) =>
                          setPicContact((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Jabatan</Label>
                      <Input
                        placeholder="Manager, Owner, dll"
                        value={picContact.position}
                        onChange={(e) =>
                          setPicContact((prev) => ({ ...prev, position: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={picContact.email}
                        onChange={(e) =>
                          setPicContact((prev) => ({ ...prev, email: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Telepon *</Label>
                      <Input
                        placeholder="08123456789"
                        value={picContact.phone}
                        onChange={(e) =>
                          setPicContact((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                    Kontak Billing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama Kontak Billing *</Label>
                      <Input
                        placeholder="Nama lengkap kontak billing"
                        value={billingContact.name}
                        onChange={(e) =>
                          setBillingContact((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Jabatan</Label>
                      <Input
                        placeholder="Account Manager, Owner, dll"
                        value={billingContact.position}
                        onChange={(e) =>
                          setBillingContact((prev) => ({ ...prev, position: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={billingContact.email}
                        onChange={(e) =>
                          setBillingContact((prev) => ({ ...prev, email: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Telepon *</Label>
                      <Input
                        placeholder="08123456789"
                        value={billingContact.phone}
                        onChange={(e) =>
                          setBillingContact((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Kantor Cabang
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddBranch}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Cabang
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {branchesState.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed">
                    Belum ada kantor cabang yang terdaftar. Tambahkan cabang baru dengan tombol "Tambah Cabang".
                  </div>
                ) : (
                  <div className="space-y-4">
                    {branchesState.map((branch, index) => (
                      <div
                        key={branch.id || index}
                        className="border rounded-lg p-4 space-y-4 bg-slate-50 dark:bg-slate-900/40"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">Cabang {index + 1}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`branch-${index}-is_hq`}
                                checked={branch.is_hq}
                                onCheckedChange={(checked) =>
                                  handleBranchChange(index, 'is_hq', !!checked)
                                }
                              />
                              <Label
                                htmlFor={`branch-${index}-is_hq`}
                                className="text-xs"
                              >
                                Kantor Pusat
                              </Label>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                              onClick={() => handleRemoveBranch(index)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Hapus
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Pemegang Saham</Label>
                            <Input
                              placeholder="PT Investindo Jaya"
                              value={branch.shareholder}
                              onChange={(e) =>
                                handleBranchChange(index, 'shareholder', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Jabatan/Struktur</Label>
                            <Input
                              placeholder="Branch Manager"
                              value={branch.position}
                              onChange={(e) =>
                                handleBranchChange(index, 'position', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Negara</Label>
                            <Input
                              placeholder="Indonesia"
                              value={branch.country}
                              onChange={(e) =>
                                handleBranchChange(index, 'country', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Provinsi</Label>
                            <Input
                              placeholder="Jawa Barat"
                              value={branch.province}
                              onChange={(e) =>
                                handleBranchChange(index, 'province', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Kota</Label>
                            <Input
                              placeholder="Bandung"
                              value={branch.city}
                              onChange={(e) =>
                                handleBranchChange(index, 'city', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Telepon</Label>
                            <Input
                              placeholder="022-1234567"
                              value={branch.phone}
                              onChange={(e) =>
                                handleBranchChange(index, 'phone', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label>Alamat</Label>
                            <Textarea
                              placeholder="Jl. Sudirman No. 123"
                              value={branch.address}
                              onChange={(e) =>
                                handleBranchChange(index, 'address', e.target.value)
                              }
                              className="h-20"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t mt-2">
                          <div className="space-y-2">
                            <Label>Nama PIC</Label>
                            <Input
                              placeholder="Dedi Kurniawan"
                              value={branch.pic_name}
                              onChange={(e) =>
                                handleBranchChange(index, 'pic_name', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Jabatan PIC</Label>
                            <Input
                              placeholder="Supervisor"
                              value={branch.pic_position}
                              onChange={(e) =>
                                handleBranchChange(index, 'pic_position', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Email PIC</Label>
                            <Input
                              type="email"
                              placeholder="dedi@branch.com"
                              value={branch.pic_email}
                              onChange={(e) =>
                                handleBranchChange(index, 'pic_email', e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Telepon PIC</Label>
                            <Input
                              placeholder="08123456789"
                              value={branch.pic_phone}
                              onChange={(e) =>
                                handleBranchChange(index, 'pic_phone', e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
