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
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  FileText, 
  MapPin, 
  User,
  Calculator
} from 'lucide-react';

// Form validation schemas
const basicInfoSchema = z.object({
  name: z.string().min(1, 'Nama klien wajib diisi'),
  brand_name: z.string().optional(),
  type: z.enum(['corporate', 'individual']).refine((val) => val !== undefined, {
    message: 'Tipe klien wajib dipilih',
  }),
  phone: z.string().optional(),
  website: z.string().url('Format website tidak valid').optional().or(z.literal('')),
});

const addressSchema = z.object({
  address: z.string().optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
});

const corporateSchema = z.object({
  nik: z.string().optional(),
  npwp: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\.\d-\d{3}\.\d{3}$/, 'Format NPWP tidak valid').optional().or(z.literal('')),
  nib: z.string().optional(),
  deed_number: z.string().optional(),
  notary_name: z.string().optional(),
  notary_location: z.string().optional(),
  notary_contact: z.string().optional(),
  establishment_date: z.string().optional(),
  employee_count: z.string().optional(),
  basic_capital: z.string().optional(),
  paid_capital: z.string().optional(),
});

const businessInfoSchema = z.object({
  business_type: z.string().min(1, 'Jenis usaha wajib diisi'),
  industry_sector: z.string().min(1, 'Sektor industri wajib diisi'),
  service_package: z.string().optional(),
  business_scale: z.string().min(1, 'Skala bisnis wajib diisi'),
  annual_revenue: z.string().optional(),
});

const taxIdentitySchema = z.object({
  pkp_status: z.enum(['pkp', 'non_pkp']).refine((val) => val !== undefined, {
    message: 'Status PKP wajib dipilih',
  }),
  establishment_date: z.string().optional(),
  taxpayer_type: z.string().min(1, 'Tipe wajib pajak wajib diisi'),
  kpp_office: z.string().optional(),
  applicable_taxes: z.array(z.string()).optional(),
});

const taxDocumentSchema = z.object({
  has_registered_letter: z.boolean().optional(),
  registered_letter_description: z.string().optional(),
  registered_letter_number: z.string().optional(),
  registered_letter_date: z.string().optional(),
  has_pkp_confirmation: z.boolean().optional(),
  pkp_confirmation_description: z.string().optional(),
  pkp_confirmation_number: z.string().optional(),
  pkp_confirmation_date: z.string().optional(),
  has_other_letter: z.boolean().optional(),
});

const picPkpSchema = z.object({
  pic_name: z.string().optional(),
  pic_contact: z.string().optional(),
  pic_email: z.string().email('Format email tidak valid').optional().or(z.literal('')),
});

type FormData = {
  basicInfo: z.infer<typeof basicInfoSchema>;
  address: z.infer<typeof addressSchema>;
  corporate: z.infer<typeof corporateSchema>;
  businessInfo: z.infer<typeof businessInfoSchema>;
  taxIdentity: z.infer<typeof taxIdentitySchema>;
  taxDocument: z.infer<typeof taxDocumentSchema>;
  picPkp: z.infer<typeof picPkpSchema>;
};

interface CreateClientModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const steps = [
  { id: 1, title: 'Identitas', icon: User },
  { id: 2, title: 'Klasifikasi Usaha & Pajak', icon: Calculator },
];

export function CreateClientModal({ open, onClose, onSuccess }: CreateClientModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form instances for each step
  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: '',
      brand_name: '',
      type: 'corporate',
      phone: '',
      website: '',
    },
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: '',
      country: '',
      province: '',
      city: '',
      phone: '',
    },
  });

  const corporateForm = useForm<z.infer<typeof corporateSchema>>({
    resolver: zodResolver(corporateSchema),
    defaultValues: {
      nik: '',
      npwp: '',
      nib: '',
      deed_number: '',
      notary_name: '',
      notary_location: '',
      notary_contact: '',
      establishment_date: '',
      employee_count: '',
      basic_capital: '',
      paid_capital: '',
    },
  });

  const businessInfoForm = useForm<z.infer<typeof businessInfoSchema>>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      business_type: '',
      industry_sector: '',
      service_package: '',
      business_scale: '',
      annual_revenue: '',
    },
  });

  const taxIdentityForm = useForm<z.infer<typeof taxIdentitySchema>>({
    resolver: zodResolver(taxIdentitySchema),
    defaultValues: {
      pkp_status: 'non_pkp',
      establishment_date: '',
      taxpayer_type: '',
      kpp_office: '',
      applicable_taxes: [],
    },
  });

  const taxDocumentForm = useForm<z.infer<typeof taxDocumentSchema>>({
    resolver: zodResolver(taxDocumentSchema),
    defaultValues: {
      has_registered_letter: false,
      registered_letter_description: '',
      registered_letter_number: '',
      registered_letter_date: '',
      has_pkp_confirmation: false,
      pkp_confirmation_description: '',
      pkp_confirmation_number: '',
      pkp_confirmation_date: '',
      has_other_letter: false,
    },
  });

  const picPkpForm = useForm<z.infer<typeof picPkpSchema>>({
    resolver: zodResolver(picPkpSchema),
    defaultValues: {
      pic_name: '',
      pic_contact: '',
      pic_email: '',
    },
  });

  const handleNext = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await basicInfoForm.trigger();
      if (isValid) isValid = await addressForm.trigger();
      if (isValid) isValid = await corporateForm.trigger();
    } else if (currentStep === 2) {
      isValid = await businessInfoForm.trigger();
      if (isValid) isValid = await taxIdentityForm.trigger();
      if (isValid) isValid = await taxDocumentForm.trigger();
      if (isValid) isValid = await picPkpForm.trigger();
    }

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const allValid = await businessInfoForm.trigger();
    if (!allValid) return;
    
    const taxIdentityValid = await taxIdentityForm.trigger();
    if (!taxIdentityValid) return;
    
    const taxDocumentValid = await taxDocumentForm.trigger();
    if (!taxDocumentValid) return;
    
    const picPkpValid = await picPkpForm.trigger();
    if (!picPkpValid) return;

    setIsSubmitting(true);
    try {
      // API integration will be added here
      console.log('Form data:', {
        basicInfo: basicInfoForm.getValues(),
        address: addressForm.getValues(),
        corporate: corporateForm.getValues(),
        businessInfo: businessInfoForm.getValues(),
        taxIdentity: taxIdentityForm.getValues(),
        taxDocument: taxDocumentForm.getValues(),
        picPkp: picPkpForm.getValues(),
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess?.();
      onClose();
      // Reset all forms
      basicInfoForm.reset();
      addressForm.reset();
      corporateForm.reset();
      businessInfoForm.reset();
      taxIdentityForm.reset();
      taxDocumentForm.reset();
      picPkpForm.reset();
    } catch (error) {
      console.error('Error creating client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Informasi Dasar */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Informasi Dasar</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama *</Label>
                  <Input
                    id="name"
                    {...basicInfoForm.register('name')}
                    placeholder="Masukkan nama klien"
                    className={basicInfoForm.formState.errors.name ? 'border-red-500' : ''}
                  />
                  {basicInfoForm.formState.errors.name && (
                    <p className="text-sm text-red-500">{basicInfoForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand_name">Nama Merek</Label>
                  <Input
                    id="brand_name"
                    {...basicInfoForm.register('brand_name')}
                    placeholder="Masukkan nama merek"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Klien *</Label>
                  <Select
                    value={basicInfoForm.watch('type')}
                    onValueChange={(value) => basicInfoForm.setValue('type', value as 'corporate' | 'individual')}
                  >
                    <SelectTrigger className={basicInfoForm.formState.errors.type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih tipe klien" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporate">Badan</SelectItem>
                      <SelectItem value="individual">Orang Pribadi</SelectItem>
                    </SelectContent>
                  </Select>
                  {basicInfoForm.formState.errors.type && (
                    <p className="text-sm text-red-500">{basicInfoForm.formState.errors.type.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telepon</Label>
                  <Input
                    id="phone"
                    {...basicInfoForm.register('phone')}
                    placeholder="Masukkan nomor telepon"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    {...basicInfoForm.register('website')}
                    placeholder="https://example.com"
                  />
                  {basicInfoForm.formState.errors.website && (
                    <p className="text-sm text-red-500">{basicInfoForm.formState.errors.website.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Alamat */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Alamat</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Textarea
                    id="address"
                    {...addressForm.register('address')}
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Negara</Label>
                  <Input
                    id="country"
                    {...addressForm.register('country')}
                    placeholder="Indonesia"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Provinsi</Label>
                  <Input
                    id="province"
                    {...addressForm.register('province')}
                    placeholder="DKI Jakarta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Kota</Label>
                  <Input
                    id="city"
                    {...addressForm.register('city')}
                    placeholder="Jakarta Selatan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_phone">Telepon</Label>
                  <Input
                    id="address_phone"
                    {...addressForm.register('phone')}
                    placeholder="Nomor telepon alamat"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Informasi Korporasi */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Informasi Korporasi</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK</Label>
                  <Input
                    id="nik"
                    {...corporateForm.register('nik')}
                    placeholder="Masukkan NIK"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="npwp">NPWP</Label>
                  <Input
                    id="npwp"
                    {...corporateForm.register('npwp')}
                    placeholder="01.234.567.8-901.000"
                    className={corporateForm.formState.errors.npwp ? 'border-red-500' : ''}
                  />
                  {corporateForm.formState.errors.npwp && (
                    <p className="text-sm text-red-500">{corporateForm.formState.errors.npwp.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nib">NIB</Label>
                  <Input
                    id="nib"
                    {...corporateForm.register('nib')}
                    placeholder="Masukkan NIB"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deed_number">No. Akta Pendirian/Perubahan</Label>
                  <Input
                    id="deed_number"
                    {...corporateForm.register('deed_number')}
                    placeholder="Masukkan nomor akta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notary_name">Nama Notaris</Label>
                  <Input
                    id="notary_name"
                    {...corporateForm.register('notary_name')}
                    placeholder="Masukkan nama notaris"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notary_location">Lokasi Notaris</Label>
                  <Input
                    id="notary_location"
                    {...corporateForm.register('notary_location')}
                    placeholder="Jakarta"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notary_contact">Kontak Notaris</Label>
                  <Input
                    id="notary_contact"
                    {...corporateForm.register('notary_contact')}
                    placeholder="Email atau telepon notaris"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="establishment_date">Tanggal Berdiri</Label>
                  <Input
                    id="establishment_date"
                    {...corporateForm.register('establishment_date')}
                    type="date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employee_count">Jumlah Karyawan</Label>
                  <Input
                    id="employee_count"
                    {...corporateForm.register('employee_count')}
                    placeholder="Masukkan jumlah karyawan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="basic_capital">Modal Dasar (Rp)</Label>
                  <Input
                    id="basic_capital"
                    {...corporateForm.register('basic_capital')}
                    placeholder="1000000000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paid_capital">Modal Disetor (Rp)</Label>
                  <Input
                    id="paid_capital"
                    {...corporateForm.register('paid_capital')}
                    placeholder="500000000"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Informasi Bisnis */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Informasi Bisnis</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="business_type">Jenis Usaha *</Label>
                  <Select
                    value={businessInfoForm.watch('business_type')}
                    onValueChange={(value) => businessInfoForm.setValue('business_type', value)}
                  >
                    <SelectTrigger className={businessInfoForm.formState.errors.business_type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih jenis usaha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="konstruksi">Konstruksi</SelectItem>
                      <SelectItem value="trading">Trading</SelectItem>
                      <SelectItem value="manufaktur">Manufaktur</SelectItem>
                      <SelectItem value="jasa">Jasa</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  {businessInfoForm.formState.errors.business_type && (
                    <p className="text-sm text-red-500">{businessInfoForm.formState.errors.business_type.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry_sector">Sektor Industri *</Label>
                  <Select
                    value={businessInfoForm.watch('industry_sector')}
                    onValueChange={(value) => businessInfoForm.setValue('industry_sector', value)}
                  >
                    <SelectTrigger className={businessInfoForm.formState.errors.industry_sector ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih sektor industri" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sipil">Sipil</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                  {businessInfoForm.formState.errors.industry_sector && (
                    <p className="text-sm text-red-500">{businessInfoForm.formState.errors.industry_sector.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_package">Paket Layanan</Label>
                  <Select
                    value={businessInfoForm.watch('service_package')}
                    onValueChange={(value) => businessInfoForm.setValue('service_package', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih paket layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standar">Standar</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_scale">Skala Bisnis *</Label>
                  <Select
                    value={businessInfoForm.watch('business_scale')}
                    onValueChange={(value) => businessInfoForm.setValue('business_scale', value)}
                  >
                    <SelectTrigger className={businessInfoForm.formState.errors.business_scale ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih skala bisnis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kecil">Kecil</SelectItem>
                      <SelectItem value="menengah">Menengah</SelectItem>
                      <SelectItem value="besar">Besar</SelectItem>
                    </SelectContent>
                  </Select>
                  {businessInfoForm.formState.errors.business_scale && (
                    <p className="text-sm text-red-500">{businessInfoForm.formState.errors.business_scale.message}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="annual_revenue">Revenue Tahunan (Rp)</Label>
                  <Input
                    id="annual_revenue"
                    {...businessInfoForm.register('annual_revenue')}
                    placeholder="365-374-4961"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Identitas Perpajakan */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Identitas Perpajakan</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Status PKP</Label>
                  <Select
                    value={taxIdentityForm.watch('pkp_status')}
                    onValueChange={(value) => taxIdentityForm.setValue('pkp_status', value as 'pkp' | 'non_pkp')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status PKP" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pkp">PKP</SelectItem>
                      <SelectItem value="non_pkp">Non PKP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="establishment_date">Tanggal Berdiri</Label>
                  <Input
                    id="establishment_date"
                    {...taxIdentityForm.register('establishment_date')}
                    type="date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxpayer_type">Tipe Wajib Pajak *</Label>
                  <Select
                    value={taxIdentityForm.watch('taxpayer_type')}
                    onValueChange={(value) => taxIdentityForm.setValue('taxpayer_type', value)}
                  >
                    <SelectTrigger className={taxIdentityForm.formState.errors.taxpayer_type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Pilih tipe wajib pajak" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="badan_usaha">Badan Usaha</SelectItem>
                      <SelectItem value="orang_pribadi">Orang Pribadi</SelectItem>
                      <SelectItem value="cv">CV</SelectItem>
                      <SelectItem value="firma">Firma</SelectItem>
                    </SelectContent>
                  </Select>
                  {taxIdentityForm.formState.errors.taxpayer_type && (
                    <p className="text-sm text-red-500">{taxIdentityForm.formState.errors.taxpayer_type.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kpp_office">Kantor Pelayanan Pajak (KPP)</Label>
                  <Input
                    id="kpp_office"
                    {...taxIdentityForm.register('kpp_office')}
                    placeholder="KPP Pratama Jakarta"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Jenis Pajak yang Berlaku</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Jenis Pajak yang dipilih akan mempengaruhi template COA dan requirement dokumen yang akan dibuat secara otomatis
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'PPh 29',
                      'PPh 23/26', 
                      'PPN',
                      'PPh 21/26',
                      'PPh 4 ayat 2',
                      'PBB',
                      'PPh 22',
                      'PPh 15',
                      'Lainnya'
                    ].map((tax) => (
                      <div key={tax} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`tax-${tax}`}
                          checked={taxIdentityForm.watch('applicable_taxes')?.includes(tax) || false}
                          onChange={(e) => {
                            const currentTaxes = taxIdentityForm.watch('applicable_taxes') || [];
                            if (e.target.checked) {
                              taxIdentityForm.setValue('applicable_taxes', [...currentTaxes, tax]);
                            } else {
                              taxIdentityForm.setValue('applicable_taxes', currentTaxes.filter(t => t !== tax));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`tax-${tax}`} className="text-sm font-normal">
                          {tax}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Informasi Surat Perpajakan */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">Informasi Surat Perpajakan</h3>
              </div>
              
              {/* Surat Keterangan Terdaftar */}
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="has_registered_letter"
                    checked={taxDocumentForm.watch('has_registered_letter') || false}
                    onChange={(e) => taxDocumentForm.setValue('has_registered_letter', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="has_registered_letter" className="font-medium">
                    Surat Keterangan Terdaftar
                  </Label>
                </div>
                
                {taxDocumentForm.watch('has_registered_letter') && (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="registered_letter_description">Deskripsi</Label>
                      <Input
                        id="registered_letter_description"
                        {...taxDocumentForm.register('registered_letter_description')}
                        placeholder="Deskripsi surat"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registered_letter_number">Nomor</Label>
                      <Input
                        id="registered_letter_number"
                        {...taxDocumentForm.register('registered_letter_number')}
                        placeholder="Nomor surat"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registered_letter_date">Tanggal *</Label>
                      <Input
                        id="registered_letter_date"
                        {...taxDocumentForm.register('registered_letter_date')}
                        type="date"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Surat Pengukuhan Pengusaha Kena Pajak */}
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="has_pkp_confirmation"
                    checked={taxDocumentForm.watch('has_pkp_confirmation') || false}
                    onChange={(e) => taxDocumentForm.setValue('has_pkp_confirmation', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="has_pkp_confirmation" className="font-medium">
                    Surat Pengukuhan Pengusaha Kena Pajak
                  </Label>
                </div>
                
                {taxDocumentForm.watch('has_pkp_confirmation') && (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="pkp_confirmation_description">Deskripsi</Label>
                      <Input
                        id="pkp_confirmation_description"
                        {...taxDocumentForm.register('pkp_confirmation_description')}
                        placeholder="Deskripsi surat"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pkp_confirmation_number">Nomor</Label>
                      <Input
                        id="pkp_confirmation_number"
                        {...taxDocumentForm.register('pkp_confirmation_number')}
                        placeholder="Nomor surat"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pkp_confirmation_date">Tanggal *</Label>
                      <Input
                        id="pkp_confirmation_date"
                        {...taxDocumentForm.register('pkp_confirmation_date')}
                        type="date"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tambah Surat Lainnya */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="has_other_letter"
                  checked={taxDocumentForm.watch('has_other_letter') || false}
                  onChange={(e) => taxDocumentForm.setValue('has_other_letter', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="has_other_letter" className="font-medium">
                  Tambah Surat Lainnya
                </Label>
              </div>
            </div>

            <Separator />

            {/* PIC PKP */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-medium">PIC PKP</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="pic_name">PIC/AR Kantor Pajak</Label>
                  <Input
                    id="pic_name"
                    {...picPkpForm.register('pic_name')}
                    placeholder="Nama PIC"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pic_contact">Kontak/Whatsapp</Label>
                  <Input
                    id="pic_contact"
                    {...picPkpForm.register('pic_contact')}
                    placeholder="08123456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pic_email">Email</Label>
                  <Input
                    id="pic_email"
                    {...picPkpForm.register('pic_email')}
                    placeholder="email@example.com"
                    className={picPkpForm.formState.errors.pic_email ? 'border-red-500' : ''}
                  />
                  {picPkpForm.formState.errors.pic_email && (
                    <p className="text-sm text-red-500">{picPkpForm.formState.errors.pic_email.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Tambah Klien Baru
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-center space-x-4 py-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isActive
                        ? 'border-primary bg-primary text-primary-foreground'
                        : isCompleted
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isActive ? 'text-primary' : isCompleted ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="py-4">
          {renderStepContent()}
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan Klien'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
