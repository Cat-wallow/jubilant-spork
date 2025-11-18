'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';
import { Upload, File as FileIcon, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Define the props for the component
interface FileUploaderProps {
  value: File[] | null;
  onValueChange: (files: File[] | null) => void;
  dropzoneOptions?: DropzoneOptions;
  customValidator?: (
    file: File,
  ) => Promise<{ code: string; message: string } | null>;
  className?: string;
  disabled?: boolean;
  texts?: {
    title?: string;
    subtitle?: string;
    fileTypes?: string;
  };
}

export function FileUploader({
  value,
  onValueChange,
  dropzoneOptions,
  customValidator,
  className,
  disabled,
  texts = {},
}: FileUploaderProps) {
  const [internalErrors, setInternalErrors] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setInternalErrors([]); // Clear previous errors

      if (fileRejections.length > 0) {
        setInternalErrors(fileRejections);
        onValueChange(null);
        return;
      }

      if (acceptedFiles.length > 0) {
        if (customValidator) {
          const validationResults = await Promise.all(
            acceptedFiles.map(customValidator),
          );
          const validationErrors = validationResults
            .map((error, index) =>
              error ? { file: acceptedFiles[index], errors: [error] } : null,
            )
            .filter((e): e is FileRejection => e !== null);

          if (validationErrors.length > 0) {
            setInternalErrors(validationErrors);
            onValueChange(null);
            return;
          }
        }
        onValueChange(acceptedFiles);
      }
    },
    [customValidator, onValueChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...dropzoneOptions,
    onDrop,
    disabled,
  });

  // Synchronize react-hook-form's value with the component's display
  useEffect(() => {
    if (value === null || (Array.isArray(value) && value.length === 0)) {
      // If form value is cleared externally, clear errors too
      setInternalErrors([]);
    }
  }, [value]);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const {
    title = 'Click to upload or drag and drop',
    subtitle = '',
    fileTypes = 'Any file',
  } = texts;

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          isDragActive
            ? 'border-primary bg-accent'
            : 'border-border hover:border-primary/50',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <input {...getInputProps()} />

        {value && value.length > 0 ? (
          <div className="space-y-2 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            {value.map((file) => (
              <div key={file.name}>
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.size)}
                </p>
              </div>
            ))}
            <Button
              type="button"
              variant="link"
              size="sm"
              className="text-destructive"
              onClick={(e) => {
                e.stopPropagation(); // prevent dropzone from opening
                onValueChange(null);
              }}
              disabled={disabled}
            >
              Remove file
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-semibold text-primary">{title}</span>
              {subtitle && (
                <span className="text-muted-foreground"> {subtitle}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{fileTypes}</p>
          </div>
        )}
      </div>

      {internalErrors.length > 0 && (
        <div className="mt-2 text-sm text-destructive">
          {internalErrors.map(({ file, errors }) => (
            <div key={file.name}>
              <p className="font-semibold">{file.name}:</p>
              <ul className="list-disc pl-5">
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
