import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn, Controller } from 'react-hook-form';
import { NewTenantFormValues } from '../page'; // Assuming NewTenantFormValues is exported from page.tsx

interface PackageSectionProps {
  form: UseFormReturn<NewTenantFormValues>;
}

export default function PackageSection({ form }: PackageSectionProps) {
  return (
    <Card className="flex flex-col p-6">
      <h2 className="mb-6 text-xl font-semibold">Paket Layanan</h2>

      <div className="space-y-4">
        {/* Package Selection */}
        <div className="space-y-2">
          <Label htmlFor="package">Pilih Paket *</Label>
          <Controller
            control={form.control}
            name="package"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="package">
                  <SelectValue placeholder="Pilih paket" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free - Rp.0">Free - Rp.0</SelectItem>
                  <SelectItem value="Pro - Rp.2.500.000">Pro - Rp.2.500.000</SelectItem>
                  <SelectItem value="Enterprise - Rp.5.000.000">
                    Enterprise - Rp.5.000.000
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.package && (
            <p className="text-sm">{form.formState.errors.package.message}</p>
          )}
        </div>

        {/* Row: Storage, Projects, Max Users */}
        <div className="flex flex-row items-start space-x-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="storage">Storage*</Label>
            <Input
              id="storage"
              type="text"
              {...form.register('storage')}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="projects">Project *</Label>
            <Input
              id="projects"
              type="text"
              {...form.register('projects')}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="maxUsers">Max User *</Label>
            <Input
              id="maxUsers"
              type="text"
              {...form.register('maxUsers')}
              readOnly
              className="bg-muted"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
