import { ChevronDown } from 'lucide-react';

interface PICSectionProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export default function PICSection({
  formData,
  updateFormData,
}: PICSectionProps) {
  return (
    <div className="flex flex-1 flex-col gap-5 rounded-[20px] bg-white p-5 dark:bg-navy-800">
      <h2 className="font-roboto text-[22px] font-medium leading-7 text-navy-700 dark:text-white">
        Person in Charge (PIC)
      </h2>

      <div className="flex flex-col gap-2.5">
        {/* Row 1 */}
        <div className="flex gap-5">
          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Nama PIC*
            </label>
            <input
              type="text"
              placeholder="Nama lengkap PIC"
              value={formData.picName}
              onChange={(e) => updateFormData({ picName: e.target.value })}
              className="h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Jabatan
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Manager, Owner, dll"
                value={formData.position}
                onChange={(e) => updateFormData({ position: e.target.value })}
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
              Email *
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label className="mb-2 font-roboto text-base font-medium leading-6 tracking-[0.15px] text-gray-700 dark:text-gray-300">
              Telepon *
            </label>
            <input
              type="tel"
              placeholder="365-374-4961"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              className="h-[54px] rounded-lg border border-gray-300 bg-white px-3.5 font-public-sans text-sm leading-[22px] text-navy-700 placeholder-gray-400 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
