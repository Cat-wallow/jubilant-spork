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

			{/* Upload Button */}
			<div className="flex justify-center pt-5">
				<Button className="h-[42px] rounded-[5px] bg-[#332687] px-4 font-roboto text-sm font-medium leading-5 tracking-[0.1px] hover:bg-[#241963]">
					<svg
						className="mr-2 h-6 w-6"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 19.9998C5.45 19.9998 4.97933 19.8042 4.588 19.4128C4.19667 19.0215 4.00067 18.5505 4 17.9998V15.9998C4 15.7165 4.096 15.4792 4.288 15.2878C4.48 15.0965 4.71733 15.0005 5 14.9998C5.28267 14.9992 5.52033 15.0952 5.713 15.2878C5.90567 15.4805 6.00133 15.7178 6 15.9998V17.9998H18V15.9998C18 15.7165 18.096 15.4792 18.288 15.2878C18.48 15.0965 18.7173 15.0005 19 14.9998C19.2827 14.9992 19.5203 15.0952 19.713 15.2878C19.9057 15.4805 20.0013 15.7178 20 15.9998V17.9998C20 18.5498 19.8043 19.0208 19.413 19.4128C19.0217 19.8048 18.5507 20.0005 18 19.9998H6ZM11 7.84982L9.125 9.72482C8.925 9.92482 8.68767 10.0208 8.413 10.0128C8.13833 10.0048 7.90067 9.90049 7.7 9.69982C7.51667 9.49982 7.42067 9.26649 7.412 8.99982C7.40333 8.73315 7.49933 8.49982 7.7 8.29982L11.3 4.69982C11.4 4.59982 11.5083 4.52915 11.625 4.48782C11.7417 4.44649 11.8667 4.42549 12 4.42482C12.1333 4.42415 12.2583 4.44515 12.375 4.48782C12.4917 4.53049 12.6 4.60115 12.7 4.69982L16.3 8.29982C16.5 8.49982 16.596 8.73315 16.588 8.99982C16.58 9.26649 16.484 9.49982 16.3 9.69982C16.1 9.89982 15.8627 10.0042 15.588 10.0128C15.3133 10.0215 15.0757 9.92549 14.875 9.72482L13 7.84982V14.9998C13 15.2832 12.904 15.5208 12.712 15.7128C12.52 15.9048 12.2827 16.0005 12 15.9998C11.7173 15.9992 11.48 15.9032 11.288 15.7118C11.096 15.5205 11 15.2832 11 14.9998V7.84982Z"
							fill="currentColor"
						/>
					</svg>
					Upload
				</Button>
			</div>
		</div>
	);
}
