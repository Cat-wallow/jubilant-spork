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

interface PackageSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function PackageSection({
  formData,
  updateFormData,
}: PackageSectionProps) {
  return (
    <Card className="flex flex-col p-6">
      <h2 className="mb-6 text-xl font-semibold">Paket Layanan</h2>

      <div className="space-y-4 ">
        {/* Package Selection */}
        <div className="space-y-2">
          <Label>Pilih Paket *</Label>
          <Select
            value={formData.package}
            onValueChange={(value) => updateFormData({ package: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih paket" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Free - Rp.0">Free - Rp.0</SelectItem>
              <SelectItem value="Pro - Rp.2.500.000">
                Pro - Rp.2.500.000
              </SelectItem>
              <SelectItem value="Enterprise - Rp.5.000.000">
                Enterprise - Rp.5.000.000
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Row: Storage, Projects, Max Users */}
        <div className=" -mt-10 flex space-x-4 space-y-4 bg-red-500">
          <div className="w-28 space-y-2">
            <Label>Storage*</Label>
            <Input
              type="text"
              value={formData.storage}
              onChange={(e) => updateFormData({ storage: e.target.value })}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="w-28 space-y-2">
            <Label>Project *</Label>
            <Input
              type="text"
              value={formData.projects}
              onChange={(e) => updateFormData({ projects: e.target.value })}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="w-28 space-y-2">
            <Label>Max User *</Label>
            <Input
              type="text"
              value={formData.maxUsers}
              onChange={(e) => updateFormData({ maxUsers: e.target.value })}
              readOnly
              className="bg-muted"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
