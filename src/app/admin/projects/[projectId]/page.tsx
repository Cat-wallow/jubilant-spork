'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  FileText, 
  FolderOpen,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { DocumentsTab } from './components/DocumentsTab';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { tenant, user } = useAuth();
  const projectId = params.projectId as string;
  const [activeTab, setActiveTab] = useState('form-1');

  // TODO: Replace with real project data from API
  const project = {
    id: projectId,
    code: 'PRJ-FORM1-DEMO',
    name: 'Form1 Demo Project',
    clientName: 'Client Form1 Demo',
    status: 'active',
    currentKK: 'FORM_1.0',
    fiscalYear: 2025,
  };

  const isLoading = false;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/admin/clients" className="hover:text-primary">
            Projects
          </Link>
          <span>/</span>
          <span>{project.code}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {project.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              {project.clientName} • Tahun Fiskal {project.fiscalYear}
            </p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50/50 border-none shadow-sm dark:bg-blue-950/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-blue-900/30">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Total Dokumen
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  --
                </span>
                <span className="text-xs text-muted-foreground">dokumen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50/50 border-none shadow-sm dark:bg-green-950/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-green-900/30">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Dokumen Lengkap
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  --
                </span>
                <span className="text-xs text-muted-foreground">dari -- wajib</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50/50 border-none shadow-sm dark:bg-amber-950/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-amber-900/30">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Status Kertas Kerja
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {project.currentKK}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none space-x-6 mb-6 overflow-x-auto">
          {[
            { value: 'form-1', label: 'Form 1.0 - Dokumen', icon: FolderOpen },
            { value: 'kk-1', label: 'KK 1.0 - Transaksi', icon: FileText },
            { value: 'kk-2', label: 'KK 2.0 - Jurnal', icon: FileText },
            { value: 'kk-3', label: 'KK 3.0 - Buku Besar', icon: FileText },
            { value: 'kk-4', label: 'KK 4.0 - Neraca Saldo', icon: FileText },
            { value: 'kk-5', label: 'KK 5.0 - Laporan', icon: FileText },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 data-[state=active]:bg-transparent font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Form 1.0 - Documents Tab */}
        <TabsContent value="form-1" className="space-y-6">
          <DocumentsTab 
            projectId={projectId} 
            tenantId={tenant?.id || ''} 
            userId={user?.id || ''} 
          />
        </TabsContent>

        {/* Placeholder tabs for KK 1.0 - 5.0 */}
        {['kk-1', 'kk-2', 'kk-3', 'kk-4', 'kk-5'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-6">
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">
                  {tab.toUpperCase()} - Coming Soon
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Modul ini sedang dalam pengembangan
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
