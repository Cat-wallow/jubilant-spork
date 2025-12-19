"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ProjectMember } from "@/services/project.service"; // Will be replaced by backend data type
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { TeamMember } from "../data/team-members";
import { MemberActionsMenu } from "./MemberActionsMenu";

export const columns: ColumnDef<TeamMember>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected()
						? true
						: table.getIsSomePageRowsSelected()
						? "indeterminate"
						: false
				}
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
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-semibold text-white">
					{row.original.avatar}
				</div>
				<span>{row.getValue("name")}</span>
			</div>
		),
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => <div>{row.getValue("role")}</div>,
		filterFn: (row, id, value) => {
			return row.getValue(id) === value;
		},
	},
	{
		accessorKey: "modules",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Modules" />
		),
		cell: ({ row }) => (
			<div className="flex flex-wrap gap-1">
				{(row.getValue("modules") as string[]).map((module) => (
					<Badge key={module} variant="secondary">
						{module}
					</Badge>
				))}
			</div>
		),
		filterFn: (row, id, value) => {
			// Assuming value is a single module string to filter by
			const modules: string[] = row.getValue(id);
			return modules.includes(value as string);
		},
		enableSorting: false,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<div className="flex justify-end">
					<MemberActionsMenu member={row.original} />
				</div>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
	// Add more columns as needed
];
