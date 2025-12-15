"use client";

import { DocumentFolderCard } from "./DocumentFolderCard";

interface Folder {
	id: string;
	title: string;
	description: string;
	status: "Approved" | "In Progress" | "In Review";
	progress: number;
	filesCount: number;
	totalFiles: number;
	size: string;
	completedDate: string;
}

interface DocumentFolderGridProps {
	folders: Folder[];
}

export function DocumentFolderGrid({ folders }: DocumentFolderGridProps) {
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{folders.map((folder) => (
				<DocumentFolderCard key={folder.id} {...folder} />
			))}
		</div>
	);
}
