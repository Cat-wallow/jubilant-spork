'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useClient, useDeleteClient } from '@/hooks/useClients';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Trash2,
  Edit,
  Building2,
  FileText,
  Activity,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { tenant } = useAuth();
  const id = params.id as string;
  const deleteClientMutation = useDeleteClient();

  const { data: client, isLoading, error } = useClient(tenant.id, id);

  if (isLoading) {
    return <div className="p-6 space-y-6">
      <Skeleton className="h-12 w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>;
  }

  if (error || !client) {
    return <div className="p-6 text-center">
      <h3 className="text-lg font-medium text-red-600">Error loading client details</h3>
      <Button variant="outline" onClick={() => router.back()} className="mt-4">
        Go Back
      </Button>
    </div>;
  }

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus klien ini?')) {
      deleteClientMutation.mutate(
        { tenantId: tenant.id, id },
        {
          onSuccess: () => {
            router.push('/clients');
          },
        }
      );
    }
  };

  // Format Date Helper
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Mock Projects Data (Sesuai Screenshot)
  const projects = [
    {
      id: 'PRJ-25-SIP002',
      client_name: 'PT. SUKSES INDO PRAMATA',
      team_lead: 'Budi Dharma',
      milestones: [
        { name: 'KK1', status: 'done', label: 'Done' },
        { name: 'KK2', status: 'done', label: 'Done' },
        { name: 'KK3', status: 'in_progress', label: 'In Progress' },
        { name: 'KK4', status: 'not_started', label: 'Not started' },
        { name: 'KK5', status: 'not_started', label: 'Not started' },
      ],
      next_deadline: 'KK 3.0 Completion (2025-09-20)',
      progress: 38.5,
    },
    {
      id: 'PRJ-25-SIP003',
      client_name: 'PT. SUKSES INDO PRAMATA',
      team_lead: 'Budi Dharma',
      milestones: [
        { name: 'KK1', status: 'done', label: 'Done' },
        { name: 'KK2', status: 'done', label: 'Done' },
        { name: 'KK3', status: 'in_progress', label: 'In Progress' },
        { name: 'KK4', status: 'not_started', label: 'Not started' },
        { name: 'KK5', status: 'not_started', label: 'Not started' },
      ],
      next_deadline: 'KK 3.0 Completion (2025-09-20)',
      progress: 38.5,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/clients" className="hover:text-primary">Client</Link>
          <span>/</span>
          <span>Edit Client</span>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Detail Klien</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:hover:bg-red-950/50 dark:text-red-400"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
              asChild
            >
              <Link href={`/clients/${id}/edit`}>
                Edit Data Klien
              </Link>
            </Button>
          </div>
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
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Project Aktif</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">5</span>
                <span className="text-xs text-muted-foreground">dari 8 total</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/50 border-none shadow-sm dark:bg-blue-950/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-blue-900/30">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Pajak aktif</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">{client.applicable_taxes?.length || 0}</span>
                <span className="text-xs text-muted-foreground">jenis pajak</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/50 border-none shadow-sm dark:bg-blue-950/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-blue-900/30">
              <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Kelengkapan Dokumen</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">100%</span>
                <span className="text-xs text-muted-foreground">4 dokumen wajib terpenuhi</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none space-x-6 mb-6 overflow-x-auto">
          {[
            { value: 'summary', label: 'Ringkasan' },
            { value: 'identity', label: 'Identitas Perusahaan' },
            { value: 'classification', label: 'Klasifikasi Usaha & Pajak' },
            { value: 'contacts', label: 'Kontak & Cabang' },
            { value: 'accounting', label: 'Preferensi Akuntansi' },
            { value: 'documents', label: 'Dokumen Legal' },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 data-[state=active]:bg-transparent font-medium text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Info Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ringkasan Informasi Perusahaan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Ringkasan Informasi Perusahaan</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-y-6 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Nama Perusahaan:</p>
                  <p className="font-medium">{client.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Skala Bisnis:</p>
                  <p className="font-medium capitalize">{client.business_scale || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email Perusahaan:</p>
                  <p className="font-medium">{client.email || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Telepon:</p>
                  <p className="font-medium">{client.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Bergabung Sajak:</p>
                  <p className="font-medium">{formatDate(client.created_at)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Alamat:</p>
                  <p className="font-medium">{client.address || '-'}</p>
                </div>
              </CardContent>
            </Card>

            {/* Identitas Perpajakan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Identitas Perpajakan</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-y-6 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Tipe WP:</p>
                  <p className="font-medium capitalize">{client.taxpayer_type || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Periode Lapor:</p>
                  <p className="font-medium">Bulanan</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Zona Waktu:</p>
                  <p className="font-medium">Asia/Jakarta</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Terdaftar:</p>
                  <p className="font-medium">{formatDate(client.created_at)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground mb-2">Jenis Pajak Aktif:</p>
                  <div className="flex flex-wrap gap-2">
                    {client.applicable_taxes?.length ? (
                      client.applicable_taxes.map((tax) => (
                        <Badge key={tax} variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                          {tax}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground italic">Tidak ada pajak aktif</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Proyek Aktif Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Proyek Aktif</h2>
                <p className="text-sm text-muted-foreground">Realtime status berbagai proyek dengan milestone board</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Project
                </Button>
              </div>
            </div>

            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6">
                    {/* Top Row: ID and Name */}
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100">{project.id}</h3>
                      </div>
                      <p className="text-xs font-bold text-blue-900 dark:text-blue-300 mt-1 uppercase">{client.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">Team: <span className="font-medium text-slate-900 dark:text-slate-200">{project.team_lead}</span></p>
                    </div>

                    {/* Milestones */}
                    <div className="flex flex-wrap gap-2">
                      {project.milestones.map((ms) => (
                        <Badge
                          key={ms.name}
                          variant="secondary"
                          className={`
                            ${ms.status === 'done' ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50' : ''}
                            ${ms.status === 'in_progress' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50' : ''}
                            ${ms.status === 'not_started' ? 'bg-gray-200 text-gray-500 hover:bg-gray-300 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700' : ''}
                            font-normal px-3 py-1
                          `}
                        >
                          {ms.name}: {ms.label}
                        </Badge>
                      ))}
                    </div>

                    {/* Deadline and Progress */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-300">
                        <Calendar className="h-4 w-4" />
                        Next: {project.next_deadline}
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="flex gap-4 items-center">
                          <Progress value={project.progress} className="h-2 bg-blue-100 dark:bg-blue-950" />
                          <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
                            <Eye className="h-3 w-3" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="identity">
            <div className="p-8 text-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                Detail Identitas Perusahaan akan ditampilkan di sini
            </div>
        </TabsContent>
        <TabsContent value="classification">
            <div className="p-8 text-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                Detail Klasifikasi Usaha & Pajak akan ditampilkan di sini
            </div>
        </TabsContent>
        <TabsContent value="contacts">
            <div className="p-8 text-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                Kontak & Cabang akan ditampilkan di sini
            </div>
        </TabsContent>
        <TabsContent value="accounting">
            <div className="p-8 text-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                Preferensi Akuntansi akan ditampilkan di sini
            </div>
        </TabsContent>
        <TabsContent value="documents">
            <div className="p-8 text-center text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                Dokumen Legal akan ditampilkan di sini
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
