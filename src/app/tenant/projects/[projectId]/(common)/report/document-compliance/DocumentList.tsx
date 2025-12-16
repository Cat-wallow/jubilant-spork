"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Download,
	Plus,
	Search,
	ChevronDown,
	Filter,
	MoreHorizontal,
	Send,
	Trash2,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

interface Document {
	id: string;
	name: string;
	type: string;
	attachments: number;
	visibleToCustomer: boolean;
}

interface DocumentListProps {
	documents: Document[];
}

export function DocumentList({ documents: initialDocuments }: DocumentListProps) {
	const [documents, setDocuments] = useState(initialDocuments);

	const toggleVisibility = (id: string) => {
		setDocuments((docs) =>
			docs.map((doc) =>
				doc.id === id ? { ...doc, visibleToCustomer: !doc.visibleToCustomer } : doc
			)
		);
	};

	return (
		<Card className="shadow-[0_1px_2px_0_rgba(0,0,0,0.30),0_1px_3px_1px_rgba(0,0,0,0.15)]">
			<CardHeader>
				<div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<CardTitle>Daftar Dokumen</CardTitle>
						<CardDescription>Kelola Invoice di dalam Project</CardDescription>
					</div>
					<div className="flex gap-2.5">
						<Button variant="outline" size="sm" className="gap-1">
							<Download className="h-4 w-4" />
							Export XLSX
						</Button>
						<Button variant="outline" size="sm" className="gap-1">
							<Download className="h-4 w-4" />
							Export PDF
						</Button>
						<Button size="sm" className="gap-1 bg-[#332687] hover:bg-[#241963]">
							<Plus className="h-4 w-4" />
							Buat Invoice
						</Button>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-5">
				{/* Filters */}
				<div className="flex flex-wrap items-center gap-5">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="gap-1">
								20
								<ChevronDown className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>10</DropdownMenuItem>
							<DropdownMenuItem>20</DropdownMenuItem>
							<DropdownMenuItem>50</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
						<Input placeholder="Nama tugas" className="pl-10" />
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="gap-1">
								All Status
								<ChevronDown className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>All Status</DropdownMenuItem>
							<DropdownMenuItem>Active</DropdownMenuItem>
							<DropdownMenuItem>Inactive</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="gap-1">
								All Type
								<ChevronDown className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>All Type</DropdownMenuItem>
							<DropdownMenuItem>PDF</DropdownMenuItem>
							<DropdownMenuItem>DOC</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Button variant="outline" className="gap-1">
						<Filter className="h-4 w-4" />
						Filter
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreHorizontal className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Export</DropdownMenuItem>
							<DropdownMenuItem>Delete All</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Table Header */}
				<div className="flex items-center justify-between border-b pb-2.5">
					<div className="flex w-[150px] items-center gap-2.5">
						<Checkbox />
						<span className="font-dm text-sm font-medium text-[#A3AED0]">File Name</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[120px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">File Type</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[120px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Lampiran</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[120px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Visible to Customer</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
					<div className="flex w-[210px] items-center gap-1.5">
						<span className="font-dm text-sm font-medium text-[#A3AED0]">Action</span>
						<ChevronDown className="h-4 w-4 text-[#A3AED0]" />
					</div>
				</div>

				{/* Table Body */}
				<div className="space-y-2.5">
					{documents.map((doc) => (
						<div key={doc.id} className="flex items-center justify-between py-2.5">
							<div className="flex w-[150px] items-center gap-2.5">
								<Checkbox defaultChecked />
								<span className="font-inter text-sm font-medium text-[#404040]">{doc.name}</span>
							</div>
							<div className="w-[120px]">
								<span className="font-inter text-sm font-medium text-[#404040]">{doc.type}</span>
							</div>
							<div className="w-[120px]">
								<span className="font-inter text-sm font-medium text-[#404040]">{doc.attachments}</span>
							</div>
							<div className="w-[120px]">
								<Switch
									checked={doc.visibleToCustomer}
									onCheckedChange={() => toggleVisibility(doc.id)}
								/>
							</div>
							<div className="flex w-[210px] items-center gap-5">
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<Send className="h-5 w-5 text-[#332687]" />
								</Button>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<Trash2 className="h-5 w-5 text-[#BF6A02]" />
								</Button>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-between pt-2.5">
					<p className="font-geist text-sm text-[#737373]">Showing 1-10 of 100 products</p>
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="sm" className="gap-1">
							<ChevronLeft className="h-4 w-4" />
							Previous
						</Button>
						<Button variant="outline" size="sm" className="bg-white shadow-sm">
							1
						</Button>
						<Button variant="ghost" size="sm">
							2
						</Button>
						<Button variant="ghost" size="sm">
							3
						</Button>
						<Button variant="ghost" size="sm">
							4
						</Button>
						<Button variant="ghost" size="sm">
							...
						</Button>
						<Button variant="ghost" size="sm">
							10
						</Button>
						<Button variant="ghost" size="sm" className="gap-1">
							Next
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
