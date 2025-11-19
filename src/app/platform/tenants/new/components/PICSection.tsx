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

interface PICSectionProps {
  form: UseFormReturn<NewTenantFormValues>;
}

export default function PICSection({ form }: PICSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Person in Charge (PIC)</h2>

      <div className="space-y-4">
        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="picName">Nama PIC *</Label>
            <Input
              id="picName"
              placeholder="Nama lengkap PIC"
              {...form.register('picName')}
            />
            {form.formState.errors.picName && (
              <p className="text-sm text-red-500">
                {form.formState.errors.picName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Jabatan</Label>
            <Controller
              control={form.control}
              name="position"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Pilih jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Director">Director</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telepon *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="365-374-4961"
              {...form.register('phone')}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}