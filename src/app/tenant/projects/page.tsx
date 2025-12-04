"use client";

import RBAC from "@/components/rbac/RBAC";
import { getProjects } from "@/services/project.service";
import { useQuery } from "@tanstack/react-query";
import {
	ColumnFiltersState,
	getCoreRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import ProjectStats from "./components/ProjectStats";
import { DataTableToolbar } from "./components/data-table-toolbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { useDebounce } from "use-debounce";

function ProjectsPageContent() {
	// Table state
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [planFilter, setPlanFilter] = useState("all"); // planFilter here maps to 'scope' in service
	const debouncedSearch = useDebounce(searchQuery, 400);

	const { data, isLoading, isError } = useQuery({
		queryKey: [
			"projects",
			pagination.pageIndex,
			pagination.pageSize,
			sorting,
			debouncedSearch,
			statusFilter,
			planFilter,
		],
		queryFn: () => {
			const sortDescriptor = sorting.length > 0 ? sorting[0] : undefined;
			const sort = sortDescriptor
				? {
						column: sortDescriptor.id,
						direction: sortDescriptor.desc ? "desc" : "asc",
					}
				: undefined;

			return getProjects(
				pagination.pageIndex + 1,
				pagination.pageSize,
				searchQuery,
				statusFilter,
				planFilter,
				sort as any,
                undefined // tenantId not needed for tenant view
			);
		},
		keepPreviousData: true,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	const projects = data?.data?.projects || [];
	const totalProjects = data?.data?.total || 0;
	const pageCount = Math.ceil(totalProjects / pagination.pageSize);

	const table = useReactTable({
		data: projects,
		columns: columns,
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
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
	});

	return (
		<div className="w-full space-y-6">
			{/* Header */}
			<div className="flex flex-col gap-[5px]">
				<h1 className="text-3xl font-bold tracking-tight text-primary">
					Daftar Project
				</h1>
			</div>

			{/* Stats */}
			<ProjectStats />

			{/* Main Content Card */}
			<div className="rounded-lg border bg-card p-6">
				{/* Title and Add Button */}
				<div className="mb-6 flex items-start justify-between">
					<div className="flex flex-col gap-1">
						<h2 className="text-2xl font-bold">Semua Project</h2>
						<p className="text-sm text-muted-foreground">
							Kelola project di dalam sistem
						</p>
					</div>
				</div>

				{/* Filters and Toolbar */}
				<DataTableToolbar
					table={table}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					planFilter={planFilter}
					setPlanFilter={setPlanFilter}
				/>

				{/* Table */}
				<div className="mt-6">
					<DataTable
						table={table}
						columns={columns}
						isLoading={isLoading}
						isError={isError}
					/>
				</div>
			</div>
		</div>
	);
}

export default function ProjectsPage() {
	return (
		<RBAC
			requiredPermission={["project:manage", "project:read"]}
			unauthorizedPage={true}
		>
			<ProjectsPageContent />
		</RBAC>
	);
}
