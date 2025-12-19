"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
	ColumnFiltersState,
	getCoreRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { useDebounce } from "use-debounce";
import { getProjects } from "@/services/project.service";
import { DataTableToolbar } from "@/app/tenant/projects/components/data-table-toolbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/tenant/projects/components/columns";
import ProjectStats from "@/app/tenant/projects/components/ProjectStats";

export default function ProjectsTab() {
	const params = useParams();
	const tenantId = params.id as string;

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
	const [planFilter, setPlanFilter] = useState("all");
	const debouncedSearch = useDebounce(searchQuery, 400);

	const { data, isLoading, isError } = useQuery({
		queryKey: [
			"projects",
			tenantId, // Include tenantId in query key
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
				tenantId, // Pass tenantId for admin context
			);
		},
		placeholderData: keepPreviousData,
		staleTime: 5 * 60 * 1000,
		enabled: !!tenantId, // Only run if tenantId is available
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
			<div className="flex flex-col gap-[5px]">
				<h2 className="text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
					Daftar Project
				</h2>
				<p className="text-sm text-muted-foreground">
					Kelola project untuk tenant ini
				</p>
			</div>

			{/* Main Content Card */}
			<div className="rounded-lg border bg-card p-6">
				<div className="mb-6 flex items-start justify-between">
					<div className="flex flex-col gap-1">
						<h2 className="text-xl font-bold">Semua Project</h2>
					</div>
				</div>

				<DataTableToolbar
					table={table}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					planFilter={planFilter}
					setPlanFilter={setPlanFilter}
				/>

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
