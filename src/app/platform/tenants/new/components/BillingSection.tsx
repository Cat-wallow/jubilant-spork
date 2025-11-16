import { Card } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Toggle } from 'components/ui/toggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';

interface BillingSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function BillingSection({
  formData,
  updateFormData,
}: BillingSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Pengaturan Billing</h2>

      <div className="space-y-4">
        {/* Billing Cycle */}
        <div className="space-y-2">
          <Label>Siklus Penagihan</Label>
          <Select
            value={formData.billingCycle}
            onValueChange={(value) => updateFormData({ billingCycle: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih siklus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bulanan">Bulanan</SelectItem>
              <SelectItem value="Tahunan">Tahunan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Trial Days */}
        <div className="space-y-2">
          <Label>Batas Hari Trial</Label>
          <Input
            type="number"
            value={formData.trialDays}
            onChange={(e) => updateFormData({ trialDays: e.target.value })}
            placeholder="7"
          />
        </div>

        {/* Auto Inactive Toggle */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Auto Inactive</p>
            <p className="text-xs text-muted-foreground">
              Tangguhkan otomatis akun jika terlambat bayar
            </p>
          </div>
          <Toggle
            pressed={formData.autoInactive}
            onPressedChange={(pressed) =>
              updateFormData({ autoInactive: pressed })
            }
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            {formData.autoInactive ? 'ON' : 'OFF'}
          </Toggle>
        </div>
      </div>
    </Card>
  );
}
