'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, UserX, UserCheck } from 'lucide-react';
import RingkasanTab from './RingkasanTab';
import UsersTab from './UsersTab';
import ProjectsTab from './ProjectsTab';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToggleTenantStatus } from '@/hooks/usePlatformTenants';
import { useState } from 'react';
import { toast } from 'sonner';
import { Tenant } from '@/types/tenant';
import { useQueryClient } from '@tanstack/react-query';

interface TenantDetailContentProps {
  tenant: Tenant;
}

export default function TenantDetailContent({ tenant }: TenantDetailContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const toggleStatusMutation = useToggleTenantStatus();

  const handleToggleStatus = async () => {
    await toggleStatusMutation.mutateAsync(tenant.id, {
      onSuccess: () => {
        toast.success(
          `Tenant ${tenant.name} berhasil di${
            tenant.status === 'active' ? 'nonaktifkan' : 'aktifkan'
          }.`,
        );
        queryClient.invalidateQueries({ queryKey: ['tenant', tenant.id] });
        setIsModalOpen(false);
      },
      onError: () => {
        toast.error('Gagal memperbarui status tenant.');
      },
    });
  };

  const isDeactivating = tenant.status === 'active';

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-[10px]">
        <div className="flex flex-1 items-center gap-4">
          {/*{tenant.logo_url && (
            <img
              src={tenant.logo_url}
              alt={`${tenant.name} logo`}
              className="h-16 w-16 rounded-md object-contain"
            />
          )}*/}
          <div className="flex flex-col gap-[5px]">
            <h1 className="capitalize text-3xl font-semibold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
              {tenant.name}
            </h1>
          </div>
        </div>
        <div className="flex items-start gap-[10px]">
          {tenant.status === 'active' ? (
            <Button variant="destructive" onClick={() => setIsModalOpen(true)}>
              <UserX className="mr-2 h-4 w-4" />
              Nonaktifkan
            </Button>
          ) : (
            <Button variant="third" onClick={() => setIsModalOpen(true)}>
              <UserCheck className="mr-2 h-4 w-4" />
              Aktifkan
            </Button>
          )}

          <Button onClick={() => router.push(`/platform/tenants/${tenant.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Data Tenant
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex w-full flex-col gap-[30px]">
        <Tabs defaultValue="ringkasan" className="w-full">
          <TabsList className=" w-full bg-card ">
            <TabsTrigger value="ringkasan" className="flex-1">
              Ringkasan
            </TabsTrigger>
            <TabsTrigger value="users" className="flex-1">
              Users
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-1">
              Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ringkasan">
            <RingkasanTab tenant={tenant} />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab tenantId={tenant.id} />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>
        </Tabs>
      </div>
      {/* Activate/Deactivate Confirmation Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isDeactivating ? 'Nonaktifkan Tenant' : 'Aktifkan Tenant'}
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin {isDeactivating ? 'menonaktifkan' : 'mengaktifkan'} tenant{' '}
              <strong>{tenant.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button
              type="submit"
              variant={isDeactivating ? 'destructive' : 'default'}
              onClick={handleToggleStatus}
              disabled={toggleStatusMutation.isPending}
            >
              {toggleStatusMutation.isPending
                ? isDeactivating
                  ? 'Menonaktifkan...'
                  : 'Mengaktifkan...'
                : isDeactivating
                  ? 'Nonaktifkan'
                  : 'Aktifkan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
