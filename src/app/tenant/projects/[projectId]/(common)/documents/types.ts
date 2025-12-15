export interface DocumentFolder {
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

export interface Document {
	id: string;
	name: string;
	type: string;
	comments: number;
	visibleToCustomer: boolean;
	checked: boolean;
}
