"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FileUploaderProps {
	value: File[] | null;
	onValueChange: (files: File[] | null) => void;
	dropzoneOptions?: DropzoneOptions;
	className?: string;
	disabled?: boolean;
	texts?: {
		title?: string;
		subtitle?: string;
		fileTypes?: string;
		aspectRatioError?: string;
	};
	existingFileUrl?: string | null;
	onRemoveExisting?: () => void;
	aspectRatio?: number; // e.g., 1 for 1:1, 16/9 for 16:9
}

export function FileUploader({
	value,
	onValueChange,
	dropzoneOptions,
	className,
	disabled,
	texts = {},
	existingFileUrl,
	onRemoveExisting,
	aspectRatio,
}: FileUploaderProps) {
	const [internalErrors, setInternalErrors] = useState<FileRejection[]>([]);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const hasNewFile = value && value.length > 0;
	const hasExistingFile = !!existingFileUrl;

	// Effect to create or revoke preview URL for new files
	useEffect(() => {
		if (hasNewFile) {
			const objectUrl = URL.createObjectURL(value[0]);
			setPreviewUrl(objectUrl);

			return () => URL.revokeObjectURL(objectUrl);
		} else if (hasExistingFile) {
			setPreviewUrl(existingFileUrl);
		} else {
			setPreviewUrl(null);
		}
	}, [value, existingFileUrl, hasNewFile, hasExistingFile]);

	const onDrop = useCallback(
		async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			const allErrors: FileRejection[] = [...fileRejections];
			let validFiles: File[] = [];

			if (aspectRatio && acceptedFiles.length > 0) {
				for (const file of acceptedFiles) {
					const error = await new Promise<{
						code: string;
						message: string;
					} | null>((resolve) => {
						if (!file.type.startsWith("image/")) {
							// This check is secondary; dropzone's `accept` option is primary
							resolve(null);
							return;
						}
						const objectUrl = URL.createObjectURL(file);
						const img = new window.Image();
						img.onload = () => {
							URL.revokeObjectURL(objectUrl);
							const actualRatio = img.width / img.height;
							if (Math.abs(actualRatio - aspectRatio) > 0.01) {
								resolve({
									code: "invalid-aspect-ratio",
									message:
										texts.aspectRatioError ||
										`Image aspect ratio must be ~${aspectRatio.toFixed(2)}`,
								});
							} else {
								resolve(null);
							}
						};
						img.onerror = () => {
							URL.revokeObjectURL(objectUrl);
							resolve({
								code: "image-load-error",
								message: "Could not load image to validate.",
							});
						};
						img.src = objectUrl;
					});

					if (error) {
						allErrors.push({ file, errors: [error] });
					} else {
						validFiles.push(file);
					}
				}
			} else {
				validFiles = acceptedFiles;
			}

			setInternalErrors(allErrors);

			if (allErrors.length > 0) {
				onValueChange(null);
			} else {
				onValueChange(validFiles);
			}
		},
		[aspectRatio, onValueChange, texts.aspectRatioError],
	);

	const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (hasNewFile) {
			onValueChange(null);
		} else if (hasExistingFile && onRemoveExisting) {
			onRemoveExisting();
		}
		setPreviewUrl(null);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		...dropzoneOptions,
		onDrop,
		disabled: !!previewUrl || disabled, // Disable dropzone when a file is being previewed
	});

	useEffect(() => {
		if (value === null) {
			setInternalErrors([]);
		}
	}, [value]);

	const {
		title = "Click to upload or drag and drop",
		subtitle = "",
		fileTypes = "Any file",
	} = texts;

	return (
		<div className={`w-full ${className}`}>
			<div
				{...getRootProps()}
				className={cn(
					"relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center transition-colors",
					isDragActive && !previewUrl
						? "border-primary bg-accent"
						: "border-border",
					disabled && "cursor-not-allowed opacity-50",
					!previewUrl && "hover:border-primary/50",
					previewUrl && "border-solid p-0", // Adjust padding and border when showing preview
					className,
				)}
			>
				<input {...getInputProps()} />

				{previewUrl ? (
					<div className="relative h-48 w-full">
						<Image
							src={previewUrl}
							alt="Preview"
							layout="fill"
							objectFit="contain"
							className="rounded-lg"
						/>
					</div>
				) : (
					<div className="space-y-2 p-4">
						<Upload className="mx-auto h-12 w-12 text-primary" />
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

			{previewUrl && !disabled && (
				<Button
					type="button"
					variant="link"
					size="sm"
					className="mt-2 text-destructive"
					onClick={handleRemove}
				>
					Hapus
				</Button>
			)}

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
