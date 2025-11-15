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
    <div className="flex w-[1040px] flex-col gap-5 rounded-[20px] bg-white p-5 dark:bg-navy-800">
      <h2 className="font-roboto text-[22px] font-medium leading-7 text-navy-700 dark:text-white">
        Branding
      </h2>

      <div className="flex flex-col gap-2.5">
        {/* Logo Upload */}
        <div className="flex flex-col">
          <label className="font-roboto mb-2 text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
            Logo Perusahaan
          </label>
          <button
            type="button"
            className="flex h-[54px] items-center justify-center gap-1 rounded-[10px] border border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-navy-900 dark:hover:bg-navy-700"
          >
            <Upload className="h-6 w-6 text-brand-500" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-brand-500">
              Upload Logo Perusahaan
            </span>
          </button>
        </div>

        {/* Color Pickers */}
        <div className="flex gap-5">
          {/* Primary Color */}
          <div className="flex flex-1 flex-col">
            <label className="font-roboto mb-2 text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Warna Primer
            </label>
            <div className="flex items-start gap-2.5">
              <div className="h-[54px] w-[54px] rounded-[10px] bg-gray-300 dark:bg-gray-600" />
              <input
                type="text"
                value={formData.primaryColor}
                onChange={(e) =>
                  updateFormData({ primaryColor: e.target.value })
                }
                className="font-public-sans h-[54px] flex-1 rounded-lg border border-gray-300 bg-white px-3.5 text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div className="flex flex-1 flex-col">
            <label className="font-roboto mb-2 text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Warna Sekunder
            </label>
            <div className="flex items-start gap-2.5">
              <div className="h-[54px] w-[54px] rounded-[10px] bg-[#6E3DB7]" />
              <input
                type="text"
                value={formData.secondaryColor}
                onChange={(e) =>
                  updateFormData({ secondaryColor: e.target.value })
                }
                className="font-public-sans h-[54px] flex-1 rounded-lg border border-gray-300 bg-white px-3.5 text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
