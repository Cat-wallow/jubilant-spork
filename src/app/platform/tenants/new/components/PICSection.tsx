import { Card } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';

interface PICSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function PICSection({
  formData,
  updateFormData,
}: PICSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Person in Charge (PIC)</h2>

      <div className="space-y-4">
        {/* Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Nama PIC *</Label>
            <Input
              placeholder="Nama lengkap PIC"
              value={formData.picName}
              onChange={(e) => updateFormData({ picName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Jabatan</Label>
            <Select
              value={formData.position}
              onValueChange={(value) => updateFormData({ position: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jabatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Director">Director</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Telepon *</Label>
            <Input
              type="tel"
              placeholder="365-374-4961"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
