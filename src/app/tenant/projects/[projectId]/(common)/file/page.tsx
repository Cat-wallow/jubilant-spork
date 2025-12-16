"use client";

import { useState } from "react";
import { FileUploadArea } from "./components/FileUploadArea";
import { FileFilters } from "./components/FileFilters";
import { FileTable } from "./components/FileTable";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FileUploader } from "@/components/shared/FileUploader";

// Mock data
const initialFiles = [
	{
		id: "1",
		name: "Dokumen Pajak 1",
		type: "PDF",
		comments: 4,
		visibleToCustomer: false,
		checked: true,
	},
	{
		id: "2",
		name: "Dokumen Pajak 2",
		type: "PDF",
		comments: 4,
		visibleToCustomer: false,
		checked: true,
	},
	{
		id: "3",
		name: "Dokumen Pajak 3",
		type: "PDF",
		comments: 4,
		visibleToCustomer: false,
		checked: true,
	},
	{
		id: "4",
		name: "Dokumen Akuntansi 1",
		type: "PDF",
		comments: 4,
		visibleToCustomer: false,
		checked: true,
	},
	{
		id: "5",
		name: "Dokumen Akuntansi 2",
		type: "PDF",
		comments: 4,
		visibleToCustomer: false,
		checked: true,
	},
	{
		id: "6",
		name: "Rekening Koran",
		type: "PDF",
		comments: 4,
		visibleToCustomer: false,
		checked: true,
	},
	{
		id: "7",
		name: "Faktur Pajak 2",
		type: "PDF",
		comments: 4,
		visibleToCustomer: false,
		checked: true,
	},
];

export default function FilePage() {
	const [files, setFiles] = useState(initialFiles);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedModule, setSelectedModule] = useState("all");
	const [selectedAssignee, setSelectedAssignee] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");

	const handleFileUpload = (uploadedFiles: File[]) => {
		console.log("Files uploaded:", uploadedFiles);
	};

	const handleToggleVisibility = (id: string) => {
		setFiles(
			files.map((file) =>
				file.id === id
					? { ...file, visibleToCustomer: !file.visibleToCustomer }
					: file,
			),
		);
	};

	const handleDeleteFile = (id: string) => {
		setFiles(files.filter((file) => file.id !== id));
	};

	const handleSendFile = (id: string) => {
		console.log("Sending file:", id);
	};

	const handleToggleCheck = (id: string) => {
		setFiles(
			files.map((file) =>
				file.id === id ? { ...file, checked: !file.checked } : file,
			),
		);
	};

	return (
		<Card className="flex mt-[10px]  p-6 flex-col gap-[50px]">
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
				<Button className="h-12 rounded-[10px] bg-[#332687] px-4 font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
					Add Document
				</Button>
			</div>

			{/* Upload Area */}
			<FileUploader />

			{/* Filters */}
			<FileFilters
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				selectedModule={selectedModule}
				onModuleChange={setSelectedModule}
				selectedAssignee={selectedAssignee}
				onAssigneeChange={setSelectedAssignee}
				selectedStatus={selectedStatus}
				onStatusChange={setSelectedStatus}
			/>

			{/* File Table */}
			<FileTable
				files={files}
				onToggleVisibility={handleToggleVisibility}
				onDeleteFile={handleDeleteFile}
				onSendFile={handleSendFile}
				onToggleCheck={handleToggleCheck}
			/>
		</Card>
	);
}
