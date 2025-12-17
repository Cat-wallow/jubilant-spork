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

import { getDocumentsForKK1 } from "@/services/document.service";
import { DataTable } from "@/components/ui/data-table";
import { DataTableToolbar } from "./components/data-table-toolbar";
import { columnsAwaiting } from "./components/columns-awaiting";
import { columnsApproved } from "./components/columns-approved";
import { TransactionStatus } from "@/types/transaction"; 

interface DocumentWithTransaction {
  id: string;
  original_filename: string;
  nomor_dokumen: string;
  document_date: string;
  // ... other document fields
  transaction?: {
    id: string;
    transaction_number: string;
    description: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
    // ... other transaction fields
  } | null;
}

export default function KK1Page() {
  const params = useParams();
  const projectId = params.projectId as string;

  // --- STATE FOR "DOCUMENTS AWAITING TRANSACTION" TABLE ---
  const [paginationAwaiting, setPaginationAwaiting] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortingAwaiting, setSortingAwaiting] = useState<SortingState>([]);
  const [columnFiltersAwaiting, setColumnFiltersAwaiting] = useState<ColumnFiltersState>([]);
  const [columnVisibilityAwaiting, setColumnVisibilityAwaiting] = useState<VisibilityState>({});
  const [rowSelectionAwaiting, setRowSelectionAwaiting] = useState({});
  const [searchQueryAwaiting, setSearchQueryAwaiting] = useState("");
  const [filterDocumentStatusAwaiting, setFilterDocumentStatusAwaiting] = useState("all");
  const [debouncedSearchAwaiting] = useDebounce(searchQueryAwaiting, 400);

  // --- QUERY FOR "DOCUMENTS AWAITING TRANSACTION" TABLE (isApproved: false) ---
  const { data: dataAwaiting, isLoading: isLoadingAwaiting, isError: isErrorAwaiting } = useQuery({
    queryKey: ["documentsForKK1", projectId, "awaiting", paginationAwaiting, sortingAwaiting, debouncedSearchAwaiting, filterDocumentStatusAwaiting],
    queryFn: () => {
      const sortDescriptor = sortingAwaiting[0];
      return getDocumentsForKK1(projectId, {
        page: paginationAwaiting.pageIndex + 1,
        limit: paginationAwaiting.pageSize,
        search: debouncedSearchAwaiting,
        documentStatus: filterDocumentStatusAwaiting === "all" ? undefined : filterDocumentStatusAwaiting,
        isApproved: 'false', 
        sortBy: sortDescriptor?.id,
        sortOrder: sortDescriptor?.desc ? "desc" : "asc",
      });
    },
    staleTime: 1000 * 60 * 5, 
  });

  const documentsAwaiting = (dataAwaiting?.data?.documents || []) as DocumentWithTransaction[];
  const pageCountAwaiting = Math.ceil((dataAwaiting?.data?.total || 0) / paginationAwaiting.pageSize);

  const tableAwaiting = useReactTable({
    data: documentsAwaiting,
    columns: columnsAwaiting,
    pageCount: pageCountAwaiting,
    state: {
      pagination: paginationAwaiting,
      sorting: sortingAwaiting,
      columnFilters: columnFiltersAwaiting,
      columnVisibility: columnVisibilityAwaiting,
      rowSelection: rowSelectionAwaiting,
    },
    onPaginationChange: setPaginationAwaiting,
    onSortingChange: setSortingAwaiting,
    onColumnFiltersChange: setColumnFiltersAwaiting,
    onColumnVisibilityChange: setColumnVisibilityAwaiting,
    onRowSelectionChange: setRowSelectionAwaiting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  // --- STATE FOR "APPROVED TRANSACTIONS" TABLE ---
  const [paginationApproved, setPaginationApproved] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortingApproved, setSortingApproved] = useState<SortingState>([]);
  const [columnFiltersApproved, setColumnFiltersApproved] = useState<ColumnFiltersState>([]);
  const [columnVisibilityApproved, setColumnVisibilityApproved] = useState<VisibilityState>({});
  const [rowSelectionApproved, setRowSelectionApproved] = useState({});
  const [searchQueryApproved, setSearchQueryApproved] = useState("");
  const [filterDocumentStatusApproved, setFilterDocumentStatusApproved] = useState("all");
  const [debouncedSearchApproved] = useDebounce(searchQueryApproved, 400);

  // --- QUERY FOR "APPROVED TRANSACTIONS" TABLE (isApproved: true) ---
  const { data: dataApproved, isLoading: isLoadingApproved, isError: isErrorApproved } = useQuery({
    queryKey: ["documentsForKK1", projectId, "approved", paginationApproved, sortingApproved, debouncedSearchApproved, filterDocumentStatusApproved],
    queryFn: () => {
      const sortDescriptor = sortingApproved[0];
      return getDocumentsForKK1(projectId, {
        page: paginationApproved.pageIndex + 1,
        limit: paginationApproved.pageSize,
        search: debouncedSearchApproved,
        documentStatus: filterDocumentStatusApproved === "all" ? undefined : filterDocumentStatusApproved,
        isApproved: 'true', 
        sortBy: sortDescriptor?.id,
        sortOrder: sortDescriptor?.desc ? "desc" : "asc",
      });
    },
    keepPreviousData: true,
  });

  const documentsApproved = (dataApproved?.data?.documents || []) as DocumentWithTransaction[];
  const pageCountApproved = Math.ceil((dataApproved?.data?.total || 0) / paginationApproved.pageSize);

  const tableApproved = useReactTable({
    data: documentsApproved,
    columns: columnsApproved,
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

  // Calculate totals from fetched data
  const totalRecorded = (dataApproved?.data?.total || 0);
  const totalValue =
    documentsAwaiting.reduce((sum, doc) => sum + Number(doc.transaction?.amount || 0), 0) +
    documentsApproved.reduce((sum, doc) => sum + Number(doc.transaction?.amount || 0), 0);
  const pendingTransactionsCount = dataAwaiting?.data?.total || 0; 

  return (
    <div className="flex w-full flex-col gap-7 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold ">Pencatatan Transaksi</h1>
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
            <span className="text-sm font-bold   ">
              Total Tercatat
            </span>
            <span className="text-2xl font-bold   ">
              {totalRecorded}
            </span>
            <span className="text-xs leading-5  text-muted-foreground">
              Telah melengkapi pencatatan transaksi
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4 rounded-[20px] p-5">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-muted">
            <FileText className="h-7 w-7 text-primary dark:text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold ">
              Total Nilai Transaksi
            </span>
            <span className="text-2xl font-bold    w-56 overflow-hidden text-ellipsis whitespace-nowrap">
              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalValue)}
            </span>
            <span className="text-xs leading-5  text-muted-foreground">
              Total dari semua transaksi yang terekam
            </span>
          </div>
        </Card>

        <Card className="flex items-center gap-4 rounded-[20px] p-5">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-muted">
            <FileText className="h-7 w-7 text-primary dark:text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold ">
              Dokumen Menunggu Transaksi
            </span>
            <span className="text-2xl font-bold   ">
              {pendingTransactionsCount}
            </span>
            <span className="text-xs leading-5  text-muted-foreground">
              Membutuhkan pembuatan transaksi
            </span>
          </div>
        </Card>
      </div>

      {/* TABLE: DOCUMENTS AWAITING TRANSACTION CREATION */}
      <Card className="rounded-[20px] border p-5">
        <CardHeader className="p-0 pb-5">
          <CardTitle className="text-[22px] font-bold">Dokumen Menunggu Transaksi</CardTitle>
          <p className="text-sm ">
            Daftar dokumen yang belum memiliki pencatatan transaksi
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <DataTableToolbar
            table={tableAwaiting}
            searchQuery={searchQueryAwaiting}
            setSearchQuery={setSearchQueryAwaiting}
            statusFilter={filterDocumentStatusAwaiting}
            setStatusFilter={setFilterDocumentStatusAwaiting}
            customFilters={[
              {
                key: "type",
                label: "Jenis Dokumen", 
                value: "all", 
                options: [
                  { label: "All Type", value: "all" },
                ],
                onChange: () => {}, 
              },
            ]}
          />
          <div className="mt-6">
            <DataTable
              table={tableAwaiting}
              columns={columnsAwaiting}
              isLoading={isLoadingAwaiting}
              isError={isErrorAwaiting}
            />
          </div>
        </CardContent>
      </Card>

      {/* TABLE: LEADER APPROVED TRANSACTIONS */}
      <Card className="rounded-[20px] border p-5">
        <CardHeader className="p-0 pb-5">
          <CardTitle className="text-[22px] font-bold">Transaksi Disetujui Leader</CardTitle>
          <p className="text-sm ">
            Daftar transaksi yang telah disetujui oleh Leader
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <DataTableToolbar
            table={tableApproved}
            searchQuery={searchQueryApproved}
            setSearchQuery={setSearchQueryApproved}
            statusFilter={filterDocumentStatusApproved}
            setStatusFilter={setFilterDocumentStatusApproved}
            customFilters={[
              {
                key: "type",
                label: "Jenis Dokumen",
                value: "all",
                options: [
                  { label: "All Type", value: "all" },
                ],
                onChange: () => {},
              },
            ]}
          />
          <div className="mt-6">
            <DataTable
              table={tableApproved}
              columns={columnsApproved}
              isLoading={isLoadingApproved}
              isError={isErrorApproved}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
