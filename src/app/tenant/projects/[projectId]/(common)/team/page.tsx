"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
	ColumnFiltersState,
	getCoreRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { DataTableToolbar } from "./components/data-table-toolbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { getProjectMembers } from "@/services/project.service";
import { cn } from "@/lib/utils";
import RBAC from "@/components/rbac/RBAC";
import { Button } from "@/components/ui/button";

function TeamPageContent() {
	const params = useParams();
	const projectId = params.projectId as string;
	const router = useRouter();

	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const [searchQuery, setSearchQuery] = useState("");
	const [moduleFilter, setModuleFilter] = useState("all");
	const [debouncedSearch] = useDebounce(searchQuery, 400);

	const { data, isLoading, isError } = useQuery({
		queryKey: [
			"projectMembers",
			projectId,
			pagination.pageIndex,
			pagination.pageSize,
			sorting,
			debouncedSearch,
			moduleFilter,
		],
		queryFn: () => {
			const sortDescriptor = sorting.length > 0 ? sorting[0] : undefined;
			const sort = sortDescriptor
				? {
						column: sortDescriptor.id,
						direction: sortDescriptor.desc ? "desc" : "asc",
					}
				: undefined;

			return getProjectMembers({
				projectId,
				page: pagination.pageIndex + 1,
				pageSize: pagination.pageSize,
				search: debouncedSearch,
				module: moduleFilter,
				sort: sort as any,
			});
		},
		placeholderData: keepPreviousData,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	const projectMembers = data?.data?.members || [];
	const totalMembers = data?.data?.total || 0;
	const pageCount = Math.ceil(totalMembers / pagination.pageSize);

	const table = useReactTable({
		data: projectMembers,
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
		<div className="flex w-full flex-col gap-[30px]">
			<div className="flex flex-col gap-5 rounded-[20px] bg-card p-4 md:p-6">
				{/* Header */}
				<div className="mb-6 flex items-start justify-between">
					<div className="flex flex-col gap-1">
						<h2 className="text-2xl font-bold text-primary">
							Daftar Anggota Tim
						</h2>
						<p className="text-sm text-primary">
							Kelola anggota tim yang terlibat dalam proyek ini
						</p>
					</div>

					<Button
						size="sm"
						className="self-center"
						onClick={() =>
							router.push(`/tenant/projects/${projectId}/team/add`)
						}
					>
						Invite User
					</Button>
					{/* Add member button if needed */}
				</div>

				{/* Filters and Toolbar */}
				<DataTableToolbar
					table={table}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					moduleFilter={moduleFilter}
					setModuleFilter={setModuleFilter}
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

export default function TeamPage() {
	return (
		<RBAC
			requiredPermission={["project:manage", "project:read"]}
			unauthorizedPage={true}
		>
			<TeamPageContent />
		</RBAC>
	);
}
