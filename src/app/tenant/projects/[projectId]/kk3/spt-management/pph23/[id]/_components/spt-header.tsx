import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { formatCurrency } from "./spt-data";

interface SPTHeaderProps {
  status: 'draft' | 'submitted' | 'approved';
  completeness: number;
  totalPajak: number;
}

export function SPTHeader({ status, completeness, totalPajak }: SPTHeaderProps) {
  const statusConfig = {
    draft: { label: 'Draft', className: 'bg-amber-500 text-white' },
    submitted: { label: 'Submitted', className: 'bg-blue-500 text-white' },
    approved: { label: 'Approved', className: 'bg-green-500 text-white' }
  };

  const statusInfo = statusConfig[status];

  return (
    <div className="flex items-center justify-between p-6 border border-black/10 rounded-lg bg-white">
      <div className="flex items-center gap-4">
        <Clock className="w-4 h-4 text-amber-600" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">Status:</span>
            <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
          </div>
          <p className="text-sm text-gray-600">
            Auto-filled from KK2 accounting data • Completeness: {completeness}%
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-blue-900">
          {formatCurrency(totalPajak)}
        </div>
        <p className="text-sm text-gray-600">Total Pajak</p>
      </div>
    </div>
  );
}
