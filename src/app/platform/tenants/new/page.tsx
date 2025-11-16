'use client';

import { useState } from 'react';
import RBAC from 'components/rbac/RBAC';
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

function NewTenantPageContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-muted-foreground text-sm">
            Tenant &gt; Add Tenant
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Tambah Tenant Baru
          </h1>
        </div>
        <Button onClick={handleSubmit} className="gap-2">
          <Plus className="h-4 w-4" />
          Simpan Tenant
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Basic Info + Package */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BasicInfoSection
              formData={formData}
              updateFormData={updateFormData}
            />
          </div>
          <PackageSection formData={formData} updateFormData={updateFormData} />
        </div>

        {/* Row 2: PIC + Billing */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PICSection formData={formData} updateFormData={updateFormData} />
          </div>
          <BillingSection formData={formData} updateFormData={updateFormData} />
        </div>

        {/* Row 3: Branding */}
        <BrandingSection formData={formData} updateFormData={updateFormData} />

        {/* Row 4: System Settings */}
        <SystemSettingsSection
          formData={formData}
          updateFormData={updateFormData}
        />

        {/* Row 5: Security */}
        <SecuritySection formData={formData} updateFormData={updateFormData} />
      </form>
    </div>
  );
}

export default function NewTenantPage() {
  return (
    <RBAC requiredPermission="platform:user_manage" unauthorizedPage={true}>
      <NewTenantPageContent />
    </RBAC>
  );
}
