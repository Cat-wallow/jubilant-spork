import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';

interface SecuritySectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function SecuritySection({
  formData,
  updateFormData,
}: SecuritySectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Keamanan</h2>

      <div className="space-y-4">
        {/* 2FA Toggle */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Wajib 2FA</p>
            <p className="text-muted-foreground text-xs">
              Paksa semua pengguna menggunakan 2FA
            </p>
          </div>
          <Toggle
            pressed={formData.require2FA}
            onPressedChange={(pressed) =>
              updateFormData({ require2FA: pressed })
            }
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            {formData.require2FA ? 'ON' : 'OFF'}
          </Toggle>
        </div>

        {/* Password & Session Settings */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Minimum Panjang Password</Label>
            <Input
              type="number"
              value={formData.minPasswordLength}
              onChange={(e) =>
                updateFormData({ minPasswordLength: e.target.value })
              }
              placeholder="8"
            />
          </div>

          <div className="space-y-2">
            <Label>Session Timeout (menit)</Label>
            <Input
              type="number"
              value={formData.sessionTimeout}
              onChange={(e) =>
                updateFormData({ sessionTimeout: e.target.value })
              }
              placeholder="10"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
