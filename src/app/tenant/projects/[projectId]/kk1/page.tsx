"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

import {
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { getTransactions } from "@/services/transaction.service";
import { DataTable } from "@/components/ui/data-table";
import { DataTableToolbar } from "./components/data-table-toolbar";
import { columns } from "./components/columns";
import { Transaction } from "@/types/transaction";

export default function KK1Page() {
  const params = useParams();
  const projectId = params.projectId as string;

  // --- STATE FOR PENDING TABLE ---
  const [paginationPending, setPaginationPending] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortingPending, setSortingPending] = useState<SortingState>([]);
  const [columnFiltersPending, setColumnFiltersPending] = useState<ColumnFiltersState>([]);
  const [columnVisibilityPending, setColumnVisibilityPending] = useState<VisibilityState>({});
  const [rowSelectionPending, setRowSelectionPending] = useState({});
  const [searchQueryPending, setSearchQueryPending] = useState("");
  const [filterStatusPending, setFilterStatusPending] = useState("all");
  const [filterTypePending, setFilterTypePending] = useState("all");
  const [debouncedSearchPending] = useDebounce(searchQueryPending, 400);

  // --- QUERY FOR PENDING TABLE ---
  const { data: dataPending, isLoading: isLoadingPending, isError: isErrorPending } = useQuery({
    queryKey: ["transactions", projectId, "pending", paginationPending, sortingPending, debouncedSearchPending, filterStatusPending, filterTypePending],
    queryFn: () => {
      const sortDescriptor = sortingPending[0];
      return getTransactions(projectId, {
        page: paginationPending.pageIndex + 1,
        limit: paginationPending.pageSize,
        search: debouncedSearchPending,
        status: filterStatusPending === "all" ? undefined : filterStatusPending,
        type: filterTypePending === "all" ? undefined : filterTypePending,
        sortBy: sortDescriptor?.id,
        sortOrder: sortDescriptor?.desc ? "desc" : "asc",
        isApproved: 'false',
      });
    },
    keepPreviousData: true,
  });

  const transactionsPending = dataPending?.data?.transactions || [];
  const pageCountPending = Math.ceil((dataPending?.data?.total || 0) / paginationPending.pageSize);

  const tablePending = useReactTable({
    data: transactionsPending,
    columns,
    pageCount: pageCountPending,
    state: {
      pagination: paginationPending,
      sorting: sortingPending,
      columnFilters: columnFiltersPending,
      columnVisibility: columnVisibilityPending,
      rowSelection: rowSelectionPending,
    },
    onPaginationChange: setPaginationPending,
    onSortingChange: setSortingPending,
    onColumnFiltersChange: setColumnFiltersPending,
    onColumnVisibilityChange: setColumnVisibilityPending,
    onRowSelectionChange: setRowSelectionPending,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  // --- STATE FOR APPROVED TABLE ---
  const [paginationApproved, setPaginationApproved] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortingApproved, setSortingApproved] = useState<SortingState>([]);
  const [columnFiltersApproved, setColumnFiltersApproved] = useState<ColumnFiltersState>([]);
  const [columnVisibilityApproved, setColumnVisibilityApproved] = useState<VisibilityState>({});
  const [rowSelectionApproved, setRowSelectionApproved] = useState({});
  const [searchQueryApproved, setSearchQueryApproved] = useState("");
  const [filterTypeApproved, setFilterTypeApproved] = useState("all");
  const [debouncedSearchApproved] = useDebounce(searchQueryApproved, 400);

  // --- QUERY FOR APPROVED TABLE ---
  const { data: dataApproved, isLoading: isLoadingApproved, isError: isErrorApproved } = useQuery({
    queryKey: ["transactions", projectId, "approved", paginationApproved, sortingApproved, debouncedSearchApproved, filterTypeApproved],
    queryFn: () => {
      const sortDescriptor = sortingApproved[0];
      return getTransactions(projectId, {
        page: paginationApproved.pageIndex + 1,
        limit: paginationApproved.pageSize,
        search: debouncedSearchApproved,
        type: filterTypeApproved === "all" ? undefined : filterTypeApproved,
        sortBy: sortDescriptor?.id,
        sortOrder: sortDescriptor?.desc ? "desc" : "asc",
        isApproved: 'true',
      });
    },
    keepPreviousData: true,
  });

  const transactionsApproved = dataApproved?.data?.transactions || [];
  const pageCountApproved = Math.ceil((dataApproved?.data?.total || 0) / paginationApproved.pageSize);

  const tableApproved = useReactTable({
    data: transactionsApproved,
    columns,
    pageCount: pageCountApproved,
    state: {
      pagination: paginationApproved,
      sorting: sortingApproved,
      columnFilters: columnFiltersApproved,
      columnVisibility: columnVisibilityApproved,
      rowSelection: rowSelectionApproved,
    },
    onPaginationChange: setPaginationApproved,
    onSortingChange: setSortingApproved,
    onColumnFiltersChange: setColumnFiltersApproved,
    onColumnVisibilityChange: setColumnVisibilityApproved,
    onRowSelectionChange: setRowSelectionApproved,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  // Calculate totals from fetched data (approximate for now)
  const totalRecorded = (dataPending?.data?.total || 0) + (dataApproved?.data?.total || 0);
  const totalValuePending = transactionsPending.reduce((sum: number, tx: Transaction) => sum + Number(tx.amount || 0), 0);
  const totalValueApproved = transactionsApproved.reduce((sum: number, tx: Transaction) => sum + Number(tx.amount || 0), 0);
  const totalValue = totalValuePending + totalValueApproved;

  return (
    <div className="flex w-full flex-col gap-[30px] ">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <div className="flex flex-col">
          <h1 className="text-[34px] font-bold ">Pencatatan Transaksi</h1>
          <p className="text-sm">Daftar transaksi yang terekam</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-[30px]">
        <Card className="flex items-center gap-4 rounded-[20px] p-5">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-muted">
            <FileText className="h-7 w-7 text-primary dark:text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-6 tracking-tight text-muted-foreground">
              Total Tercatat
            </span>
            <span className="text-2xl font-bold leading-8 tracking-tight ">
              {totalRecorded}
            </span>
            <span className="text-xs leading-5 tracking-tight text-muted-foreground">
              Telah melengkapi pencatatan transaksi
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4 rounded-[20px] p-5">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-muted">
            <FileText className="h-7 w-7 text-primary dark:text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-6 tracking-tight text-muted-foreground">
              Total Nilai
            </span>
            <span className="text-2xl font-bold leading-8 tracking-tight  w-56 overflow-hidden text-ellipsis whitespace-nowrap">
              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalValue)}
            </span>
            <span className="text-xs leading-5 tracking-tight text-muted-foreground">
              Total dari semua transaksi yang terekam
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4 rounded-[20px] p-5">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-muted">
            <FileText className="h-7 w-7 text-primary dark:text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-6 tracking-tight text-muted-foreground">
              Transaksi Pending
            </span>
            <span className="text-2xl font-bold leading-8 tracking-tight ">
              {dataPending?.data?.total || 0}
            </span>
            <span className="text-xs leading-5 tracking-tight text-muted-foreground">
              Membutuhkan review dan persetujuan
            </span>
          </div>
        </Card>
      </div>

      {/* PENDING TABLE */}
      <Card className="rounded-[20px] border p-5">
        <CardHeader className="p-0 pb-5">
          <CardTitle className="text-[22px] font-bold">Register Transaksi</CardTitle>
          <p className="text-sm leading-5 tracking-[0.25px]">
            Daftar dokumen dan form 1.0 yang menunggu pencatatan transaksi
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <DataTableToolbar
            table={tablePending}
            searchQuery={searchQueryPending}
            setSearchQuery={setSearchQueryPending}
            statusFilter={filterStatusPending}
            setStatusFilter={setFilterStatusPending}
            customFilters={[
              {
                key: "type",
                label: "Jenis Dokumen",
                value: filterTypePending,
                options: [
                  { label: "All Type", value: "all" },
                  { label: "Invoice", value: "Invoice" },
                  { label: "Kwitansi", value: "Kwitansi" },
                  { label: "Faktur Pajak", value: "Faktur Pajak" },
                ],
                onChange: setFilterTypePending,
              },
            ]}
          />
          <div className="mt-6">
            <DataTable
              table={tablePending}
              columns={columns}
              isLoading={isLoadingPending}
              isError={isErrorPending}
            />
          </div>
        </CardContent>
      </Card>

      {/* APPROVED TABLE */}
      <Card className="rounded-[20px] border p-5">
        <CardHeader className="p-0 pb-5">
          <CardTitle className="text-[22px] font-bold">Transaction Recorded</CardTitle>
          <p className="text-sm leading-5 tracking-[0.25px]">
            Daftar transaksi tercatat (Approved)
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <DataTableToolbar
            table={tableApproved}
            searchQuery={searchQueryApproved}
            setSearchQuery={setSearchQueryApproved}
            // No status filter for approved table as it's implicit
            customFilters={[
              {
                key: "type",
                label: "Jenis Dokumen",
                value: filterTypeApproved,
                options: [
                  { label: "All Type", value: "all" },
                  { label: "Invoice", value: "Invoice" },
                  { label: "Kwitansi", value: "Kwitansi" },
                  { label: "Faktur Pajak", value: "Faktur Pajak" },
                ],
                onChange: setFilterTypeApproved,
              },
            ]}
          />
          <div className="mt-6">
            <DataTable
              table={tableApproved}
              columns={columns}
              isLoading={isLoadingApproved}
              isError={isErrorApproved}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
