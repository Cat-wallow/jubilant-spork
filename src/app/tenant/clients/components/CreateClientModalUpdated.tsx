'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  FileText,
  MapPin,
  User,
  Calculator,
  Phone,
  Mail,
  Trash2,
  Plus,
  Settings,
  Eye,
  Hash,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  TrendingUp
} from 'lucide-react';

// Complete form validation schema for all sections
const clientFormSchema = z.object({
  // Basic Information
  basicInfo: z.object({
    code: z.string().min(1, 'Kode client wajib diisi'),
    name: z.string().min(1, 'Nama client wajib diisi'),
    legal_name: z.string().min(1, 'Nama legal wajib diisi'),
    brand_name: z.string().optional(),
    type: z.string().min(1, 'Tipe client wajib diisi'),
    npwp: z.string().min(1, 'NPWP wajib diisi'),
    nik: z.string().optional(),
    nib: z.string().optional(),
    deed_number: z.string().optional(),
    notary_name: z.string().optional(),
    notary_location: z.string().optional(),
    notary_contact: z.string().optional(),
    establishment_date: z.string().optional(),
    employee_count: z.number().min(0).default(0),
    basic_capital: z.number().min(0).default(0),
    paid_capital: z.number().min(0).default(0),
    business_type: z.string().optional(),
    industry_sector: z.string().optional(),
    service_package: z.string().default('basic'),
    business_scale: z.string().optional(),
    annual_revenue: z.number().min(0).default(0),

    // Address
    address: z.string().min(1, 'Alamat wajib diisi'),
    country: z.string().default('Indonesia'),
    city: z.string().min(1, 'Kota wajib diisi'),
    province: z.string().min(1, 'Provinsi wajib diisi'),
    postal_code: z.string().min(1, 'Kode pos wajib diisi'),
    phone: z.string().min(1, 'Telepon wajib diisi'),
    email: z.string().email('Email tidak valid'),
    website: z.string().optional(),
  }),

  // Tax Information
  taxInfo: z.object({
    pkp_status: z.boolean().default(false),
    taxpayer_type: z.string().optional(),
    kpp_office: z.string().optional(),
    applicable_taxes: z.array(z.string()).default([]),
    pic_pkp_email: z.string().email('Email tidak valid').optional().or(z.literal('')),

    // Tax Documents
    has_registered_letter: z.boolean().default(false),
    registered_letter_description: z.string().optional(),
    registered_letter_number: z.string().optional(),
    registered_letter_date: z.string().optional(),
    has_pkp_confirmation: z.boolean().default(false),
    pkp_confirmation_description: z.string().optional(),
    pkp_confirmation_number: z.string().optional(),
    pkp_confirmation_date: z.string().optional(),
  }),

  // Contacts
  contacts: z.array(z.object({
    name: z.string().min(1, 'Nama kontak wajib diisi'),
    position: z.string().min(1, 'Posisi wajib diisi'),
    is_primary: z.boolean().default(false),
    is_billing_contact: z.boolean().default(false),
  })).default([]),

  // Branch Offices
  branches: z.array(z.object({
    shareholder: z.string().optional(),
    position: z.string().optional(),
    country: z.string().default('Indonesia'),
    province: z.string().optional(),
    city: z.string().optional(),
    phone: z.string().optional(),
    pic_email: z.string().email('Email tidak valid').optional().or(z.literal('')),
    pic_phone: z.string().optional(),
    address: z.string().optional(),
    is_hq: z.boolean().default(false),
  })).default([]),

  // Accounting Preferences
  preferences: z.object({
    use_default_coa: z.boolean().default(true),
    coa_template: z.string().optional(),
    use_tenant_voucher_numbering: z.boolean().default(true),
    voucher_format: z.string().optional(),
    reset_frequency: z.string().optional(),
    padding_number: z.number().min(1).max(10).default(3),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
  }).optional(),

  // Custom COA
  customCoa: z.array(z.object({
    account_number: z.string().min(1, 'Nomor akun wajib diisi'),
    account_name: z.string().min(1, 'Nama akun wajib diisi'),
    description: z.string().optional(),
  })).default([]),

  // Legal Documents
  legalDocuments: z.array(z.object({
    document_type: z.string().min(1, 'Tipe dokumen wajib diisi'),
    document_number: z.string().optional(),
    file_url: z.string().optional(),
    file_name: z.string().optional(),
    status: z.string().default('missing'),
    upload_date: z.string().optional(),
    notes: z.string().optional(),
  })).default([]),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

interface CreateClientModalUpdatedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
}

export function CreateClientModalUpdated({
  open,
  onOpenChange,
  onSubmit
}: CreateClientModalUpdatedProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      basicInfo: {
        code: '',
        name: '',
        legal_name: '',
        type: '',
        npwp: '',
        address: '',
        city: '',
        province: '',
        postal_code: '',
        phone: '',
        email: '',
        country: 'Indonesia',
        service_package: 'basic',
        employee_count: 0,
        basic_capital: 0,
        paid_capital: 0,
        annual_revenue: 0,
      },
      taxInfo: {
        pkp_status: false,
        applicable_taxes: [],
        has_registered_letter: false,
        has_pkp_confirmation: false,
      },
      contacts: [],
      branches: [],
      preferences: {
        use_default_coa: true,
        use_tenant_voucher_numbering: true,
        padding_number: 3,
      },
      customCoa: [],
      legalDocuments: [],
    },
  });

  const watchedValues = watch();

  // Steps configuration
  const steps = [
    { id: 0, title: 'Identitas Dasar', icon: Building2 },
    { id: 1, title: 'Informasi Pajak', icon: Calculator },
    { id: 2, title: 'Kontak & Cabang', icon: User },
    { id: 3, title: 'Preferensi Akuntansi', icon: Settings },
    { id: 4, title: 'Dokumen Legal', icon: FileText },
    { id: 5, title: 'Review', icon: ClipboardCheck },
  ];

  // Tax options
  const taxOptions = [
    { id: 'PPh 29', label: 'PPh 29' },
    { id: 'PPN', label: 'PPN' },
    { id: 'PPh 23', label: 'PPh 23' },
    { id: 'PPh 21', label: 'PPh 21' },
    { id: 'PPh 22', label: 'PPh 22' },
    { id: 'PPh 4(2)', label: 'PPh 4(2)' },
    { id: 'PPh 15', label: 'PPh 15' },
    { id: 'PPh 26', label: 'PPh 26' },
  ];

  // Helper functions for dynamic arrays
    // First contact is automatically primary
    const isPrimary = currentContacts.length === 0;
    setValue('contacts', [
      ...currentContacts,
      { name: '', position: '', email: '', phone: '', is_primary: isPrimary, is_billing_contact: false }
    ]);
  };

  const removeContact = (index: number) => {
    const currentContacts = watchedValues.contacts || [];
    setValue('contacts', currentContacts.filter((_, i) => i !== index));
  };

  const addBranch = () => {
    const currentBranches = watchedValues.branches || [];
    setValue('branches', [
      ...currentBranches,
      {
        shareholder: '',
        position: '',
        country: 'Indonesia',
        province: '',
        city: '',
        phone: '',
        pic_name: '',
        pic_position: '',
        pic_email: '',
        pic_phone: '',
        address: '',
        is_hq: false
      }
    ]);
  };

  const removeBranch = (index: number) => {
    const currentBranches = watchedValues.branches || [];
    setValue('branches', currentBranches.filter((_, i) => i !== index));
  };

  const addCustomCoa = () => {
    const currentCoa = watchedValues.customCoa || [];
    setValue('customCoa', [
      ...currentCoa,
      { account_number: '', account_name: '', description: '' }
    ]);
  };

  const removeCustomCoa = (index: number) => {
    const currentCoa = watchedValues.customCoa || [];
    setValue('customCoa', currentCoa.filter((_, i) => i !== index));
  };

  const addLegalDocument = () => {
    const currentDocs = watchedValues.legalDocuments || [];
    setValue('legalDocuments', [
      ...currentDocs,
      { document_type: '', document_number: '', file_url: '', file_name: '', status: 'missing', upload_date: '', notes: '' }
    ]);
  };

  const removeLegalDocument = (index: number) => {
    const currentDocs = watchedValues.legalDocuments || [];
    setValue('legalDocuments', currentDocs.filter((_, i) => i !== index));
  };

  // Handle tax checkbox changes
  const handleTaxChange = (taxId: string, checked: boolean) => {
    const currentTaxes = watchedValues.taxInfo?.applicable_taxes || [];
    if (checked) {
      setValue('taxInfo.applicable_taxes', [...currentTaxes, taxId]);
    } else {
      setValue('taxInfo.applicable_taxes', currentTaxes.filter(t => t !== taxId));
    }
  };

  // Form submission
  const onFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Transform data to match backend structure
      const transformedData = {
        // Basic fields (flatten for backend)
        ...data.basicInfo,

        // Tax fields (flatten for backend)
        ...data.taxInfo,

        // Nested arrays for related tables
        contacts: data.contacts,
        branches: data.branches,
        preferences: data.preferences,
        customCoa: data.customCoa,

        // Tax documents (transform from taxInfo)
        taxDocuments: [
          ...(data.taxInfo.has_registered_letter ? [{
            document_type: 'registered_letter',
            document_number: data.taxInfo.registered_letter_number,
            document_date: data.taxInfo.registered_letter_date,
            description: data.taxInfo.registered_letter_description,
          }] : []),
          ...(data.taxInfo.has_pkp_confirmation ? [{
            document_type: 'pkp_confirmation',
            document_number: data.taxInfo.pkp_confirmation_number,
            document_date: data.taxInfo.pkp_confirmation_date,
            description: data.taxInfo.pkp_confirmation_description,
          }] : []),
        ],

        // Legal documents
        legalDocuments: data.legalDocuments,
      };

      await onSubmit(transformedData);
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basicInfo.code">Kode Client *</Label>
                <Input
                  id="basicInfo.code"
                  {...register('basicInfo.code')}
                  placeholder="C001"
                />
                {errors.basicInfo?.code && (
                  <p className="text-red-500 text-sm">{errors.basicInfo.code.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="basicInfo.name">Nama Client *</Label>
                <Input
                  id="basicInfo.name"
                  {...register('basicInfo.name')}
                  placeholder="PT Contoh Indonesia"
                />
                {errors.basicInfo?.name && (
                  <p className="text-red-500 text-sm">{errors.basicInfo.name.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basicInfo.legal_name">Nama Legal *</Label>
                <Input
                  id="basicInfo.legal_name"
                  {...register('basicInfo.legal_name')}
                  placeholder="PT Contoh Indonesia"
                />
                {errors.basicInfo?.legal_name && (
                  <p className="text-red-500 text-sm">{errors.basicInfo.legal_name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="basicInfo.brand_name">Nama Merek</Label>
                <Input
                  id="basicInfo.brand_name"
                  {...register('basicInfo.brand_name')}
                  placeholder="Contoh Brand"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basicInfo.type">Tipe Client *</Label>
                <Select onValueChange={(value) => setValue('basicInfo.type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="non_profit">Non-Profit</SelectItem>
                  </SelectContent>
                </Select>
                {errors.basicInfo?.type && (
                  <p className="text-red-500 text-sm">{errors.basicInfo.type.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="basicInfo.npwp">NPWP *</Label>
                <Input
                  id="basicInfo.npwp"
                  {...register('basicInfo.npwp')}
                  placeholder="12.345.678.9-123.000"
                />
                {errors.basicInfo?.npwp && (
                  <p className="text-red-500 text-sm">{errors.basicInfo.npwp.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="basicInfo.nik">NIK</Label>
                <Input
                  id="basicInfo.nik"
                  {...register('basicInfo.nik')}
                  placeholder="3171051505900001"
                />
              </div>
              <div>
                <Label htmlFor="basicInfo.nib">NIB</Label>
                <Input
                  id="basicInfo.nib"
                  {...register('basicInfo.nib')}
                  placeholder="9120034567890"
                />
              </div>
              <div>
                <Label htmlFor="basicInfo.deed_number">No. Akta</Label>
                <Input
                  id="basicInfo.deed_number"
                  {...register('basicInfo.deed_number')}
                  placeholder="AHU-0012345.AH.01.2024"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="basicInfo.notary_name">Nama Notaris</Label>
                <Input
                  id="basicInfo.notary_name"
                  {...register('basicInfo.notary_name')}
                  placeholder="Notaris Ahmad Sudrajat, SH"
                />
              </div>
              <div>
                <Label htmlFor="basicInfo.notary_location">Lokasi Notaris</Label>
                <Input
                  id="basicInfo.notary_location"
                  {...register('basicInfo.notary_location')}
                  placeholder="Jakarta Pusat"
                />
              </div>
              <div>
                <Label htmlFor="basicInfo.notary_contact">Kontak Notaris</Label>
                <Input
                  id="basicInfo.notary_contact"
                  {...register('basicInfo.notary_contact')}
                  placeholder="021-1234567"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="basicInfo.establishment_date">Tanggal Berdiri</Label>
                <Input
                  id="basicInfo.establishment_date"
                  type="date"
                  {...register('basicInfo.establishment_date')}
                />
              </div>
              <div>
                <Label htmlFor="basicInfo.employee_count">Jumlah Karyawan</Label>
                <Input
                  id="basicInfo.employee_count"
                  type="number"
                  {...register('basicInfo.employee_count', { valueAsNumber: true })}
                  placeholder="50"
                />
              </div>
              <div>
                <Label htmlFor="basicInfo.basic_capital">Modal Dasar</Label>
                <Input
                  id="basicInfo.basic_capital"
                  type="number"
                  {...register('basicInfo.basic_capital', { valueAsNumber: true })}
                  placeholder="1000000000"
                />
              </div>
              <div>
                <Label htmlFor="basicInfo.paid_capital">Modal Disetor</Label>
                <Input
                  id="basicInfo.paid_capital"
                  type="number"
                  {...register('basicInfo.paid_capital', { valueAsNumber: true })}
                  placeholder="500000000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basicInfo.business_type">Jenis Usaha</Label>
                <Input
                  id="basicInfo.business_type"
                  {...register('basicInfo.business_type')}
                  placeholder="Trading"
                />
              </div>
              <div>
                <Label htmlFor="basicInfo.industry_sector">Sektor Industri</Label>
                <Input
                  id="basicInfo.industry_sector"
                  {...register('basicInfo.industry_sector')}
                  placeholder="Manufacturing"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="basicInfo.service_package">Paket Layanan</Label>
                <Select onValueChange={(value) => setValue('basicInfo.service_package', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih paket layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="basicInfo.business_scale">Skala Bisnis</Label>
                <Select onValueChange={(value) => setValue('basicInfo.business_scale', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih skala bisnis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UMKM">UMKM</SelectItem>
                    <SelectItem value="Menengah">Menengah</SelectItem>
                    <SelectItem value="Besar">Besar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="basicInfo.annual_revenue">Revenue Tahunan</Label>
                <Input
                  id="basicInfo.annual_revenue"
                  type="number"
                  {...register('basicInfo.annual_revenue', { valueAsNumber: true })}
                  placeholder="1200000000"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Alamat</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="basicInfo.address">Alamat *</Label>
                  <Textarea
                    id="basicInfo.address"
                    {...register('basicInfo.address')}
                    placeholder="Jl. Sudirman No. 123"
                  />
                  {errors.basicInfo?.address && (
                    <p className="text-red-500 text-sm">{errors.basicInfo.address.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="basicInfo.country">Negara</Label>
                    <Input
                      id="basicInfo.country"
                      {...register('basicInfo.country')}
                      placeholder="Indonesia"
                    />
                  </div>
                  <div>
                    <Label htmlFor="basicInfo.postal_code">Kode Pos *</Label>
                    <Input
                      id="basicInfo.postal_code"
                      {...register('basicInfo.postal_code')}
                      placeholder="12345"
                    />
                    {errors.basicInfo?.postal_code && (
                      <p className="text-red-500 text-sm">{errors.basicInfo.postal_code.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="basicInfo.city">Kota *</Label>
                  <Input
                    id="basicInfo.city"
                    {...register('basicInfo.city')}
                    placeholder="Jakarta"
                  />
                  {errors.basicInfo?.city && (
                    <p className="text-red-500 text-sm">{errors.basicInfo.city.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="basicInfo.province">Provinsi *</Label>
                  <Input
                    id="basicInfo.province"
                    {...register('basicInfo.province')}
                    placeholder="DKI Jakarta"
                  />
                  {errors.basicInfo?.province && (
                    <p className="text-red-500 text-sm">{errors.basicInfo.province.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="basicInfo.phone">Telepon *</Label>
                <Input
                  id="basicInfo.phone"
                  {...register('basicInfo.phone')}
                  placeholder="021-1234567"
                />
                {errors.basicInfo?.phone && (
                  <p className="text-red-500 text-sm">{errors.basicInfo.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="basicInfo.email">Email *</Label>
                <Input
                  id="basicInfo.email"
                  type="email"
                  {...register('basicInfo.email')}
                  placeholder="info@company.com"
                />
                {errors.basicInfo?.email && (
                  <p className="text-red-500 text-sm">{errors.basicInfo.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="basicInfo.website">Website</Label>
                <Input
                  id="basicInfo.website"
                  {...register('basicInfo.website')}
                  placeholder="https://www.company.com"
                />
              </div>
            </div>
          </div>
        );

      case 1: // Tax Information
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="taxInfo.pkp_status"
                  checked={watchedValues.taxInfo?.pkp_status}
                  onCheckedChange={(checked) => setValue('taxInfo.pkp_status', checked as boolean)}
                />
                <Label htmlFor="taxInfo.pkp_status">Status PKP</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taxInfo.taxpayer_type">Tipe Wajib Pajak</Label>
                  <Select onValueChange={(value) => setValue('taxInfo.taxpayer_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe wajib pajak" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="badan_usaha">Badan Usaha</SelectItem>
                      <SelectItem value="perorangan">Perorangan</SelectItem>
                      <SelectItem value="bendahara">Bendahara</SelectItem>
                      <SelectItem value="instansi_pemerintah">Instansi Pemerintah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="taxInfo.kpp_office">KPP Office</Label>
                  <Input
                    id="taxInfo.kpp_office"
                    {...register('taxInfo.kpp_office')}
                    placeholder="KPP Pratama Jakarta Menteng"
                  />
                </div>
              </div>

              <div>
                <Label>Jenis Pajak</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {taxOptions.map((tax) => (
                    <div key={tax.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tax-${tax.id}`}
                        checked={watchedValues.taxInfo?.applicable_taxes?.includes(tax.id)}
                        onCheckedChange={(checked) => handleTaxChange(tax.id, checked as boolean)}
                      />
                      <Label htmlFor={`tax-${tax.id}`}>{tax.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>PIC/AR Kantor Pajak</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="taxInfo.pic_pkp_name">Nama</Label>
                    <Input
                      id="taxInfo.pic_pkp_name"
                      {...register('taxInfo.pic_pkp_name')}
                      placeholder="Budi Santoso"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxInfo.pic_pkp_contact">Kontak/Whatsapp</Label>
                    <Input
                      id="taxInfo.pic_pkp_contact"
                      {...register('taxInfo.pic_pkp_contact')}
                      placeholder="08123456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxInfo.pic_pkp_email">Email</Label>
                    <Input
                      id="taxInfo.pic_pkp_email"
                      type="email"
                      {...register('taxInfo.pic_pkp_email')}
                      placeholder="budi@company.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Surat Keterangan Terdaftar (SKT)</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="taxInfo.has_registered_letter"
                  checked={watchedValues.taxInfo?.has_registered_letter}
                  onCheckedChange={(checked) => setValue('taxInfo.has_registered_letter', checked as boolean)}
                />
                <Label htmlFor="taxInfo.has_registered_letter">Punya SKT</Label>
              </div>

              {watchedValues.taxInfo?.has_registered_letter && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="taxInfo.registered_letter_number">Nomor Surat</Label>
                    <Input
                      id="taxInfo.registered_letter_number"
                      {...register('taxInfo.registered_letter_number')}
                      placeholder="SKT-001234"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxInfo.registered_letter_date">Tanggal Surat</Label>
                    <Input
                      id="taxInfo.registered_letter_date"
                      type="date"
                      {...register('taxInfo.registered_letter_date')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxInfo.registered_letter_description">Deskripsi</Label>
                    <Input
                      id="taxInfo.registered_letter_description"
                      {...register('taxInfo.registered_letter_description')}
                      placeholder="Surat Keterangan Terdaftar"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label>Surat Pengukuhan PKP</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="taxInfo.has_pkp_confirmation"
                  checked={watchedValues.taxInfo?.has_pkp_confirmation}
                  onCheckedChange={(checked) => setValue('taxInfo.has_pkp_confirmation', checked as boolean)}
                />
                <Label htmlFor="taxInfo.has_pkp_confirmation">Punya Surat PKP</Label>
              </div>

              {watchedValues.taxInfo?.has_pkp_confirmation && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="taxInfo.pkp_confirmation_number">Nomor Surat</Label>
                    <Input
                      id="taxInfo.pkp_confirmation_number"
                      {...register('taxInfo.pkp_confirmation_number')}
                      placeholder="PKP-567890"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxInfo.pkp_confirmation_date">Tanggal Surat</Label>
                    <Input
                      id="taxInfo.pkp_confirmation_date"
                      type="date"
                      {...register('taxInfo.pkp_confirmation_date')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxInfo.pkp_confirmation_description">Deskripsi</Label>
                    <Input
                      id="taxInfo.pkp_confirmation_description"
                      {...register('taxInfo.pkp_confirmation_description')}
                      placeholder="Surat Pengukuhan PKP"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2: // Contacts & Branches
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Kontak Person</Label>
                <Button type="button" variant="outline" size="sm" onClick={addContact}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Kontak
                </Button>
              </div>

              {watchedValues.contacts?.map((contact, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Kontak {index + 1}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeContact(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nama *</Label>
                      <Input
                        {...register(`contacts.${index}.name`)}
                        placeholder="Nama kontak"
                      />
                    </div>
                    <div>
                      <Label>Posisi *</Label>
                      <Input
                        {...register(`contacts.${index}.position`)}
                        placeholder="Posisi/Jabatan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        {...register(`contacts.${index}.email`)}
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <Label>Telepon *</Label>
                      <Input
                        {...register(`contacts.${index}.phone`)}
                        placeholder="08123456789"
                      />
                    </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`contacts.${index}.is_primary`}
                        checked={watchedValues.contacts?.[index]?.is_primary || false}
                        onCheckedChange={(checked) => {
                          // Uncheck all other contacts first
                          if (checked) {
                            watchedValues.contacts?.forEach((_, i) => {
                              if (i !== index) setValue(`contacts.${i}.is_primary`, false);
                            });
                          }
                          setValue(`contacts.${index}.is_primary`, checked as boolean);
                        }}
                      />
                      <Label htmlFor={`contacts.${index}.is_primary`}>Kontak Utama (PIC)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`contacts.${index}.is_billing_contact`}
                        checked={watchedValues.contacts?.[index]?.is_billing_contact || false}
                        onCheckedChange={(checked) => setValue(`contacts.${index}.is_billing_contact`, checked as boolean)}
                      />
                      <Label htmlFor={`contacts.${index}.is_billing_contact`}>Kontak Billing</Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Kantor Cabang</Label>
                <Button type="button" variant="outline" size="sm" onClick={addBranch}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Cabang
                </Button>
              </div>

              {watchedValues.branches?.map((branch, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Cabang {index + 1}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeBranch(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Pemegang Saham</Label>
                      <Input
                        {...register(`branches.${index}.shareholder`)}
                        placeholder="PT Investindo Jaya"
                      />
                    </div>
                    <div>
                      <Label>Jabatan/Struktur</Label>
                      <Input
                        {...register(`branches.${index}.position`)}
                        placeholder="Branch Manager"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Negara</Label>
                      <Input
                        {...register(`branches.${index}.country`)}
                        placeholder="Indonesia"
                      />
                    </div>
                    <div>
                      <Label>Provinsi</Label>
                      <Input
                        {...register(`branches.${index}.province`)}
                        placeholder="Jawa Barat"
                      />
                    </div>
                    <div>
                      <Label>Kota</Label>
                      <Input
                        {...register(`branches.${index}.city`)}
                        placeholder="Bandung"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Alamat</Label>
                    <Textarea
                      {...register(`branches.${index}.address`)}
                      placeholder="Jl. Sudirman No. 123"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Telepon</Label>
                      <Input
                        {...register(`branches.${index}.phone`)}
                        placeholder="022-1234567"
                      />
                    </div>
                        id={`branches.${index}.is_hq`}
                        checked={watchedValues.branches?.[index]?.is_hq || false}
                        onCheckedChange={(checked) => {
                          // Uncheck all other branches first
                          if (checked) {
                            watchedValues.branches?.forEach((_, i) => {
                              if (i !== index) setValue(`branches.${i}.is_hq`, false);
                            });
                          }
                          setValue(`branches.${index}.is_hq`, checked as boolean);
                        }}
                      />
                      <Label htmlFor={`branches.${index}.is_hq`}>Kantor Pusat</Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nama PIC</Label>
                      <Input
                        {...register(`branches.${index}.pic_name`)}
                        placeholder="Dedi Kurniawan"
                      />
                    </div>
                    <div>
                      <Label>Jabatan PIC</Label>
                      <Input
                        {...register(`branches.${index}.pic_position`)}
                        placeholder="Supervisor"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Email PIC</Label>
                      <Input
                        type="email"
                        {...register(`branches.${index}.pic_email`)}
                        placeholder="dedi@branch.com"
                      />
                    </div>
                    <div>
                      <Label>Telepon PIC</Label>
                      <Input
                        {...register(`branches.${index}.pic_phone`)}
                        placeholder="08123456789"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Accounting Preferences
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Preferensi Akuntansi</Label>

              <div className="flex items-center space-x-2">
                <Checkbox
                  {...register('preferences.use_default_coa')}
                />
                <Label htmlFor="preferences.use_default_coa">Gunakan Template Default</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Template COA</Label>
                  <Select onValueChange={(value) => setValue('preferences.coa_template', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih template COA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trading">Trading</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Frekuensi Reset</Label>
                  <Select onValueChange={(value) => setValue('preferences.reset_frequency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih frekuensi reset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Harian</SelectItem>
                      <SelectItem value="weekly">Mingguan</SelectItem>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                      <SelectItem value="yearly">Tahunan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Penomoran Voucher</Label>

              <div className="flex items-center space-x-2">
                <Checkbox
                  {...register('preferences.use_tenant_voucher_numbering')}
                />
                <Label htmlFor="preferences.use_tenant_voucher_numbering">Gunakan Kebijakan Tenant</Label>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Format Voucher</Label>
                  <Input
                    {...register('preferences.voucher_format')}
                    placeholder="VOU"
                  />
                </div>
                <div>
                  <Label>Padding Angka</Label>
                  <Input
                    type="number"
                    {...register('preferences.padding_number', { valueAsNumber: true })}
                    placeholder="3"
                  />
                </div>
                <div>
                  <Label>Prefix</Label>
                  <Input
                    {...register('preferences.prefix')}
                    placeholder="CMP"
                  />
                </div>
              </div>

              <div>
                <Label>Suffix</Label>
                <Input
                  {...register('preferences.suffix')}
                  placeholder="/2024"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>COA Kustom</Label>
                <Button type="button" variant="outline" size="sm" onClick={addCustomCoa}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah COA
                </Button>
              </div>

              {watchedValues.customCoa?.map((coa, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>COA {index + 1}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCustomCoa(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nomor Akun *</Label>
                      <Input
                        {...register(`customCoa.${index}.account_number`)}
                        placeholder="1001"
                      />
                    </div>
                    <div>
                      <Label>Nama Akun *</Label>
                      <Input
                        {...register(`customCoa.${index}.account_name`)}
                        placeholder="Kas Bank BCA"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Deskripsi</Label>
                    <Textarea
                      {...register(`customCoa.${index}.description`)}
                      placeholder="Akun kas kecil"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // Legal Documents
        // Predefined document types
        const documentTypes = [
          { id: 'akta_pendirian', label: 'Akta Pendirian', format: 'PDF, JPG, PNG (Max 10MB)' },
          { id: 'nib', label: 'NIB (Nomor Induk Berusaha)', format: 'PDF, JPG, PNG (Max 10MB)' },
          { id: 'npwp', label: 'NPWP', format: 'PDF, JPG, PNG (Max 10MB)' },
          { id: 'surat_pkp', label: 'Surat Pengukuhan PKP', format: 'PDF, JPG, PNG (Max 10MB)' },
          { id: 'siup', label: 'SIUP', format: 'PDF, JPG, PNG (Max 10MB)' },
          { id: 'izin_usaha', label: 'Izin Usaha', format: 'PDF, JPG, PNG (Max 10MB)' },
          { id: 'dokumen_lainnya', label: 'Dokumen Lainnya', format: 'PDF, JPG, PNG (Max 10MB)' },
        ];

        // Get current documents state
        const currentDocs = watchedValues.legalDocuments || [];

        // Helper to find document by type
        const getDocByType = (docType: string) => {
          return currentDocs.find(d => d.document_type === docType);
        };

        // Helper to handle file upload for a specific document type
        const handleDocUpload = (docType: string, file: File) => {
          const existingIndex = currentDocs.findIndex(d => d.document_type === docType);
          const fileSize = file.size < 1024 * 1024 
            ? `${(file.size / 1024).toFixed(2)} KB` 
            : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
          
          const newDoc = {
            document_type: docType,
            document_number: '',
            file_url: URL.createObjectURL(file),
            file_name: file.name,
            status: 'uploaded',
            upload_date: new Date().toISOString(),
            notes: fileSize,
          };

          if (existingIndex >= 0) {
            const updatedDocs = [...currentDocs];
            updatedDocs[existingIndex] = newDoc;
            setValue('legalDocuments', updatedDocs);
          } else {
            setValue('legalDocuments', [...currentDocs, newDoc]);
          }
        };

        // Helper to mark document as not available
        const markAsNotAvailable = (docType: string) => {
          const existingIndex = currentDocs.findIndex(d => d.document_type === docType);
          
          const newDoc = {
            document_type: docType,
            document_number: '',
            file_url: '',
            file_name: '',
            status: 'not_available',
            upload_date: '',
            notes: 'Tidak tersedia (Belum memiliki dokumen tersebut)',
          };

          if (existingIndex >= 0) {
            const updatedDocs = [...currentDocs];
            updatedDocs[existingIndex] = newDoc;
            setValue('legalDocuments', updatedDocs);
          } else {
            setValue('legalDocuments', [...currentDocs, newDoc]);
          }
        };

        return (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Upload Dokumen Legal</h3>
            </div>

            <div className="space-y-3">
              {documentTypes.map((docType) => {
                const doc = getDocByType(docType.id);
                const isUploaded = doc?.status === 'uploaded';
                const isNotAvailable = doc?.status === 'not_available';

                return (
                  <div key={docType.id} className="border rounded-lg overflow-hidden">
                    {/* Document Header */}
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900">
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">{docType.label}</p>
                        <p className="text-xs text-muted-foreground">Format: {docType.format}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isUploaded && (
                          <Button type="button" variant="ghost" size="sm" className="text-muted-foreground">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        )}
                        {isUploaded && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              setValue('legalDocuments', currentDocs.filter(d => d.document_type !== docType.id));
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        {!isUploaded && !isNotAvailable && (
                          <>
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleDocUpload(docType.id, file);
                                }}
                              />
                              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">
                                <Upload className="h-4 w-4" />
                                Upload
                              </span>
                            </label>
                            <Button 
                              type="button" 
                              variant="secondary" 
                              size="sm"
                              className="bg-slate-700 text-white hover:bg-slate-800"
                              onClick={() => markAsNotAvailable(docType.id)}
                            >
                              Tidak tersedia
                            </Button>
                          </>
                        )}
                        {isNotAvailable && (
                          <>
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleDocUpload(docType.id, file);
                                }}
                              />
                              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">
                                <Upload className="h-4 w-4" />
                                Upload
                              </span>
                            </label>
                            <Button 
                              type="button" 
                              variant="secondary" 
                              size="sm"
                              className="bg-slate-700 text-white hover:bg-slate-800"
                              disabled
                            >
                              Tidak tersedia
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Document Content - Show if uploaded or not available */}
                    {(isUploaded || isNotAvailable) && (
                      <div className="px-4 pb-4">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                          {isUploaded ? (
                            <>
                              <p className="font-medium text-blue-900 dark:text-blue-100">
                                {doc?.file_name || `${docType.label} ${watchedValues.basicInfo?.name || ''}`}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Masa berlaku sampai: -
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {doc?.notes} • Diupload {doc?.upload_date ? new Date(doc.upload_date).toLocaleDateString('id-ID') : '-'}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Tidak Tersedia (Belum memiliki dokumen tersebut)
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm text-blue-700 dark:text-blue-300">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                Dokumen yang diupload akan disimpan dengan enkripsi dan hanya dapat diakses oleh tim yang berwenang. 
                Pastikan dokumen yang diupload sudah benar dan masih berlaku.
              </p>
            </div>
          </div>
        );

      case 5: // Review
        const basicInfo = watchedValues.basicInfo;
        const taxInfo = watchedValues.taxInfo;
        const contacts = watchedValues.contacts || [];
        const legalDocs = watchedValues.legalDocuments || [];
        const preferences = watchedValues.preferences;
        
        // Calculate completeness
        const uploadedDocs = legalDocs.filter(d => d.status === 'uploaded' || d.status === 'verified').length;
        const totalDocs = legalDocs.length;
        const completenessPercent = totalDocs > 0 ? Math.round((uploadedDocs / totalDocs) * 100) : 100;
        
        // Get primary contact
        const primaryContact = contacts.find(c => c.is_primary);
        const billingContact = contacts.find(c => c.is_billing_contact);
        
        // Get applicable taxes for display
        const activeTaxes = taxInfo?.applicable_taxes || [];
        
        // Get PKP effective date
        const pkpDate = taxInfo?.pkp_confirmation_date 
          ? new Date(taxInfo.pkp_confirmation_date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
          : '-';

        return (
          <div className="space-y-6">
            {/* Header Title */}
            <div className="text-center pb-2">
              <p className="text-sm text-muted-foreground">Ringkasan dan Validasi</p>
            </div>

            {/* Summary Cards - Top Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Tipe Klien Card */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tipe Klien</p>
                    <p className="font-semibold text-blue-900 dark:text-blue-100 capitalize">
                      {basicInfo?.type || '-'}
                    </p>
                    <p className="text-xs text-muted-foreground">{basicInfo?.industry_sector || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Status PKP Card */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Calculator className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status PKP</p>
                    <p className="font-semibold text-blue-900 dark:text-blue-100">
                      {taxInfo?.pkp_status ? 'PKP' : 'Non-PKP'}
                    </p>
                    <p className="text-xs text-muted-foreground">Efektif: {pkpDate}</p>
                  </div>
                </div>
              </div>

              {/* Kelengkapan Card */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Kelengkapan</p>
                    <p className="font-semibold text-blue-900 dark:text-blue-100">{completenessPercent}%</p>
                    <p className="text-xs text-muted-foreground">
                      {uploadedDocs} dokumen wajib dan {totalDocs - uploadedDocs} dokumen tambahan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Cards - Two Column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Identitas Card */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Identitas</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nama:</span>
                    <span className="font-medium text-right">{basicInfo?.name || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-right">{basicInfo?.email || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telepon:</span>
                    <span className="font-medium text-right">{basicInfo?.phone || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alamat:</span>
                    <span className="font-medium text-right truncate max-w-[200px]">{basicInfo?.address || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Identitas Perpajakan Card */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Identitas Perpajakan</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NIK:</span>
                    <span className="font-medium">{basicInfo?.nik || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NPWP:</span>
                    <span className="font-medium">{basicInfo?.npwp || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">KPP:</span>
                    <span className="font-medium">{taxInfo?.kpp_office || '-'}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">Jenis Pajak:</span>
                    <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                      {activeTaxes.length > 0 ? activeTaxes.map((tax) => (
                        <Badge key={tax} variant="outline" className="text-xs">
                          {tax}
                        </Badge>
                      )) : <span className="text-muted-foreground">-</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Kontak Card */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Kontak</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Person in Charge (PIC)</p>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">PIC:</span>
                        <span className="font-medium">{primaryContact?.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{primaryContact?.email || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Telepon:</span>
                        <span className="font-medium">{primaryContact?.phone || '-'}</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Kontak Billing:</p>
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">PIC:</span>
                        <span className="font-medium">{billingContact?.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{billingContact?.email || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Telepon:</span>
                        <span className="font-medium">{billingContact?.phone || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Akuntansi Card */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Akuntansi</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Template COA:</span>
                    <span className="font-medium capitalize">{preferences?.coa_template || 'Default Template'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tarif PPN Default:</span>
                    <span className="font-medium">11%</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">Pemetaan Pajak:</span>
                    <span className="font-medium text-green-600">{activeTaxes.length} Pemetaan pajak aktif</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {activeTaxes.slice(0, 5).map((tax) => (
                      <Badge key={tax} variant="outline" className="text-xs">
                        {tax}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kebijakan Penomoran:</span>
                    <span className="font-medium">
                      {preferences?.use_tenant_voucher_numbering ? 'Inherit dari Tenant' : 'Custom'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dokumen Legal Section */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Dokumen Legal</h4>
              <div className="space-y-2">
                {legalDocs.length > 0 ? legalDocs.map((doc, index) => {
                  const docTypeLabels: Record<string, string> = {
                    akta_pendirian: 'Akta Pendirian',
                    akta_perubahan: 'Akta Perubahan',
                    siup: 'SIUP',
                    tdp: 'TDP',
                    npwp: 'NPWP',
                    ktp_direktur: 'KTP Direktur',
                  };
                  const isUploaded = doc.status === 'uploaded' || doc.status === 'verified';
                  
                  return (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">
                          {docTypeLabels[doc.document_type] || doc.document_type || `Dokumen ${index + 1}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.file_name ? `${doc.file_name}` : 'Belum diupload'}
                          {doc.upload_date && ` • Diupload ${new Date(doc.upload_date).toLocaleDateString('id-ID')}`}
                        </p>
                      </div>
                      <Badge 
                        variant={isUploaded ? 'default' : 'secondary'}
                        className={isUploaded ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
                      >
                        {isUploaded && <CheckCircle className="h-3 w-3 mr-1" />}
                        {isUploaded ? 'Uploaded' : doc.status || 'Missing'}
                      </Badge>
                    </div>
                  );
                }) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Belum ada dokumen yang ditambahkan
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Tambah Client Baru
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer hover:opacity-80 ${
                      index <= currentStep
                        ? 'bg-blue-600 text-white shadow-md scale-110'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    title={step.title}
                  >
                    <step.icon className="h-4 w-4" />
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-1 transition-colors duration-200 ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <Badge variant="outline">
              {currentStep + 1} / {steps.length}
            </Badge>
          </div>

          {/* Step Title */}
          <div className="text-center">
            <h3 className="text-lg font-semibold">{steps[currentStep].title}</h3>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Sebelumnya
            </Button>

            <div className="space-x-2">
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Selanjutnya
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
