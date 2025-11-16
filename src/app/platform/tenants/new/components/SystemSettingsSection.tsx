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

interface SystemSettingsSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const FEATURES = [
  { key: 'form10', label: 'Form 1.0' },
  { key: 'kk1', label: 'KK1' },
  { key: 'kk2', label: 'KK2' },
  { key: 'kk3', label: 'KK3' },
  { key: 'kk4', label: 'KK4' },
  { key: 'kk5', label: 'KK5' },
  { key: 'clientManagement', label: 'Manajemen Klien' },
  { key: 'reports', label: 'Laporan' },
  { key: 'analytics', label: 'Analytics' },
];

export default function SystemSettingsSection({
  formData,
  updateFormData,
}: SystemSettingsSectionProps) {
  const toggleFeature = (key: string) => {
    updateFormData({
      features: {
        ...formData.features,
        [key]: !formData.features[key],
      },
    });
  };

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Pengaturan Sistem</h2>

      <div className="space-y-6">
        {/* Row 1: Timezone, Language, Currency */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Time zone</Label>
            <Select
              value={formData.timezone}
              onValueChange={(value) => updateFormData({ timezone: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Jakarta (WIB)">
                  Asia/Jakarta (WIB)
                </SelectItem>
                <SelectItem value="Asia/Surabaya (WITA)">
                  Asia/Surabaya (WITA)
                </SelectItem>
                <SelectItem value="Asia/Makassar (WITA)">
                  Asia/Makassar (WITA)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Bahasa</Label>
            <Select
              value={formData.language}
              onValueChange={(value) => updateFormData({ language: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih bahasa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Indonesia">Indonesia</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Mata Uang</Label>
            <Select
              value={formData.currency}
              onValueChange={(value) => updateFormData({ currency: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih mata uang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rupiah (IDR)">Rupiah (IDR)</SelectItem>
                <SelectItem value="Dollar (USD)">Dollar (USD)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* NIK Label */}
        <div>
          <Label className="mb-4 block">NIK *</Label>

          {/* Feature Toggles Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ key, label }) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <Toggle
                  pressed={formData.features[key]}
                  onPressedChange={() => toggleFeature(key)}
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {formData.features[key] ? 'ON' : 'OFF'}
                </Toggle>
                <Label className="cursor-pointer text-sm">{label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
