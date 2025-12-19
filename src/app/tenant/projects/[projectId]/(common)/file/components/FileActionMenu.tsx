'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Download, Eye, EyeOff, Trash2 } from 'lucide-react';
import { ProjectFile } from './columns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProjectFile, toggleProjectFileVisibility } from '@/services/project-file.service';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

interface FileActionMenuProps {
  file: ProjectFile;
}

export const FileActionMenu: React.FC<FileActionMenuProps> = ({ file }) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleVisibilityMutation = useMutation({
    mutationFn: (id: string) => toggleProjectFileVisibility(file.project_id, id, !file.visible_to_customer),
    onSuccess: () => {
      toast.success('Visibilitas file berhasil diperbarui.');
      queryClient.invalidateQueries({ queryKey: ['projectFiles', file.project_id] });
    },
    onError: (error: any) => {
      toast.error('Gagal memperbarui visibilitas file.', { description: error.message });
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: (id: string) => deleteProjectFile(file.project_id, id),
    onSuccess: () => {
      setIsDialogOpen(false);
      toast.success('File berhasil dihapus.');
      queryClient.invalidateQueries({ queryKey: ['projectFiles', file.project_id] });
    },
    onError: (error: any) => {
      toast.error('Gagal menghapus file.', { description: error.message });
    },
  });

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => window.open(file.file_url, '_blank')}>
          <Download className="mr-2 h-4 w-4" /> Download
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleVisibilityMutation.mutate(file.id)}>
          {file.visible_to_customer ? (
            <><EyeOff className="mr-2 h-4 w-4" /> Make Private</>
          ) : (
            <><Eye className="mr-2 h-4 w-4" /> Make Public</>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" /> Hapus File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Hapus project</DialogTitle>
						<DialogDescription>
							Apakah Anda yakin ingin menghapus file{" "}
							<strong>{file.name}</strong>?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsDialogOpen(false)}
						>
							Batal
						</Button>
						<Button type="submit" variant="destructive" onClick={() => deleteFileMutation.mutate(file.id)} >
							Hapus
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
    </>
  );
};
