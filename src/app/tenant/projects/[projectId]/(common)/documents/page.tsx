"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DocumentFolderGrid } from "./components/DocumentFolderGrid";
import { DocumentUploadArea } from "./components/DocumentUploadArea";
import { DocumentFilters } from "./components/DocumentFilters";
import { DocumentTable } from "./components/DocumentTable";
import { DocumentPagination } from "./components/DocumentPagination";
import { FileUploader } from "@/components/shared/FileUploader";
import { Card } from "@/components/ui/card";

// Mock data for document folders
const documentFolders = [
	{
		id: "1",
		title: "OA (Operating Agreement)",
		description: "Operating agreement and related legal document",
		status: "Approved" as const,
		progress: 80,
		filesCount: 8,
		totalFiles: 12,
		size: "15 MB",
		completedDate: "2025-10-10",
	},
	{
		id: "2",
		title: "OL (Operating License)",
		description: "Business Operating License & Permits",
		status: "In Progress" as const,
		progress: 66,
		filesCount: 8,
		totalFiles: 12,
		size: "12 MB",
		completedDate: "2025-10-10",
	},
	{
		id: "3",
		title: "PO (Purchase Order)",
		description: "PO & Procurement document",
		status: "In Review" as const,
		progress: 66,
		filesCount: 8,
		totalFiles: 12,
		size: "10 MB",
		completedDate: "2025-10-10",
	},
	{
		id: "4",
		title: "Bank Statements",
		description: "Monthly bank statements",
		status: "Approved" as const,
		progress: 66,
		filesCount: 8,
		totalFiles: 12,
		size: "8 MB",
		completedDate: "2025-10-10",
	},
	{
		id: "5",
		title: "Tax Documents",
		description: "Tax returns and ...",
		status: "Approved" as const,
		progress: 66,
		filesCount: 8,
		totalFiles: 12,
		size: "20 MB",
		completedDate: "2025-10-10",
	},
	{
		id: "6",
		title: "Tax Documents",
		description: "Tax returns and ...",
		status: "Approved" as const,
		progress: 66,
		filesCount: 8,
		totalFiles: 12,
		size: "18 MB",
		completedDate: "2025-10-10",
	},
	{
		id: "7",
		title: "Tax Documents",
		description: "Tax returns and ...",
		status: "Approved" as const,
		progress: 66,
		filesCount: 8,
		totalFiles: 12,
		size: "15 MB",
		completedDate: "2025-10-10",
	},
	{
		id: "8",
		title: "Tax Documents",
		description: "Tax returns and ...",
		status: "Approved" as const,
		progress: 66,
		filesCount: 8,
		totalFiles: 12,
		size: "22 MB",
		completedDate: "2025-10-10",
	},
];

// Mock data for documents
const initialDocuments = [
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

export default function DocumentsPage() {
	const [documents, setDocuments] = useState(initialDocuments);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedModule, setSelectedModule] = useState("all");
	const [selectedAssignee, setSelectedAssignee] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);

	const handleFileUpload = (uploadedFiles: File[]) => {
		console.log("Files uploaded:", uploadedFiles);
	};

	const handleFileChange = (files: File[] | null) => {
		setUploadedFiles(files);
	};

	const handleToggleVisibility = (id: string) => {
		setDocuments(
			documents.map((doc) =>
				doc.id === id
					? { ...doc, visibleToCustomer: !doc.visibleToCustomer }
					: doc,
			),
		);
	};

	const handleDeleteDocument = (id: string) => {
		setDocuments(documents.filter((doc) => doc.id !== id));
	};

	const handleSendDocument = (id: string) => {
		console.log("Sending document:", id);
	};

	const handleToggleCheck = (id: string) => {
		setDocuments(
			documents.map((doc) =>
				doc.id === id ? { ...doc, checked: !doc.checked } : doc,
			),
		);
	};

	return (
		<div className="flex flex-col gap-[30px]">
			{/* Header Section */}
			<div className="flex flex-col gap-[30px] sm:flex-row sm:items-start sm:justify-between">
				<div className="flex-1">
					<h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
						Document Project 1
					</h2>
				</div>
				<Button>
					<Plus className="mr-2 h-6 w-6" />
					Buat Folder
				</Button>
			</div>

			{/* Document Folders Grid */}
			<DocumentFolderGrid folders={documentFolders} />

			<FileUploader value={uploadedFiles} onValueChange={handleFileChange} />

			{/* Document List Section */}
			<Card className="flex flex-col gap-5 rounded-[20px]  px-10 py-6">
				{/* Section Header */}
				<div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
					<div className="flex flex-col">
						<h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
							Daftar Dokumen
						</h2>
						<p className=" text-xs leading-4 tracking-[0.4px] text-primary">
							Kelola dokumen di dalam project
						</p>
					</div>
					<Button className="h-12 w-full rounded-[10px] bg-primary px-4  text-sm font-medium leading-5 tracking-[0.1px] hover:bg-[#241963] sm:w-auto">
						Add Document
					</Button>
				</div>

				{/* Filters */}
				<DocumentFilters
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					selectedModule={selectedModule}
					onModuleChange={setSelectedModule}
					selectedAssignee={selectedAssignee}
					onAssigneeChange={setSelectedAssignee}
					selectedStatus={selectedStatus}
					onStatusChange={setSelectedStatus}
				/>

				{/* Document Table */}
				<DocumentTable
					documents={documents}
					onToggleVisibility={handleToggleVisibility}
					onDeleteDocument={handleDeleteDocument}
					onSendDocument={handleSendDocument}
					onToggleCheck={handleToggleCheck}
				/>

				{/* Pagination */}
				<DocumentPagination
					currentPage={currentPage}
					totalPages={10}
					totalItems={100}
					onPageChange={setCurrentPage}
				/>
			</Card>
		</div>
	);
}
