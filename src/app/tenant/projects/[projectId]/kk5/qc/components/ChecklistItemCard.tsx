'use client';

import { useState } from 'react';
import { Check, Clock, AlertCircle, Edit, Save, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface ValidationItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistItem {
  id: string;
  number: number;
  title: string;
  description: string;
  status: string;
  statusColor: string;
  statusTextColor: string;
  icon: string;
  iconColor: string;
  completedDate?: string;
  reviewedBy?: string;
  validationChecklist?: ValidationItem[];
  notes: string;
}

interface ChecklistItemCardProps {
  item: ChecklistItem;
}

export function ChecklistItemCard({ item }: ChecklistItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(item.notes);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    (item.validationChecklist || []).reduce(
      (acc, check) => ({
        ...acc,
        [check.id]: check.checked,
      }),
      {}
    )
  );

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'checkCircle':
        return <Check className="h-5 w-5" />;
      case 'clockCircle':
        return <Clock className="h-5 w-5" />;
      case 'alertCircle':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNotes(item.notes);
    setIsEditing(false);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="mt-1 flex-shrink-0">
          <div className={`${item.iconColor}`}>{getIcon(item.icon)}</div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-normal text-gray-900">{item.title}</h3>
                <span
                  className={`inline-block rounded-lg ${item.statusColor} px-2 py-1 text-xs font-normal ${item.statusTextColor}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </div>
            {item.status === 'Complete' && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
            )}
          </div>

          {/* Completion Info */}
          {item.completedDate && item.reviewedBy && (
            <div className="mt-4 flex gap-8 text-sm text-gray-600">
              <span>Completed: {item.completedDate}</span>
              <span>• Reviewed by: {item.reviewedBy}</span>
            </div>
          )}

          {/* Validation Checklist */}
          {item.validationChecklist && item.validationChecklist.length > 0 && (
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm font-normal text-blue-900 mb-3">Validasi Kelengkapan Modul</p>
              <div className="space-y-3">
                {item.validationChecklist.map((check) => (
                  <div key={check.id} className="flex items-center gap-3">
                    <Checkbox
                      id={check.id}
                      checked={checkedItems[check.id] || false}
                      onCheckedChange={() => handleCheckboxChange(check.id)}
                      disabled={!isEditing}
                      className="border-blue-600"
                    />
                    <label
                      htmlFor={check.id}
                      className="text-sm font-normal text-blue-700 cursor-pointer"
                    >
                      {check.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Section */}
          {(item.status === 'Complete' || item.status === 'Pending') && (
            <div className="mt-4 space-y-2">
              <label className="text-sm font-normal text-gray-900">Catatan Reviewer</label>
              {isEditing ? (
                <>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tambahkan catatan QC..."
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none"
                    rows={3}
                  />
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-normal text-white hover:bg-gray-800"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                  {item.notes || 'Tambahkan catatan QC...'}
                </div>
              )}
            </div>
          )}

          {/* Need Correction Notes */}
          {item.status === 'Need Correction' && (
            <div className="mt-4 rounded-lg bg-gray-100 p-3">
              <p className="text-sm font-normal text-gray-900 mb-2">Catatan Reviewer:</p>
              <p className="text-sm text-gray-900">{item.notes}</p>
              <div className="mt-4">
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
