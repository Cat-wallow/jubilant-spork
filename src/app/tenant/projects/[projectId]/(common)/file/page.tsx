"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Import useMutation and useQueryClient
import { useDebounce } from "use-debounce";

import { DataTable } from "@/components/ui/data-table";
import { DataTableToolbar } from "./components/data-table-toolbar";
import { columns, ProjectFile } from "./components/columns";
import { getProjectFiles, uploadProjectFile } from "@/services/project-file.service"; // Import uploadProjectFile
import { FileUploader } from "@/components/shared/FileUploader"; // Import FileUploader
import { toast } from "sonner"; // Assuming sonner is the preferred toast library

export default function FilePage() {
  const params = useParams();
  const queryClient = useQueryClient(); // Initialize queryClient
  const projectId = params.projectId as string;

  // Table state
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");
  const debouncedSearch = useDebounce(searchQuery, 400);

  // Fetch project files
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "projectFiles",
      projectId,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
      debouncedSearch,
      fileTypeFilter,
    ],
    queryFn: async () => {
      const sortDescriptor = sorting[0];

      const queryParams = {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: String(searchQuery || ''), // Ensure search is a string
        fileType: fileTypeFilter === "all" ? undefined : fileTypeFilter,
        sortBy: sortDescriptor?.id,
        sortOrder: sortDescriptor?.desc ? "desc" : "asc",
      };

      console.log('Fetching project files with params:', queryParams); // Debug log

      const result = await getProjectFiles(projectId, queryParams);
      return result.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const projectFiles = (data?.files || []) as ProjectFile[];
  const totalFiles = data?.total || 0;
  const pageCount = Math.ceil(totalFiles / pagination.pageSize);

  const table = useReactTable({
    data: projectFiles,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  // Unique file types for filter options
  const uniqueFileTypes = Array.from(new Set(projectFiles.map(file => file.file_type))).map(type => ({
    label: type.toUpperCase(),
    value: type,
  }));

  const uploadMutation = useMutation({
    mutationFn: (fileData: { file: File, name: string, visibleToCustomer: boolean }) => {
      console.log("Uploading file:", fileData);
      return uploadProjectFile(projectId, fileData.file, fileData.name, fileData.visibleToCustomer);
    },
    onSuccess: () => {
      toast.success("File berhasil diunggah.");
      queryClient.invalidateQueries({ queryKey: ['projectFiles', projectId] }); // Invalidate cache to refetch files
    },
    onError: (error: any) => {
      toast.error("Gagal mengunggah file.", { description: error.message });
    },
  });

  const handleFilesAdded = (files: File[] | null) => {
    if (files && files.length > 0) {
      files.forEach(file => {
        // Automatically upload each file
        uploadMutation.mutate({
          file: file,
          name: file.name,
          visibleToCustomer: false, // Default to not visible to customer
        });
      });
    }
  };


  return (
    <Card className="flex p-6 flex-col ">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
            Daftar File Internal Project
          </h2>
          <p className="font-roboto text-xs leading-4 tracking-[0.4px] text-primary">
            Kelola dokumen internal di dalam project
          </p>
        </div>
        {/* Removed "Add Document" button */}
      </div>

      {/* File Uploader directly above the table */}
      <FileUploader
        value={null}
        onValueChange={handleFilesAdded}
        dropzoneOptions={{
          maxFiles: 5,
          maxSize: 20 * 1024 * 1024, // Example: Max 20MB per file
          accept: {
            'image/*': ['.jpeg', '.png', '.gif', '.webp'],
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt'],
          },
        }}
        texts={{
          title: "Drag & drop file di sini atau klik",
          subtitle: "Upload file project",
          fileTypes: "PDF, Gambar, Excel, Word, Text (Max 20MB)",
        }}
        className="mb-6 mt-2"
      />

      {/* Filters and Toolbar */}
      <DataTableToolbar
        table={table}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        fileTypeFilter={fileTypeFilter}
        onFileTypeFilterChange={setFileTypeFilter}
        fileTypeOptions={uniqueFileTypes}
      />

      {/* File Table */}
      <div className="mt-6">
        <DataTable
          table={table}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </Card>
  );
}
