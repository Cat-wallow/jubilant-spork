'use client';

import { useState } from 'react';
import { MoreVertical, Edit, FilePenLine, PenOff } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { revertApproval } from '@/services/transaction.service';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { TransactionStatus } from '@/types/transaction';
import RBAC from '@/components/rbac/RBAC';

interface Kk1ActionsMenuProps {
  data: any; // DocumentWithTransaction
}

export function Kk1ActionsMenu({ data }: Kk1ActionsMenuProps) {
  const [isPullApprovalOpen, setIsPullApprovalOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;
  const queryClient = useQueryClient();

  const transaction = data.transaction;
  const status = transaction?.status || TransactionStatus.NOT_STARTED;
  const transactionId = transaction?.id;
  const documentId = data.id;

  const revertMutation = useMutation({
    mutationFn: (id: string) => revertApproval(id),
    onSuccess: () => {
      toast.success("Approval pulled successfully.");
      setIsPullApprovalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["documentsForKK1", projectId] });
    },
    onError: (error: any) => {
      toast.error("Failed to pull approval.");
    }
  });

  const handlePullApproval = () => {
    if (transactionId) {
        revertMutation.mutate(transactionId);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className=" h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {(status === TransactionStatus.NOT_STARTED) && (
            <DropdownMenuItem
              onSelect={() => router.push(`/tenant/projects/${projectId}/kk1/${documentId}/add`)}
            >
              <Edit className="mr-2 h-4 w-4"/>
              Tambah transaksi
            </DropdownMenuItem>
          )}
          {(status === TransactionStatus.IN_PROGRESS) && (
            <DropdownMenuItem
              onSelect={() => router.push(`/tenant/projects/${projectId}/kk1/${documentId}/add`)}
            >
              <Edit className="mr-2 h-4 w-4"/>
              Lanjutkan transaksi
            </DropdownMenuItem>
          )}

          {(status === TransactionStatus.SUBMITTED) && (
            <RBAC requiredPermission={"kk1:approve"}>
              <DropdownMenuItem onClick={() => router.push(`/tenant/projects/${projectId}/kk1/${documentId}/add`)}>
                <FilePenLine className="mr-2 h-4 w-4" />
                Lihat Transaksi
              </DropdownMenuItem>
            </RBAC>
          )}

          {(status === TransactionStatus.LEADER_APPROVED || status === TransactionStatus.PMO_APPROVED) && (
            <DropdownMenuItem onSelect={() => setIsPullApprovalOpen(true)}>
              <PenOff className="mr-2 h-4 w-4" />
              Tarik Approval
            </DropdownMenuItem>
          )}

        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isPullApprovalOpen} onOpenChange={setIsPullApprovalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tarik Approval</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menarik approval transaksi ini? Anggota perlu mengisi ini kembali nanti.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsPullApprovalOpen(false)}>
              Batal
            </Button>
            <Button
              type="submit"
              variant="destructive"
              onClick={handlePullApproval}
              disabled={revertMutation.isPending}
            >
              {revertMutation.isPending ? 'Memproses...' : 'Tarik Approval'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
