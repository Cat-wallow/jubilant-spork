"use client";

import { useState } from "react";
import { MoreVertical, Edit, UserX, UserCheck, Trash } from "lucide-react";
import { useToggleTenantStatus } from "@/hooks/usePlatformTenants";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProject, Project } from "@/services/project.service";
import { useQueryClient } from "@tanstack/react-query";

interface ProjectActionsMenuProps {
	project: Project;
}

export function ProjectActionsMenu({ project }: ProjectActionsMenuProps) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const router = useRouter();
	const queryClient = useQueryClient();

	const handleDelete = async () => {
		try {
			await deleteProject(project.id);
			toast.success("Project deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			setIsDeleteModalOpen(false);
		} catch (error) {
			toast.error("Failed to delete project");
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreVertical className=" h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="center">
					<DropdownMenuItem
						onSelect={() => router.push(`/tenant/projects/${project.id}/edit`)}
					>
						<Edit className="mr-2 h-4 w-4" />
						Edit project
					</DropdownMenuItem>
					<DropdownMenuItem
						onSelect={() => setIsDeleteModalOpen(true)}
						className="text-destructive"
					>
						<Trash className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Deactivate Confirmation Dialog */}
			<Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Hapus project</DialogTitle>
						<DialogDescription>
							Apakah Anda yakin ingin menghapus project{" "}
							<strong>{project.name}</strong>?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsDeleteModalOpen(false)}
						>
							Batal
						</Button>
						<Button type="submit" variant="destructive" onClick={handleDelete}>
							Hapus
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
