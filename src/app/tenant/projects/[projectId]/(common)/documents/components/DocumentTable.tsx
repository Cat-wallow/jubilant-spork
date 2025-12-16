"use client";

import { Send, Trash2, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface Document {
	id: string;
	name: string;
	type: string;
	comments: number;
	visibleToCustomer: boolean;
	checked: boolean;
}

interface DocumentTableProps {
	documents: Document[];
	onToggleVisibility: (id: string) => void;
	onDeleteDocument: (id: string) => void;
	onSendDocument: (id: string) => void;
	onToggleCheck: (id: string) => void;
}

export function DocumentTable({
	documents,
	onToggleVisibility,
	onDeleteDocument,
	onSendDocument,
	onToggleCheck,
}: DocumentTableProps) {
	return (
		<div className="flex flex-col gap-2.5 overflow-x-auto">
			{/* Table Header */}
			<div className="hidden min-w-[900px] items-center justify-between md:flex">
				<div className="flex w-[150px] items-center gap-2.5">
					<Checkbox className="h-6 w-6 border-[#A3AED0]" />
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
			<div className="hidden h-px w-full bg-border md:block" />

			{/* Table Rows */}
			<div className="flex min-w-[900px] flex-col gap-0">
				{documents.map((doc) => (
					<div
						key={doc.id}
						className="flex flex-col gap-4 border-b py-4 last:border-0 md:flex-row md:items-center md:justify-between"
					>
						<div className="flex w-full items-center gap-2.5 md:w-[150px]">
							<Checkbox
								checked={doc.checked}
								onCheckedChange={() => onToggleCheck(doc.id)}
								className="h-6 w-6"
							/>
							<span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{doc.name}
							</span>
						</div>

						<div className="flex w-full flex-col gap-2.5 md:w-[120px]">
							<span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{doc.type}
							</span>
						</div>

						<div className="flex w-full flex-col gap-2.5 md:w-[120px]">
							<span className="font-inter text-sm font-medium leading-[14px] text-[#404040]">
								{doc.comments}
							</span>
						</div>

						<div className="flex w-full flex-col gap-2.5 md:w-[120px]">
							<Switch
								checked={doc.visibleToCustomer}
								onCheckedChange={() => onToggleVisibility(doc.id)}
							/>
						</div>

						<div className="flex w-full items-center gap-5 md:w-[210px]">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => onSendDocument(doc.id)}
								className="h-auto w-auto p-0 hover:bg-transparent"
							>
								<Send className="h-[30px] w-[30px] text-[#332687]" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => onDeleteDocument(doc.id)}
								className="h-auto w-auto p-0 hover:bg-transparent"
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
