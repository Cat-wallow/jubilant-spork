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
  ChevronUp
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
    pic_pkp_name: z.string().optional(),
    pic_pkp_contact: z.string().optional(),
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
    has_other_letter: z.boolean().default(false),
  }),
  
  // Contacts
  contacts: z.array(z.object({
    name: z.string().min(1, 'Nama kontak wajib diisi'),
    position: z.string().min(1, 'Posisi wajib diisi'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().min(1, 'Telepon wajib diisi'),
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
    pic_name: z.string().optional(),
    pic_position: z.string().optional(),
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
        has_other_letter: false,
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
  const addContact = () => {
    const currentContacts = watchedValues.contacts || [];
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
                    <div className="flex items-center space-x-2">
                      <Checkbox
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
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Dokumen Legal</Label>
                <Button type="button" variant="outline" size="sm" onClick={addLegalDocument}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Dokumen
                </Button>
              </div>

              {watchedValues.legalDocuments?.map((doc, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Dokumen {index + 1}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLegalDocument(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tipe Dokumen *</Label>
                      <Select onValueChange={(value) => setValue(`legalDocuments.${index}.document_type`, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tipe dokumen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="akta_pendirian">Akta Pendirian</SelectItem>
                          <SelectItem value="akta_perubahan">Akta Perubahan</SelectItem>
                          <SelectItem value="siup">SIUP</SelectItem>
                          <SelectItem value="tdp">TDP</SelectItem>
                          <SelectItem value="npwp">NPWP</SelectItem>
                          <SelectItem value="ktp_direktur">KTP Direktur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Nomor Dokumen</Label>
                      <Input
                        {...register(`legalDocuments.${index}.document_number`)}
                        placeholder="Nomor dokumen"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>File URL</Label>
                      <Input
                        {...register(`legalDocuments.${index}.file_url`)}
                        placeholder="URL file"
                      />
                    </div>
                    <div>
                      <Label>Nama File</Label>
                      <Input
                        {...register(`legalDocuments.${index}.file_name`)}
                        placeholder="nama_file.pdf"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Status</Label>
                      <Select onValueChange={(value) => setValue(`legalDocuments.${index}.status`, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="missing">Missing</SelectItem>
                          <SelectItem value="uploaded">Uploaded</SelectItem>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Tanggal Upload</Label>
                      <Input
                        type="datetime-local"
                        {...register(`legalDocuments.${index}.upload_date`)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Catatan</Label>
                    <Textarea
                      {...register(`legalDocuments.${index}.notes`)}
                      placeholder="Catatan tambahan"
                    />
                  </div>
                </div>
              ))}
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
              Previous
            </Button>

            <div className="space-x-2">
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Client'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
