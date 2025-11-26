'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Download, CheckCircle, XCircle } from 'lucide-react';
import { useImportUsers } from '@/hooks/useTenantUsers';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileUploader } from '@/components/shared/FileUploader';
import { useEffect } from 'react';

interface ImportUsersModalProps {
  tenantId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Schema now only validates that a file instance is present.
// Dropzone and custom validator will handle the rest.
const importSchema = z.object({
  file: z.instanceof(File).nullable(),
});

export default function ImportUsersModal({
  tenantId,
  isOpen,
  onClose,
  onSuccess,
}: ImportUsersModalProps) {
  const importMutation = useImportUsers(tenantId);

  const form = useForm<z.infer<typeof importSchema>>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      file: null,
    },
  });

  const { watch, setValue, handleSubmit, reset } = form;
  const file = watch('file');

  // Reset form and mutation state when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      reset();
      importMutation.reset();
    }
  }, [isOpen, reset, importMutation.reset]);

  const handleClose = () => {
    reset();
    importMutation.reset();
    onClose();
  };

  const csvHeaderValidator = (file: File): Promise<{ code: string; message: string } | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = (reader.result as string) || '';
          const firstLine = text.split(/\r?\n/)[0] || '';
          const headers = firstLine.split(',').map((h) => h.trim().toLowerCase());
          const hasEmail = headers.includes('email');
          const hasName = headers.includes('name') || headers.includes('nama');
          const hasRole = headers.includes('role');

          if (!hasEmail || !hasName || !hasRole) {
            resolve({
              code: 'invalid-header',
              message: 'CSV must include headers: email, name, role',
            });
          } else {
            resolve(null); // Validation passed
          }
        } catch (e) {
          resolve({
            code: 'read-error',
            message: 'Failed to read CSV file. Please check the format.',
          });
        }
      };
      reader.onerror = () => {
        resolve({ code: 'read-error', message: 'Failed to read CSV file.' });
      };
      // Read only the first 1KB to check headers, for performance
      reader.readAsText(file.slice(0, 1024));
    });
  };

  const onSubmit = async (data: z.infer<typeof importSchema>) => {
    if (!data.file) return;
    try {
      await importMutation.mutateAsync(data.file);
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Failed to import users:', error);
    }
  };

  const downloadTemplate = () => {
    const csvContent = 'email,name,role\nuser@example.com,John Doe,wajib_pajak\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template-import-users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import User dari CSV</DialogTitle>
        </DialogHeader>

        <Alert>
          <Download className="h-4 w-4" />
          <AlertTitle>Download Template</AlertTitle>
          <AlertDescription>
            Format CSV harus: email, name, role.
            <Button variant="link" onClick={downloadTemplate} className="ml-1 h-auto p-0">
              Download di sini.
            </Button>
          </AlertDescription>
        </Alert>

        {importMutation.error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Import Failed</AlertTitle>
            <AlertDescription>
              {(importMutation.error as any)?.response?.data?.message ||
                'Gagal import users. Silakan cek format CSV Anda.'}
            </AlertDescription>
          </Alert>
        )}
        {importMutation.isSuccess && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Import berhasil! User akan menerima email undangan.</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FileUploader
            value={file ? [file] : null}
            onValueChange={(files) => setValue('file', files?.[0] || null)}
            dropzoneOptions={{
              accept: { 'text/csv': ['.xlsx', '.xls', '.csv'] },
              maxFiles: 1,
              maxSize: 1024 * 1024 * 5, // 5MB
            }}
            customValidator={csvHeaderValidator}
            texts={{
              title: 'Click to upload or drag and drop',
              fileTypes: 'CSV file up to 5MB',
            }}
            disabled={importMutation.isPending}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit" disabled={!file || importMutation.isPending}>
              {importMutation.isPending ? 'Importing...' : 'Import Users'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
