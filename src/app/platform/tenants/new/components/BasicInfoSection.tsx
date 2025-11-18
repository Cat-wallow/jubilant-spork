import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BasicInfoSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function BasicInfoSection({
  formData,
  updateFormData,
}: BasicInfoSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Informasi Dasar</h2>

      <div className="space-y-4">
        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nama Tenant *</Label>
            <Input
              placeholder="PT Konsultan Pajak"
              value={formData.tenantName}
              onChange={(e) => updateFormData({ tenantName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Slug URL</Label>
            <Input
              placeholder="pt-konsultan-pajak-abc"
              value={formData.slugUrl}
              onChange={(e) => updateFormData({ slugUrl: e.target.value })}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nama Perusahaan (Branding)</Label>
            <Input
              placeholder="Nama yang ditampilkan di sistem"
              value={formData.companyName}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Tagline</Label>
            <Input
              placeholder="Solusi Pajak Terpercaya"
              value={formData.tagline}
              onChange={(e) => updateFormData({ tagline: e.target.value })}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
