'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useClientHistory, ClientHistoryItem } from '@/hooks/useClientHistory';
import { Button } from '@/components/ui/button';
import { ArrowLeft, History, FileClock, Trash2, UserCheck, UserX, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ClientHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const { tenant } = useAuth();
  const id = params.id as string;

  const { data: history, isLoading } = useClientHistory(tenant.id, id);

  const getActionBadge = (action: ClientHistoryItem['action']) => {
    switch (action) {
      case 'CREATED':
        return <Badge variant="default" className="bg-green-600">Dibuat</Badge>;
      case 'UPDATED':
        return <Badge variant="secondary">Diperbarui</Badge>;
      case 'TERMINATED':
        return <Badge variant="destructive">Diputus</Badge>;
      case 'ACTIVATED':
        return <Badge variant="default" className="bg-blue-600">Diaktifkan</Badge>;
      case 'SOFT_DELETED':
        return <Badge variant="destructive" className="bg-red-800">Dihapus (Soft)</Badge>;
      case 'RESTORED':
        return <Badge variant="outline" className="border-green-600 text-green-600">Dipulihkan</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getActionIcon = (action: ClientHistoryItem['action']) => {
    switch (action) {
      case 'CREATED':
        return <FileClock className="h-4 w-4 text-green-600" />;
      case 'UPDATED':
        return <History className="h-4 w-4 text-gray-600" />;
      case 'TERMINATED':
        return <UserX className="h-4 w-4 text-red-600" />;
      case 'ACTIVATED':
        return <UserCheck className="h-4 w-4 text-blue-600" />;
      case 'SOFT_DELETED':
        return <Trash2 className="h-4 w-4 text-red-800" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Riwayat Perubahan Klien</h1>
          <p className="text-muted-foreground">
            Log aktivitas dan perubahan data klien.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Riwayat</CardTitle>
          <CardDescription>
            Menampilkan seluruh aktivitas perubahan pada data klien ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <Skeleton key={i} className="h-12 w-full" />
               ))}
             </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead>Oleh</TableHead>
                    <TableHead>Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="whitespace-nowrap font-medium">
                        {format(new Date(item.timestamp), 'dd MMM yyyy HH:mm', { locale: idLocale })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(item.action)}
                          {getActionBadge(item.action)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.performed_by}</span>
                          {item.performed_by_role && (
                            <span className="text-xs text-muted-foreground">{item.performed_by_role}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <span className="font-medium">{item.details}</span>
                          {item.field && (
                            <div className="text-xs text-muted-foreground">
                              <span className="font-semibold">{item.field}:</span>{' '}
                              <span className="line-through text-red-400">{item.old_value || '-'}</span>
                              {' -> '}
                              <span className="text-green-600">{item.new_value || '-'}</span>
                            </div>
                          )}
                          
                          {/* Affected Projects Accordion */}
                          {item.affected_projects && item.affected_projects.length > 0 && (
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value={`item-${item.id}`} className="border-none">
                                <AccordionTrigger className="py-1 text-sm text-muted-foreground hover:text-foreground hover:no-underline">
                                  Lihat {item.affected_projects.length} project terdampak
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="mt-2 space-y-2 pl-2 border-l-2 border-slate-200 dark:border-slate-800">
                                    <p className="text-xs text-muted-foreground mb-2">
                                      {item.action === 'TERMINATED' 
                                        ? 'Project berikut otomatis ditangguhkan (ON_HOLD) karena kerjasama klien diputus.' 
                                        : item.action === 'SOFT_DELETED'
                                          ? 'Project berikut otomatis dihapus (SOFT_DELETE) karena klien dihapus.'
                                          : 'Project terdampak:'}
                                    </p>
                                    {item.affected_projects.map((project) => (
                                      <div key={project.id} className="flex items-center justify-between text-xs p-2 rounded bg-slate-50 dark:bg-slate-900">
                                        <div>
                                          <p className="font-medium">{project.name}</p>
                                          <p className="text-muted-foreground">{project.id}</p>
                                        </div>
                                        <Badge variant="outline" className="text-[10px] h-5">
                                          {project.status}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!history || history.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        Tidak ada riwayat perubahan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
