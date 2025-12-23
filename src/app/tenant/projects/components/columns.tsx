"use client";

import { ProjectActionsMenu } from "./ProjectActionsMenu";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import type { Project } from "@/services/project.service";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Project>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Project Name & Code" />
		),
		cell: ({ row }) => {
			const name = row.getValue("name") as string;
			const code = row.original.code;
			return (
				<Link
					href={`/tenant/projects/${row.original.id}`}
					className="flex flex-col"
				>
					<span className="text-primary uppercase font-bold">{name}</span>
					<span className="text-primary uppercase">{code}</span>
				</Link>
			);
		},
	},
	{
		accessorKey: "client",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Klien/WP" />
		),
		cell: ({ row }) => {
			// @ts-ignore
			const clientName = row.original.clients?.name || "-";
			return (
				<span className=" text-primary font-bold uppercase text-sm leading-6 tracking-[-0.28px] ">
					{clientName}
				</span>
			);
		},
	},
	{
		id: "period",
		accessorKey: "period", // Enable sorting by using accessorKey or id that matches service logic
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Periode" />
		),
		cell: ({ row }) => {
			const start = row.original.start_date
				? format(row.original.start_date, "mmm yyyy")
				: "-";
			return (
				<div className="inline-flex items-center justify-center rounded-[6.25px] border border-[#C2C5CC] bg-[#EEEFF1] px-[3px] py-[3px]">
					<span className="text-nowrap font-inter text-[10.7px] text-[#7C7D8C]">
						{start}
					</span>
				</div>
			);
		},
	},
	{
		id: "modules",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Modul" />
		),
		cell: ({ row }) => {
			const scopes = row.original.project_scopes || [];
			return (
				<div className="flex min-w-32 flex-wrap gap-1">
					{scopes.map((s, idx) => (
						<div
							key={idx}
							className="flex items-center justify-center  rounded-[6.25px] border border-border bg-muted px-2.5 py-[5px]"
						>
							<span className="font-inter text-nowrap text-xs">
								{s.scope_name}
							</span>
						</div>
					))}
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = row.getValue("status") as string;

			const variants: Record<string, { bg: string; text: string }> = {
				planning: { bg: "bg-blue-100", text: "text-blue-800" },
				active: { bg: "bg-[#E8DEF8]", text: "text-[#4A4459]" }, // 'In Progress' mapped
				completed: { bg: "bg-[#CFF7D3]", text: "text-[#4A4459]" }, // 'Selesai' mapped
				overdue: { bg: "bg-[#EC221F]", text: "text-white" },
				// Add others as needed
			};

			const variant = variants[status?.toLowerCase()] ||
				variants["active"] || { bg: "bg-gray-100", text: "text-gray-800" };

			return (
				<span
					className={`inline-flex min-w-[48px] capitalize items-center justify-center gap-0.5 rounded-[50px] px-3 py-1.5 text-sm font-medium ${variant.bg} ${variant.text}`}
				>
					{status}
				</span>
			);
		},
	},
	{
		accessorKey: "progress", // Assuming progress is a field or we can calculate/fetch
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Progress" />
		),
		cell: ({ row }) => {
			const progress = row.original.progress || 0;
			return (
				<div className="flex items-center gap-1.5">
					<span className="font-dm text-sm font-bold text-primary leading-6 tracking-[-0.28px] ">
						{progress}%
					</span>
					<div className="relative h-2 w-[63px] overflow-hidden rounded-[21px] bg-muted">
						<div
							className="h-full rounded-[21px] bg-[#4318FF]"
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>
			);
		},
	},
	{
		id: "daysOverdue",
		accessorKey: "daysOverdue", // Enable sorting
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Days Overdue" />
		),
		cell: ({ row }) => {
			const endDate = row.original.end_date
				? new Date(row.original.end_date)
				: null;
			if (!endDate) return <span>-</span>;

			const now = new Date();
			const diffTime = now.getTime() - endDate.getTime();
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

			if (diffDays <= 0) return <span>-</span>;

			return (
				<div className="inline-flex items-center justify-center rounded-[5.75px] border border-[#FEC4BE] bg-[#F9E6E7] px-2 py-1.5">
					<span className="font-inter text-xs text-[#E47174]">
						{diffDays} hari
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "contact",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Contact" />
		),
		cell: ({ row }) => {
			const contact =
				row.original.users_projects_ketua_tim_idTousers?.name || "-";
			return (
				<span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] ">
					{contact}
				</span>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return <ProjectActionsMenu project={row.original} />;
		},
		enableSorting: false,
		enableHiding: false,
	},
];
