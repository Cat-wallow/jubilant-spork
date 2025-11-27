'use client';

import RBAC from '@/components/rbac/RBAC';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectStats from './components/ProjectStats';
import ProjectTable from './components/ProjectTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

function ProjectsPageContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  return (
    <div className="w-full space-y-[30px]">
      {/* Header */}
      <div className="flex flex-col gap-[5px]">
        <p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">Project</p>
        <h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
          Daftar Project
        </h1>
      </div>

      {/* Stats */}
      <ProjectStats />

      {/* Main Content Card */}
      <div className="rounded-[20px] bg-white p-[30px]">
        {/* Title and Add Button */}
        <div className="mb-[50px] flex items-start justify-between">
          <div className="flex flex-col gap-[20px]">
            <div>
              <h2 className="font-dm text-2xl font-bold leading-8 text-[#2B3674]">
                Semua Project
              </h2>
              <p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
                Kelola projectdi dalam sistem
              </p>
            </div>
          </div>
          <Button
            onClick={() => router.push('/tenant/projects/new')}
            className="flex h-12 items-center gap-1 rounded-[10px] bg-[#08F] px-3 hover:bg-[#08F]/90"
          >
            <Plus className="h-6 w-6" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
              Tambah Project
            </span>
          </Button>
        </div>

        {/* Table */}
        <ProjectTable
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <RBAC requiredPermission="project:manage" unauthorizedPage={true}>
      <ProjectsPageContent />
    </RBAC>
  );
}
