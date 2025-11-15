import { ChevronDown } from 'lucide-react';

interface BillingSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function BillingSection({
  formData,
  updateFormData,
}: BillingSectionProps) {
  return (
    <div className="flex w-[500px] flex-col gap-5 rounded-[20px] bg-white p-5 dark:bg-navy-800">
      <h2 className="font-roboto text-[22px] font-medium leading-7 text-navy-700 dark:text-white">
        Pengaturan Billing
      </h2>

      <div className="flex flex-col gap-2.5">
        {/* Billing Cycle */}
        <div className="flex flex-col">
          <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
            Siklus Penagihan
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.billingCycle}
              onChange={(e) =>
                updateFormData({ billingCycle: e.target.value })
              }
              className="h-[54px] w-full rounded-lg border border-gray-300 bg-white px-3.5 pr-10 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600 dark:text-gray-400" />
          </div>
        </div>

        {/* Trial Days */}
        <div className="flex flex-col">
          <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
            Batas Hari Trial
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.trialDays}
              onChange={(e) => updateFormData({ trialDays: e.target.value })}
              className="h-[54px] w-full rounded-lg border border-gray-300 bg-white px-3.5 pr-10 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
            <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600 dark:text-gray-400" />
          </div>
        </div>

        {/* Auto Inactive Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="font-inter text-sm font-medium leading-[14px] text-gray-900 dark:text-white">
              Auto Inactive
            </span>
            <p className="font-roboto text-sm leading-5 tracking-[0.25px] text-navy-700 dark:text-gray-400">
              Tangguhkan otomatis akun jika terlambat bayar
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              updateFormData({ autoInactive: !formData.autoInactive })
            }
            className={`relative h-6 w-11 rounded-full transition-colors ${
              formData.autoInactive ? 'bg-brand-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-[2px] block h-5 w-5 rounded-full bg-white transition-transform ${
                formData.autoInactive ? 'translate-x-[22px]' : 'translate-x-[2px]'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
