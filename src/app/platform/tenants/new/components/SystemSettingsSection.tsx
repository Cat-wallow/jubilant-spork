import { ChevronDown } from 'lucide-react';

interface SystemSettingsSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function SystemSettingsSection({
  formData,
  updateFormData,
}: SystemSettingsSectionProps) {
  const toggleFeature = (feature: string) => {
    updateFormData({
      features: {
        ...formData.features,
        [feature]: !formData.features[feature],
      },
    });
  };

  return (
    <div className="flex w-[1040px] flex-col gap-5 rounded-[20px] bg-white p-5 dark:bg-navy-800">
      <h2 className="font-roboto text-[22px] font-medium leading-7 text-navy-700 dark:text-white">
        Pengaturan Sistem
      </h2>

      <div className="flex flex-col gap-2.5">
        {/* Row 1: Timezone, Language, Currency */}
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Time zone
            </label>
            <input
              type="text"
              value={formData.timezone}
              onChange={(e) => updateFormData({ timezone: e.target.value })}
              className="h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Bahasa
            </label>
            <input
              type="text"
              value={formData.language}
              onChange={(e) => updateFormData({ language: e.target.value })}
              className="h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Mata Uang
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.currency}
                onChange={(e) => updateFormData({ currency: e.target.value })}
                className="h-[54px] w-full rounded-lg border border-gray-300 bg-white px-3.5 pr-10 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
              />
              <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>

        {/* NIK Label */}
        <label className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
          NIK *
        </label>

        {/* Feature Toggles Grid */}
        <div className="grid grid-cols-3 gap-x-5 gap-y-2.5">
          {Object.entries({
            form10: 'Form 1.0',
            kk1: 'KK1',
            kk2: 'KK2',
            kk3: 'KK3',
            kk4: 'KK4',
            kk5: 'KK5',
            clientManagement: 'Manajemen Klien',
            reports: 'Laporan',
            analytics: 'Analytics',
          }).map(([key, label]) => (
            <div key={key} className="flex w-[320px] items-center gap-2">
              <button
                type="button"
                onClick={() => toggleFeature(key)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  formData.features[key] ? 'bg-brand-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-[2px] block h-5 w-5 rounded-full bg-white transition-transform ${
                    formData.features[key]
                      ? 'translate-x-[22px]'
                      : 'translate-x-[2px]'
                  }`}
                />
              </button>
              <span className="font-inter text-sm font-medium leading-[14px] text-gray-900 dark:text-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
