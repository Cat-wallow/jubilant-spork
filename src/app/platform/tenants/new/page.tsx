'use client';

import { useState } from 'react';
import RBAC from '@/components/rbac/RBAC';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import BasicInfoSection from './components/BasicInfoSection';
import PackageSection from './components/PackageSection';
import PICSection from './components/PICSection';
import BillingSection from './components/BillingSection';
import BrandingSection from './components/BrandingSection';
import SystemSettingsSection from './components/SystemSettingsSection';
import SecuritySection from './components/SecuritySection';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { CreateTenantPayload } from '@/types/tenant';
import { createTenant } from '@/services/tenant.service';
import { toast } from 'sonner';

// Define Zod schema for form validation
const formSchema = z.object({
  tenantName: z.string().min(1, 'Nama Tenant wajib diisi'),
  slugUrl: z
    .string()
    .min(1, 'Slug URL wajib diisi')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung',
    ),
  companyName: z.string().optional(),
  tagline: z.string().optional(),
  package: z.string().optional().default('Pro - Rp.2.500.000'), // This will need to be mapped to 'plan'
  storage: z.string().optional().default('10'), // This will need to be mapped to 'storageQuotaGb'
  projects: z.string().optional().default('10'), // This will need to be mapped to 'maxProjects'
  maxUsers: z.string().optional().default('20'), // This will need to be mapped to 'maxUsers'
  picName: z.string().optional(),
  position: z.string().optional(),
  email: z
    .string()
    .email('Format email tidak valid')
    .optional()
    .or(z.literal('')),
  phone: z.string().optional(),
  billingCycle: z.string().optional().default('Bulanan'),
  trialDays: z.string().optional().default('7'),
  autoInactive: z.boolean().optional().default(false),
  logo: z.any().optional(), // File upload, handle separately
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  timezone: z.string().optional().default('Asia/Jakarta (WIB)'),
  language: z.string().optional().default('Indonesia'),
  currency: z.string().optional().default('Rupiah (IDR)'),
  features: z
    .object({
      form10: z.boolean().optional(),
      kk1: z.boolean().optional(),
      kk2: z.boolean().optional(),
      kk3: z.boolean().optional(),
      kk4: z.boolean().optional(),
      kk5: z.boolean().optional(),
      clientManagement: z.boolean().optional(),
      reports: z.boolean().optional(),
      analytics: z.boolean().optional(),
    })
    .optional(),
  require2FA: z.boolean().optional().default(false),
  minPasswordLength: z.string().optional().default('8'),
  sessionTimeout: z.string().optional().default('10'),
});

type NewTenantFormValues = z.infer<typeof formSchema>;

function NewTenantPageContent() {
  const router = useRouter();

  const form = useForm<NewTenantFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantName: '',
      slugUrl: '',
      companyName: '',
      tagline: '',
      package: 'Pro - Rp.2.500.000',
      storage: '10',
      projects: '10',
      maxUsers: '20',
      picName: '',
      position: '',
      email: '',
      phone: '',
      billingCycle: 'Bulanan',
      trialDays: '7',
      autoInactive: false,
      logo: null,
      primaryColor: '#qw123d',
      secondaryColor: '#qw123d',
      timezone: 'Asia/Jakarta (WIB)',
      language: 'Indonesia',
      currency: 'Rupiah (IDR)',
      features: {
        form10: false,
        kk1: false,
        kk2: false,
        kk3: false,
        kk4: false,
        kk5: false,
        clientManagement: false,
        reports: false,
        analytics: false,
      },
      require2FA: false,
      minPasswordLength: '8',
      sessionTimeout: '10',
    },
  });

  const createTenantMutation = useMutation({
    mutationFn: (newTenantData: CreateTenantPayload) =>
      createTenant(newTenantData),
    onSuccess: () => {
      toast.success('Tenant berhasil dibuat', {
        description: 'Tenant baru telah berhasil ditambahkan ke sistem.',
      });
      router.push('/platform/tenants');
    },
    onError: (error: any) => {
      toast.error('Gagal membuat Tenant', {
        description:
          error.response?.data?.message ||
          'Terjadi kesalahan saat membuat tenant.',
      });
    },
  });

  const onSubmit = (values: NewTenantFormValues) => {
    const payload: CreateTenantPayload = {
      name: values.tenantName,
      slug: values.slugUrl,
      plan: values.package?.split(' - ')[0].toLowerCase(), // Extract plan name
      maxUsers: parseInt(values.maxUsers || '0'),
      maxProjects: parseInt(values.projects || '0'),
      storageQuotaGb: parseInt(values.storage || '0'),
      trialDays: parseInt(values.trialDays || '0'),
      // Other fields (PIC, Billing, Branding, System Settings, Security) will be handled separately if needed for the initial tenant creation
      // or in subsequent update calls. For now, only basic info is mapped.
    };
    createTenantMutation.mutate(payload);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-tight">
            Tambah Tenant Baru
          </h1>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="gap-2"
          disabled={createTenantMutation.isPending}
        >
          {createTenantMutation.isPending ? (
            'Menyimpan...'
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Simpan Tenant
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Basic Info + Package */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BasicInfoSection form={form} />
          </div>
          <PackageSection form={form} />
        </div>

        {/* Row 2: PIC + Billing */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PICSection form={form} />
          </div>
          <BillingSection form={form} />
        </div>

        {/* Row 3: Branding */}
        <BrandingSection form={form} />

        {/* Row 4: System Settings */}
        <SystemSettingsSection form={form} />

        {/* Row 5: Security */}
        <SecuritySection form={form} />
      </form>
    </div>
  );
}

export default function NewTenantPage() {
  return (
    <RBAC requiredPermission={["tenant:create", "tenant:manage"]} unauthorizedPage={true}>
      <NewTenantPageContent />
    </RBAC>
  );
}
