'use client';

import { useState } from 'react';
import RBAC from 'components/rbac/RBAC';
import TenantStats from './components/TenantStats';
import TenantTable from './components/TenantTable';
import TenantFilters from './components/TenantFilters';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

function TenantsPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'Active' | 'Inactive'
  >('all');
  const [planFilter, setPlanFilter] = useState<
    'all' | 'Free' | 'Pro' | 'Enterprise'
  >('all');
  const router = useRouter();

  // Dummy data for demonstration
  const stats = {
    totalClients: 29,
    pkpClients: 25,
    nonPkpClients: 2,
    activeClients: 10,
    totalProjects: 10,
    complianceRate: 80,
    complianceChange: 23,
  };

  const tenants = [
    {
      id: '1',
      name: 'PT. Maju Bersama',
      status: 'Active',
      plan: 'Enterprise',
      activeProjects: 23,
      users: 23,
      storage: { used: 100, total: 150 },
      lastUpdate: '2025-09-12T13:20:00',
    },
    {
      id: '2',
      name: 'PT. Maju Jayalaya',
      status: 'Inactive',
      plan: 'Free',
      activeProjects: 23,
      users: 23,
      storage: { used: 100, total: 150 },
      lastUpdate: '2025-09-12T13:20:00',
    },
    {
      id: '3',
      name: 'PT. Mundur Sendiri',
      status: 'Active',
      plan: 'Enterprise',
      activeProjects: 23,
      users: 23,
      storage: { used: 100, total: 150 },
      lastUpdate: '2025-09-12T13:20:00',
    },
    {
      id: '4',
      name: 'PT. Maju Jayalaya',
      status: 'Inactive',
      plan: 'Pro',
      activeProjects: 23,
      users: 23,
      storage: { used: 100, total: 150 },
      lastUpdate: '2025-09-12T13:20:00',
    },
    {
      id: '5',
      name: 'PT. Maju Mundur Sendiri',
      status: 'Inactive',
      plan: 'Free',
      activeProjects: 23,
      users: 23,
      storage: { used: 100, total: 150 },
      lastUpdate: '2025-09-12T13:20:00',
    },
    {
      id: '6',
      name: 'PT. Maju Mundur Bersama',
      status: 'Active',
      plan: 'Enterprise',
      activeProjects: 23,
      users: 23,
      storage: { used: 100, total: 150 },
      lastUpdate: '2025-09-12T13:20:00',
    },
    {
      id: '7',
      name: 'PT. Maju Jayalaya',
      status: 'Inactive',
      plan: 'Enterprise',
      activeProjects: 23,
      users: 23,
      storage: { used: 100, total: 150 },
      lastUpdate: '2025-09-12T13:20:00',
    },
    {
      id: '8',
      name: 'PT. Mundur Sendiri',
      status: 'Active',
      plan: 'Pro',
      activeProjects: 23,
      users: 23,
      storage: { used: 100, total: 150 },
      lastUpdate: '2025-09-12T13:20:00',
    },
  ];

  // Filter tenants based on search and filters
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch = tenant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || tenant.status === statusFilter;
    const matchesPlan = planFilter === 'all' || tenant.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="mt-3 h-full w-full">
      {/* Header */}
      <div className="mb-[30px] flex flex-col gap-[5px]">
        <p className="font-dm text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
          Tenant
        </p>
        <h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-navy-700 dark:text-white">
          Tenant (Perusahaan Konsultan Pajak)
        </h1>
      </div>

      {/* Stats */}
      <TenantStats stats={stats} />

      {/* Main Content Card */}
      <div className="mt-[30px] rounded-[20px] bg-white p-[30px] dark:bg-navy-800">
        {/* Title and Add Button */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex flex-col gap-0">
            <h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-navy-700 dark:text-white">
              Daftar Tenant ({filteredTenants.length})
            </h2>
            <p className="font-roboto text-xs leading-4 tracking-[0.4px] text-navy-700 dark:text-gray-400">
              Kelola data identitas, klasifikasi pajak, dan dokumen legal client
            </p>
          </div>
          <button
            onClick={() => router.push('/platform/tenants/new')}
            className="flex items-center gap-1 rounded-[10px] bg-blue-500 px-3 py-2.5 hover:bg-blue-600"
          >
            <Plus className="h-6 w-6 text-white" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-white">
              Tambah Tenant
            </span>
          </button>
        </div>

        {/* Filters */}
        <TenantFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          planFilter={planFilter}
          onPlanChange={setPlanFilter}
        />

        {/* Table */}
        <TenantTable tenants={filteredTenants} />
      </div>
    </div>
  );
}

export default function TenantsPage() {
  return (
    <RBAC requiredPermission="platform:user_manage" unauthorizedPage={true}>
      <TenantsPageContent />
    </RBAC>
  );
}
