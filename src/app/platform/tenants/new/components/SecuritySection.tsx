import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import { UseFormReturn, Controller } from 'react-hook-form';

interface SecuritySectionProps {
  form: UseFormReturn<any>;
}

export default function SecuritySection({ form }: SecuritySectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Keamanan</h2>

      <div className="space-y-4">
        {/* 2FA Toggle */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Wajib 2FA</p>
            <p className="text-xs text-muted-foreground">Paksa semua pengguna menggunakan 2FA</p>
          </div>
          <Controller
            control={form.control}
            name={"require2FA" as any}
            render={({ field }) => (
              <Toggle
                pressed={!!field.value}
                onPressedChange={field.onChange}
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {!!field.value ? 'ON' : 'OFF'}
              </Toggle>
            )}
          />
        </div>

        {/* Password & Session Settings */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="minPasswordLength">Minimum Panjang Password</Label>
            <Input
              id="minPasswordLength"
              type="number"
              placeholder="8"
              {...form.register('minPasswordLength' as any)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (menit)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              placeholder="10"
              {...form.register('sessionTimeout' as any)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
