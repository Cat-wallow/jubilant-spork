import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface BrandingSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function BrandingSection({
  formData,
  updateFormData,
}: BrandingSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Branding</h2>

      <div className="space-y-4">
        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Logo Perusahaan</Label>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Upload className="h-4 w-4" />
            Upload Logo Perusahaan
          </Button>
        </div>

        {/* Color Pickers */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Primary Color */}
          <div className="space-y-2">
            <Label>Warna Primer</Label>
            <div className="flex gap-2">
              <div className="h-10 w-10 rounded-lg bg-gray-300" />
              <Input
                type="text"
                value={formData.primaryColor}
                onChange={(e) =>
                  updateFormData({ primaryColor: e.target.value })
                }
                placeholder="#qw123d"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <Label>Warna Sekunder</Label>
            <div className="flex gap-2">
              <div className="h-10 w-10 rounded-lg bg-purple-600" />
              <Input
                type="text"
                value={formData.secondaryColor}
                onChange={(e) =>
                  updateFormData({ secondaryColor: e.target.value })
                }
                placeholder="#6E3DB7"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
