interface SecuritySectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function SecuritySection({
  formData,
  updateFormData,
}: SecuritySectionProps) {
  return (
    <div className="flex w-[1040px] flex-col gap-5 rounded-[20px] bg-white p-5 dark:bg-navy-800">
      <h2 className="font-roboto text-[22px] font-medium leading-7 text-navy-700 dark:text-white">
        Keamanan
      </h2>

      <div className="flex flex-col gap-2.5">
        {/* 2FA Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="font-inter text-sm font-medium leading-[14px] text-gray-900 dark:text-white">
              Wajib 2FA
            </span>
            <p className="font-roboto text-sm leading-5 tracking-[0.25px] text-navy-700 dark:text-gray-400">
              Paksa semua pengguna menggunakan 2FA
            </p>
          </div>
          <button
            type="button"
            onClick={() => updateFormData({ require2FA: !formData.require2FA })}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              formData.require2FA ? 'bg-brand-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-[2px] block h-5 w-5 rounded-full bg-white transition-transform ${
                formData.require2FA ? 'translate-x-[22px]' : 'translate-x-[2px]'
              }`}
            />
          </button>
        </div>

        {/* Password & Session Settings */}
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col">
            <label className="font-roboto mb-2 text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Minimum Panjang Password
            </label>
            <input
              type="text"
              value={formData.minPasswordLength}
              onChange={(e) =>
                updateFormData({ minPasswordLength: e.target.value })
              }
              className="font-public-sans h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label className="font-roboto mb-2 text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Session Timeout (menit)
            </label>
            <input
              type="text"
              value={formData.sessionTimeout}
              onChange={(e) =>
                updateFormData({ sessionTimeout: e.target.value })
              }
              className="font-public-sans h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
