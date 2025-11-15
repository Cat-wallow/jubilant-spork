import { ChevronDown } from 'lucide-react';

interface BasicInfoSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function BasicInfoSection({
  formData,
  updateFormData,
}: BasicInfoSectionProps) {
  return (
    <div className="flex flex-1 flex-col gap-5 rounded-[20px] bg-white p-5 dark:bg-navy-800">
      <h2 className="font-roboto text-[22px] font-medium leading-7 text-navy-700 dark:text-white">
        Informasi Dasar
      </h2>

      <div className="flex flex-col gap-2.5">
        {/* Row 1 */}
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Nama Tenant *
            </label>
            <input
              type="text"
              placeholder="PT Konsultan Pajak"
              value={formData.tenantName}
              onChange={(e) => updateFormData({ tenantName: e.target.value })}
              className="h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Slug URL
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="pt-konsultan-pajak-abc"
                value={formData.slugUrl}
                onChange={(e) => updateFormData({ slugUrl: e.target.value })}
                className="h-[54px] w-full rounded-lg border border-gray-300 bg-white px-3.5 pr-10 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
              />
              <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Nama Perusahaan (Branding)
            </label>
            <input
              type="text"
              placeholder="Nama yang ditampilkan di sistem"
              value={formData.companyName}
              onChange={(e) =>
                updateFormData({ companyName: e.target.value })
              }
              className="h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Tagline
            </label>
            <input
              type="text"
              placeholder="Solusi Pajak Terpercaya"
              value={formData.tagline}
              onChange={(e) => updateFormData({ tagline: e.target.value })}
              className="h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
