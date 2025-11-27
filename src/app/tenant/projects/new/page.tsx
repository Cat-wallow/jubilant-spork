'use client';

import RBAC from '@/components/rbac/RBAC';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DetailProjectTab from './components/DetailProjectTab';
import ProjectSettingsTab from './components/ProjectSettingsTab';

function NewProjectPageContent() {
  const [published, setPublished] = useState(false);

  return (
    <div className="w-full space-y-[30px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-2.5 self-stretch">
        <div className="flex flex-1 flex-col gap-[5px]">
          <p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">
            Project {'>'} Add Project
          </p>
          <h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
            Tambah Project Baru
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
            Publish
          </span>
          <button
            onClick={() => setPublished(!published)}
            className="relative h-6 w-11 rounded-full bg-[#E2E8F0] transition-colors"
          >
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${published ? 'translate-x-5' : 'translate-x-0.5'}`}
            />
          </button>
        </div>
        <Button className="flex h-12 items-center gap-1 rounded-[10px] bg-[#08F] px-3 hover:bg-[#08F]/90">
          <Plus className="h-6 w-6" />
          <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
            Buat Project
          </span>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="detail" className="w-full">
        <TabsList className="mb-[30px] h-[42px] w-full justify-start gap-5 rounded-[5px] bg-[#F4F7FE] p-[5px]">
          <TabsTrigger
            value="detail"
            className="flex-1 rounded-[5px] px-[15px] py-[3px] font-public-sans text-sm font-semibold leading-[22px] data-[state=active]:bg-white data-[state=active]:text-[#757575] data-[state=inactive]:text-[#757575]"
          >
            Detail Project
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex-1 rounded-[5px] px-[15px] py-[3px] font-public-sans text-sm font-semibold leading-[22px] data-[state=active]:bg-white data-[state=active]:text-[#757575] data-[state=inactive]:text-[#757575]"
          >
            Project Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="detail" className="mt-0">
          <DetailProjectTab />
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <ProjectSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function NewProjectPage() {
  return (
    <RBAC requiredPermission="project:manage" unauthorizedPage={true}>
      <NewProjectPageContent />
    </RBAC>
  );
}
