'use client';

import { useState } from 'react';
import RBAC from 'components/rbac/RBAC';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TenantStats from './components/TenantStats';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

function TenantsPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const router = useRouter();
  const [selectedTenants, setSelectedTenants] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

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
  ];

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch = tenant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || tenant.status === statusFilter;
    const matchesPlan = planFilter === 'all' || tenant.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTenants([]);
    } else {
      setSelectedTenants(filteredTenants.map((t) => t.id));
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
    <div className="mt-3 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-[5px]">
        <p className="text-muted-foreground text-sm font-medium">Tenant</p>
        <h1 className="text-4xl font-bold tracking-tight">
          Tenant (Perusahaan Konsultan Pajak)
        </h1>
      </div>

      {/* Stats */}
      <TenantStats stats={stats} />

      {/* Main Content Card */}
      <div className="bg-card rounded-lg border p-6">
        {/* Title and Add Button */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">
              Daftar Tenant ({filteredTenants.length})
            </h2>
            <p className="text-muted-foreground text-sm">
              Kelola data identitas, klasifikasi pajak, dan dokumen legal client
            </p>
          </div>
          <Button
            onClick={() => router.push('/platform/tenants/new')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Tambah Tenant
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <Search className="text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari Nama Tenant"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Type</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Pro">Pro</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Active Project</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Storage</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead className="w-20 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTenants.includes(tenant.id)}
                    onCheckedChange={() => handleSelectTenant(tenant.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{tenant.name}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded px-2 py-1 text-xs font-semibold ${
                      tenant.status === 'Active'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}
                  >
                    {tenant.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="bg-accent/10 text-accent inline-flex rounded px-2 py-1 text-xs font-semibold">
                    {tenant.plan}
                  </span>
                </TableCell>
                <TableCell>{tenant.activeProjects}</TableCell>
                <TableCell>{tenant.users}</TableCell>
                <TableCell>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>{tenant.storage.used}GB</span>
                      <span>{tenant.storage.total}GB</span>
                    </div>
                    <div className="bg-muted h-2 w-24 rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${
                            (tenant.storage.used / tenant.storage.total) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  {formatDate(tenant.lastUpdate)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4 text-purple-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-orange-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Showing 1-{filteredTenants.length} of {filteredTenants.length}{' '}
            tenants
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="default" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
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
