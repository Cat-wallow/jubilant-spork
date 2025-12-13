'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useClient } from '@/hooks/useClients';
import { useClientCoa, useDeleteCoa, ClientCoa, AccountType } from '@/hooks/useClientCoa';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { AddAccountModal } from '@/app/admin/clients/[id]/accounts/AddAccountModal';

const typeColors: Record<AccountType, string> = {
  Asset: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Liability: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Equity: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Revenue: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Expense: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function ClientAccountsPage() {
  const params = useParams();
  const { tenant } = useAuth();
  const { toast } = useToast();
  const id = params.id as string;

  const { data: client, isLoading: clientLoading } = useClient(tenant?.id || '', id);
  const deleteCoaMutation = useDeleteCoa();

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: accounts = [], isLoading: accountsLoading } = useClientCoa(
    tenant?.id || '',
    id,
    {
      account_type: typeFilter !== 'all' ? typeFilter : undefined,
      search: debouncedSearch || undefined,
    },
  );

  const totalPages = Math.ceil(accounts.length / pageSize) || 1;
  const paginatedAccounts = accounts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleDelete = async (account: ClientCoa) => {
    if (!confirm(`Hapus akun "${account.account_number} - ${account.account_name}"?`)) return;

    try {
      await deleteCoaMutation.mutateAsync({
        tenantId: tenant.id,
        clientId: id,
        coaId: account.id,
      });
      toast({
        title: 'Berhasil',
        description: 'Akun berhasil dihapus',
      });
    } catch (error: any) {
      toast({
        title: 'Gagal menghapus',
        description: error?.response?.data?.message || 'Terjadi kesalahan',
        variant: 'destructive',
      });
    }
  };

  if (clientLoading || accountsLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/tenant/clients" className="hover:text-primary">
          Client
        </Link>
        <span>/</span>
        <Link href={`/tenant/clients/${id}`} className="hover:text-primary">
          {client?.name || 'Detail Client'}
        </Link>
        <span>/</span>
        <span>Kelola Akun</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Kelola Akun
          </h1>
          <p className="text-muted-foreground mt-1">{client?.name}</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-semibold text-blue-900 dark:text-blue-100">
              Chart of Accounts
            </CardTitle>
            <CardDescription>Daftar akun milik Client</CardDescription>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 dark:text-white"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Akun
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={String(pageSize)} onValueChange={(val) => setPageSize(Number(val))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari dokumen"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Type</SelectItem>
                <SelectItem value="Asset">Asset</SelectItem>
                <SelectItem value="Liability">Liability</SelectItem>
                <SelectItem value="Equity">Equity</SelectItem>
                <SelectItem value="Revenue">Revenue</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                  <TableHead className="font-semibold">Account No</TableHead>
                  <TableHead className="font-semibold">Account Name</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Parent</TableHead>
                  <TableHead className="font-semibold">Level</TableHead>
                  <TableHead className="font-semibold">Normal Balance</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAccounts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Tidak ada akun ditemukan
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedAccounts.map((account) => (
                    <TableRow key={account.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <TableCell className="font-medium">{account.account_number}</TableCell>
                      <TableCell className="font-medium">{account.account_name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={typeColors[account.account_type]}>
                          {account.account_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{account.parent_code ?? '-'}</TableCell>
                      <TableCell>{account.level ?? '-'}</TableCell>
                      <TableCell className="capitalize">{account.normal_balance}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            account.is_active
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                          }
                        >
                          {account.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(account)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing
              {' '}
              {(currentPage - 1) * pageSize + 1}
              -
              {Math.min(currentPage * pageSize, accounts.length)}
              {' '}
              of
              {' '}
              {accounts.length}
              {' '}
              akun
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    className={currentPage === pageNum ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddAccountModal
        tenantId={tenant.id}
        clientId={id}
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  );
}
