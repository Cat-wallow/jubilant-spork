import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn, Controller } from 'react-hook-form';
import { NewTenantFormValues } from '../page'; // Assuming NewTenantFormValues is exported from page.tsx

interface BillingSectionProps {
  form: UseFormReturn<NewTenantFormValues>;
}

export default function BillingSection({ form }: BillingSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Pengaturan Billing</h2>

      <div className="space-y-4">
        {/* Billing Cycle */}
        <div className="space-y-2">
          <Label htmlFor="billingCycle">Siklus Penagihan</Label>
          <Controller
            control={form.control}
            name="billingCycle"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="billingCycle">
                  <SelectValue placeholder="Pilih siklus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bulanan">Bulanan</SelectItem>
                  <SelectItem value="Tahunan">Tahunan</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Trial Days */}
        <div className="space-y-2">
          <Label htmlFor="trialDays">Batas Hari Trial</Label>
          <Input id="trialDays" type="number" placeholder="7" {...form.register('trialDays')} />
        </div>

        {/* Auto Inactive Toggle */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Auto Inactive</p>
            <p className="text-xs text-muted-foreground">
              Tangguhkan otomatis akun jika terlambat bayar
            </p>
          </div>
          <Controller
            control={form.control}
            name="autoInactive"
            render={({ field }) => (
              <Toggle
                pressed={field.value}
                onPressedChange={field.onChange}
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {field.value ? 'ON' : 'OFF'}
              </Toggle>
            )}
          />
        </div>
      </div>
    </Card>
  );
}
