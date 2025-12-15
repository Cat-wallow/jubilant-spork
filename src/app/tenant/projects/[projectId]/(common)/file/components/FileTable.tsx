"use client";

import { Send, Trash2, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface File {
	id: string;
	name: string;
	type: string;
	comments: number;
	visibleToCustomer: boolean;
	checked: boolean;
}

interface FileTableProps {
	files: File[];
	onToggleVisibility: (id: string) => void;
	onDeleteFile: (id: string) => void;
	onSendFile: (id: string) => void;
	onToggleCheck: (id: string) => void;
}

export function FileTable({
	files,
	onToggleVisibility,
	onDeleteFile,
	onSendFile,
	onToggleCheck,
}: FileTableProps) {
	return (
		<div className="flex flex-col gap-2.5">
			{/* Table Header */}
			<div className="flex items-center justify-between">
				<div className="flex w-[150px] items-center gap-2.5">
					<Checkbox className="h-6 w-6" />
					<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
						File Name
					</span>
					<ChevronDown className="h-6 w-6 text-[#A3AED0]" />
				</div>

				<div className="flex w-[120px] items-center gap-[7px]">
					<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
						File Type
					</span>
					<ChevronDown className="h-6 w-6 text-[#A3AED0]" />
				</div>

				<div className="flex w-[120px] items-center gap-[7px]">
					<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
						Total Comments
					</span>
					<ChevronDown className="h-6 w-6 text-[#A3AED0]" />
				</div>

				<div className="flex w-[120px] items-center gap-[7px]">
					<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
						Visible to Customer
					</span>
					<ChevronDown className="h-6 w-6 text-[#A3AED0]" />
				</div>

				<div className="flex w-[210px] items-center gap-[7px]">
					<span className="font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">
						Action
					</span>
					<ChevronDown className="h-6 w-6 text-[#A3AED0]" />
				</div>
			</div>

			{/* Separator */}
			<div className="h-px w-full bg-border" />

			{/* Table Rows */}
			<div className="flex flex-col gap-0">
				{files.map((file) => (
					<div
						key={file.id}
						className="flex items-center justify-between border-b py-4 last:border-0"
					>
						<div className="flex w-[150px] items-center gap-2.5">
							<Checkbox
								checked={file.checked}
								onCheckedChange={() => onToggleCheck(file.id)}
								className="h-6 w-6"
							/>
							<span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{file.name}
							</span>
						</div>

						<div className="flex w-[120px] flex-col gap-2.5">
							<span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{file.type}
							</span>
						</div>

						<div className="flex w-[120px] flex-col gap-2.5">
							<span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{file.comments}
							</span>
						</div>

						<div className="flex w-[120px] flex-col gap-2.5">
							<Switch
								checked={file.visibleToCustomer}
								onCheckedChange={() => onToggleVisibility(file.id)}
							/>
						</div>

						<div className="flex w-[210px] items-center gap-5">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => onSendFile(file.id)}
								className="h-auto w-auto p-0"
							>
								<Send className="h-[30px] w-[30px] text-[#332687]" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => onDeleteFile(file.id)}
								className="h-auto w-auto p-0"
							>
								<Trash2 className="h-[30px] w-[30px] text-[#BF6A02]" />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
