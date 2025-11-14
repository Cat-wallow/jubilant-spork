'use client';

import { useState, useRef } from 'react';
import { X, Upload, Download, CheckCircle, XCircle } from 'lucide-react';
import { useImportUsers } from 'hooks/useTenantUsers';

interface ImportUsersModalProps {
  tenantId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ImportUsersModal({ tenantId, onClose, onSuccess }: ImportUsersModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importMutation = useImportUsers(tenantId);
  const [headerError, setHeaderError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragleave') {
      setDragActive(e.type === 'dragenter');
    } else if (e.type === 'dragover') {
      setDragActive(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
        validateCsvHeader(droppedFile);
      } else {
        alert('Please upload a CSV file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateCsvHeader(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    try {
      await importMutation.mutateAsync(file);
      onSuccess();
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

  const validateCsvHeader = (f: File) => {
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
          setHeaderError('CSV harus memiliki header: email,name,role');
          setFile(null);
        } else {
          setHeaderError(null);
          setFile(f);
        }
      } catch (e) {
        setHeaderError('Gagal membaca file CSV. Pastikan format benar.');
        setFile(null);
      }
    };
    reader.onerror = () => {
      setHeaderError('Gagal membaca file CSV.');
      setFile(null);
    };
    reader.readAsText(f.slice(0, 1024));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 dark:bg-navy-800">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy-700 dark:text-white">
            Import User dari CSV
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-navy-700"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Download Template */}
        <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <div className="flex items-start gap-3">
            <Download className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200">
                Download Template CSV
              </h3>
              <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                Format: email, name, role
              </p>
              <button
                onClick={downloadTemplate}
                className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Download template →
              </button>
            </div>
          </div>
        </div>

        {/* Error/Success Message */}
        {headerError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <span>{headerError}</span>
          </div>
        )}
        {importMutation.error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <span>
              {(importMutation.error as any)?.response?.data?.message ||
                'Gagal import users. Silakan cek format CSV Anda.'}
            </span>
          </div>
        )}

        {importMutation.isSuccess && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span>Import berhasil! User akan menerima email undangan.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              dragActive
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/10'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />

            {file ? (
              <div className="space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm font-medium text-navy-700 dark:text-white">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                  >
                    Click to upload
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {' '}
                    or drag and drop
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  CSV file only
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-navy-700"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!file || importMutation.isPending}
              className="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {importMutation.isPending ? 'Importing...' : 'Import Users'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
