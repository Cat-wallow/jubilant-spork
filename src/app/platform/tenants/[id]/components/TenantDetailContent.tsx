'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Edit } from 'lucide-react';
import { tenantData, statsData } from '../data/dummy-data';
import StatsCards from './StatsCards';
import RingkasanTab from './RingkasanTab';
import UsersTab from './UsersTab';
import ProjectsTab from './ProjectsTab';
import SystemsTab from './SystemsTab';

interface TenantDetailContentProps {
  tenantId: string;
}

export default function TenantDetailContent({ tenantId }: TenantDetailContentProps) {
  return (
    <div className="w-full space-y-[30px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-[10px]">
        <div className="flex flex-1 flex-col gap-[5px]">
          <p className="text-sm font-medium leading-6 text-[#707EAE]">Client &gt; Edit Client</p>
          <h1 className="text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
            Detail Tenant
          </h1>
        </div>
        <div className="flex items-start gap-[10px]">
          <Button
            variant="outline"
            className="h-12 gap-[5px] rounded-[10px] border-[#BF6A02] px-[10px] text-[#EC221F]"
          >
            <Trash2 className="h-[30px] w-[30px] text-[#BF6A02]" />
            Hapus
          </Button>
          <Button className="h-12 gap-1 rounded-[10px] bg-[#08F] px-3">
            <Edit className="h-4 w-4" />
            Edit Data Tenant
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={statsData} />

      {/* Tabs Section */}
      <div className="flex w-full flex-col gap-[30px]">
        <Tabs defaultValue="ringkasan" className="w-full">
          <TabsList className="h-[42px] w-full gap-5 rounded-[5px] bg-[#F4F7FE] p-[5px]">
            <TabsTrigger
              value="ringkasan"
              className="flex-1 rounded-[5px] px-[15px] py-[3px] text-sm font-semibold leading-[22px] text-[#757575] data-[state=active]:bg-white"
            >
              Ringkasan
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex-1 rounded-[5px] px-[15px] py-[3px] text-sm font-semibold leading-[22px] text-[#757575] data-[state=active]:bg-white"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="flex-1 rounded-[5px] px-[15px] py-[3px] text-sm font-semibold leading-[22px] text-[#757575] data-[state=active]:bg-white"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="systems"
              className="flex-1 rounded-[5px] px-[15px] py-[3px] text-sm font-semibold leading-[22px] text-[#757575] data-[state=active]:bg-white"
            >
              Systems
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ringkasan" className="mt-[30px]">
            <RingkasanTab tenant={tenantData} />
          </TabsContent>

          <TabsContent value="users" className="mt-[30px]">
            <UsersTab />
          </TabsContent>

          <TabsContent value="projects" className="mt-[30px]">
            <ProjectsTab />
          </TabsContent>

          <TabsContent value="systems" className="mt-[30px]">
            <SystemsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
