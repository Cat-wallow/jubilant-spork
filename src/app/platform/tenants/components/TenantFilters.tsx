import { Search, ChevronDown, Filter, MoreHorizontal } from 'lucide-react';

interface TenantFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: any) => void;
  planFilter: string;
  onPlanChange: (value: any) => void;
}

export default function TenantFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  planFilter,
  onPlanChange,
}: TenantFiltersProps) {
  return (
    <div className="mb-5 rounded-[10px] bg-lightPrimary p-2.5 dark:bg-navy-900">
      <div className="flex items-center gap-5">
        {/* Items per page */}
        <div className="flex h-[54px] items-center gap-1 rounded-[10px] border border-gray-300 bg-white px-1.5 dark:border-gray-600 dark:bg-navy-800">
          <span className="font-roboto px-2.5 text-sm font-medium leading-5 tracking-[0.1px] text-gray-700 dark:text-gray-300">
            20
          </span>
          <ChevronDown className="h-3 w-3 text-brand-500" />
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center gap-[15px] rounded-[10px] border border-gray-300 bg-white px-5 py-3 dark:border-gray-600 dark:bg-navy-800">
          <Search className="h-5 w-5 text-brand-500" />
          <input
            type="text"
            placeholder="Cari Nama Tenant"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent flex-1 font-dm text-base leading-5 tracking-[-0.32px] text-navy-700 placeholder-gray-400 outline-none dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <div className="flex h-[54px] items-center gap-1 rounded-[10px] border border-gray-300 bg-white px-3 dark:border-gray-600 dark:bg-navy-800">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-transparent font-roboto cursor-pointer text-sm font-medium leading-5 tracking-[0.1px] text-gray-700 outline-none dark:text-gray-300"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <ChevronDown className="h-3 w-3 text-brand-500" />
        </div>

        {/* Plan Filter */}
        <div className="flex h-[54px] items-center gap-1 rounded-[10px] border border-gray-300 bg-white px-3 dark:border-gray-600 dark:bg-navy-800">
          <select
            value={planFilter}
            onChange={(e) => onPlanChange(e.target.value)}
            className="bg-transparent font-roboto cursor-pointer text-sm font-medium leading-5 tracking-[0.1px] text-gray-700 outline-none dark:text-gray-300"
          >
            <option value="all">All Type</option>
            <option value="Free">Free</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          <ChevronDown className="h-3 w-3 text-brand-500" />
        </div>

        {/* Filter Button */}
        <button className="flex h-[54px] items-center gap-1 rounded-[10px] border border-gray-300 bg-gray-50 px-3 hover:bg-gray-100 dark:border-gray-600 dark:bg-navy-700 dark:hover:bg-navy-600">
          <Filter className="h-[18px] w-[18px] text-brand-500" />
          <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-gray-700 dark:text-gray-300">
            Filter
          </span>
        </button>

        {/* More Button */}
        <button className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] bg-lightPrimary hover:bg-gray-200 dark:bg-navy-700 dark:hover:bg-navy-600">
          <MoreHorizontal className="h-[35px] w-[35px] text-brand-500" />
        </button>
      </div>
    </div>
  );
}
