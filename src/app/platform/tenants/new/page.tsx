'use client';

import { useState } from 'react';
import RBAC from 'components/rbac/RBAC';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BasicInfoSection from './components/BasicInfoSection';
import PackageSection from './components/PackageSection';
import PICSection from './components/PICSection';
import BillingSection from './components/BillingSection';
import BrandingSection from './components/BrandingSection';
import SystemSettingsSection from './components/SystemSettingsSection';
import SecuritySection from './components/SecuritySection';

function NewTenantPageContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Basic Info
    tenantName: '',
    slugUrl: '',
    companyName: '',
    tagline: '',

    // Package
    package: 'Pro - Rp.2.500.000',
    storage: '10',
    projects: '10',
    maxUsers: '20',

    // PIC
    picName: '',
    position: '',
    email: '',
    phone: '',

    // Billing
    billingCycle: 'Bulanan',
    trialDays: '7',
    autoInactive: false,

    // Branding
    logo: null,
    primaryColor: '#qw123d',
    secondaryColor: '#qw123d',

    // System Settings
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

    // Security
    require2FA: false,
    minPasswordLength: '8',
    sessionTimeout: '10',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="mt-3 h-full w-full">
      {/* Header */}
      <div className="mb-[30px] flex items-start justify-between">
        <div className="flex flex-1 flex-col gap-[5px]">
          <p className="font-dm text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
            Tenant &gt; Add Tenant
          </p>
          <h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-navy-700 dark:text-white">
            Tambah Tenant Baru
          </h1>
        </div>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-1 rounded-[10px] bg-blue-500 px-3 py-2.5 hover:bg-blue-600"
        >
          <Plus className="h-6 w-6 text-white" />
          <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-white">
            Simpan Tenant
          </span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
        {/* Row 1: Basic Info + Package */}
        <div className="flex gap-[30px]">
          <BasicInfoSection
            formData={formData}
            updateFormData={updateFormData}
          />
          <PackageSection formData={formData} updateFormData={updateFormData} />
        </div>

        {/* Row 2: PIC + Billing */}
        <div className="flex gap-[30px]">
          <PICSection formData={formData} updateFormData={updateFormData} />
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
