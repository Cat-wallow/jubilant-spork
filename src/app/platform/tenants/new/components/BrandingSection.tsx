import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { NewTenantFormValues } from '../page'; // Assuming NewTenantFormValues is exported from page.tsx

interface BrandingSectionProps {
  form: UseFormReturn<NewTenantFormValues>;
}

export default function BrandingSection({ form }: BrandingSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Branding</h2>

      <div className="space-y-4">
        {/* Logo Upload */}
        <div className="space-y-2">
          <Label htmlFor="logo">Logo Perusahaan</Label>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Upload className="h-4 w-4" />
            Upload Logo Perusahaan
          </Button>
          {/* Register the logo field, actual file handling will be more complex */}
          <Input id="logo" type="file" {...form.register('logo')} className="hidden" />
        </div>

        {/* Color Pickers */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Primary Color */}
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Warna Primer</Label>
            <div className="flex gap-2">
              <div className="h-10 w-10 rounded-lg bg-gray-300" />
              <Input
                id="primaryColor"
                type="text"
                {...form.register('primaryColor')}
                placeholder="#qw123d"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Warna Sekunder</Label>
            <div className="flex gap-2">
              <div className="h-10 w-10 rounded-lg bg-purple-600" />
              <Input
                id="secondaryColor"
                type="text"
                {...form.register('secondaryColor')}
                placeholder="#6E3DB7"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}