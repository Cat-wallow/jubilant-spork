'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BundleList } from '@/components/features/project/BundleList';
import { DocumentList } from '@/components/features/project/DocumentList';
import { FileText, FolderOpen } from 'lucide-react';

export default function FormOnePage() {
  const params = useParams();
  const { tenant, user } = useAuth();
  
  const projectId = params.projectId as string;
  const tenantId = tenant?.id || '';
  const userId = user?.id || '';
  const userName = user?.name || '';

  const [activeTab, setActiveTab] = useState('documents');

  if (!projectId || !tenantId) {
    return null; // or loading spinner
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
          Form 1.0 - Lembar Pengendalian Arus Dokumen
        </h1>
        <p className="text-sm text-muted-foreground">
          Kelola dokumen dan bundle untuk proyek ini.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Daftar Dokumen
          </TabsTrigger>
          <TabsTrigger value="bundles" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Daftar Bundle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <DocumentList 
            projectId={projectId} 
            tenantId={tenantId} 
            userId={userId} 
          />
        </TabsContent>

        <TabsContent value="bundles" className="space-y-4">
          <BundleList 
            projectId={projectId} 
            tenantId={tenantId} 
            userId={userId}
            userName={userName}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
