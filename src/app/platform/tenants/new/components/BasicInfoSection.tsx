import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { NewTenantFormValues } from '../page'; // Assuming NewTenantFormValues is exported from page.tsx

interface BasicInfoSectionProps {
  form: UseFormReturn<NewTenantFormValues>;
}

export default function BasicInfoSection({ form }: BasicInfoSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Informasi Dasar</h2>

      <div className="space-y-4">
        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tenantName">Nama Tenant *</Label>
            <Input
              id="tenantName"
              placeholder="PT Konsultan Pajak"
              {...form.register('tenantName')}
            />
            {form.formState.errors.tenantName && (
              <p className="text-sm text-red-500">
                {form.formState.errors.tenantName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slugUrl">Slug URL</Label>
            <Input
              id="slugUrl"
              placeholder="pt-konsultan-pajak-abc"
              {...form.register('slugUrl')}
            />
            {form.formState.errors.slugUrl && (
              <p className="text-sm text-red-500">
                {form.formState.errors.slugUrl.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nama Perusahaan (Branding)</Label>
            <Input
              id="companyName"
              placeholder="Nama yang ditampilkan di sistem"
              {...form.register('companyName')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              placeholder="Solusi Pajak Terpercaya"
              {...form.register('tagline')}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}