import { ChevronDown, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Tenant {
  id: string;
  name: string;
  status: string;
  plan: string;
  activeProjects: number;
  users: number;
  storage: { used: number; total: number };
  lastUpdate: string;
}

interface TenantTableProps {
  tenants: Tenant[];
}

export default function TenantTable({ tenants }: TenantTableProps) {
  const [selectedTenants, setSelectedTenants] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTenants([]);
    } else {
      setSelectedTenants(tenants.map((t) => t.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectTenant = (id: string) => {
    if (selectedTenants.includes(id)) {
      setSelectedTenants(selectedTenants.filter((tid) => tid !== id));
    } else {
      setSelectedTenants([...selectedTenants, id]);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active'
      ? 'bg-[rgba(103,80,164,0.08)] dark:bg-[rgba(103,80,164,0.2)]'
      : 'bg-[rgba(255,251,235,1)] dark:bg-yellow-900/30';
  };

  const getPlanColor = (plan: string) => {
    return 'bg-[rgba(103,80,164,0.08)] dark:bg-[rgba(103,80,164,0.2)]';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Table Header */}
      <div className="flex items-center justify-between">
        <div className="flex w-[150px] items-center gap-2.5">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="h-6 w-6 cursor-pointer rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600"
          />
          <span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Tenant
          </span>
          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Status
          </span>
          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Plan
          </span>
          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Active Project
          </span>
          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Users
          </span>
          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Storage
          </span>
          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>

        <div className="flex w-[120px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Last Update
          </span>
          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>

        <div className="flex w-[210px] items-center gap-[7px]">
          <span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Action
          </span>
          <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-gray-200 dark:bg-gray-700" />

      {/* Table Rows */}
      <div className="flex flex-col">
        {tenants.map((tenant) => (
          <div key={tenant.id}>
            <div className="flex items-center justify-between py-2">
              {/* Tenant Name */}
              <div className="flex w-[150px] items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={selectedTenants.includes(tenant.id)}
                  onChange={() => handleSelectTenant(tenant.id)}
                  className="h-6 w-6 cursor-pointer rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600"
                />
                <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-navy-700 dark:text-white">
                  {tenant.name}
                </span>
              </div>

              {/* Status */}
              <div className="w-[120px]">
                <div
                  className={`inline-flex h-[29px] items-center justify-center rounded-[5px] px-2.5 ${getStatusColor(
                    tenant.status,
                  )}`}
                >
                  <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-navy-700 dark:text-white">
                    {tenant.status}
                  </span>
                </div>
              </div>

              {/* Plan */}
              <div className="w-[120px]">
                <div
                  className={`inline-flex h-[29px] items-center justify-center rounded-[5px] px-2.5 ${getPlanColor(
                    tenant.plan,
                  )}`}
                >
                  <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-navy-700 dark:text-white">
                    {tenant.plan}
                  </span>
                </div>
              </div>

              {/* Active Projects */}
              <div className="w-[120px]">
                <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-navy-700 dark:text-white">
                  {tenant.activeProjects}
                </span>
              </div>

              {/* Users */}
              <div className="w-[120px]">
                <span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-navy-700 dark:text-white">
                  {tenant.users}
                </span>
              </div>

              {/* Storage */}
              <div className="w-[120px]">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span className="font-roboto text-xs leading-4 tracking-[0.4px] text-navy-700 dark:text-white">
                      {tenant.storage.used}GB
                    </span>
                    <span className="font-roboto text-xs leading-4 tracking-[0.4px] text-navy-700 dark:text-white">
                      {tenant.storage.total}GB
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-lightPrimary dark:bg-navy-700">
                    <div
                      className="h-2 rounded-full bg-brand-500"
                      style={{
                        width: `${
                          (tenant.storage.used / tenant.storage.total) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Last Update */}
              <div className="w-[120px]">
                <span className="font-dm text-xs leading-[15px] tracking-[-0.24px] text-navy-700 dark:text-white">
                  {formatDate(tenant.lastUpdate)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex w-[210px] items-center gap-5">
                <button className="flex items-center justify-center p-1 hover:opacity-70">
                  <Edit className="h-6 w-6 text-[#6750A4]" />
                </button>
                <button className="flex items-center justify-center p-1 hover:opacity-70">
                  <Trash2 className="h-[30px] w-[30px] text-[#BF6A02]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-between">
        <p className="font-dm text-sm text-gray-600 dark:text-gray-400">
          Showing 1-10 of {tenants.length} products
        </p>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-navy-700">
            &lt;
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-brand-500 text-sm text-white dark:border-gray-600">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-navy-700">
            2
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-navy-700">
            3
          </button>
          <span className="px-2 text-sm text-gray-600 dark:text-gray-400">
            ...
          </span>
          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-navy-700">
            10
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-navy-700">
            &gt;
          </button>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Next
          </span>
        </div>
      </div>
    </div>
  );
}
