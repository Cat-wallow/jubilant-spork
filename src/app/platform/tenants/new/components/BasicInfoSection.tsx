import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { NewTenantFormValues } from '../page'; // Assuming NewTenantFormValues is exported from page.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export default function BasicInfoSection() {
  const { control } = useFormContext<NewTenantFormValues>();

  return (
    <Card className="h-full p-6">
      <h2 className="mb-6 text-xl font-semibold">Informasi Dasar</h2>

      <div className="space-y-4">
        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="tenantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Tenant *</FormLabel>
                <FormControl>
                  <Input placeholder="PT Konsultan Pajak" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="slugUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug URL *</FormLabel>
                <FormControl>
                  <Input placeholder="pt-konsultan-pajak-abc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Perusahaan (Branding)</FormLabel>
                <FormControl>
                  <Input placeholder="Nama yang ditampilkan di sistem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input placeholder="Solusi pajak terpercaya" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Card>
  );
}
