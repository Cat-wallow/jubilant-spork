"use client";

import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadAreaProps {
	onFilesUploaded: (files: File[]) => void;
}

export function FileUploadArea({ onFilesUploaded }: FileUploadAreaProps) {
	const [isDragging, setIsDragging] = useState(false);

	const handleDrag = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDragIn = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setIsDragging(true);
		}
	}, []);

	const handleDragOut = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);

			if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
				const filesArray = Array.from(e.dataTransfer.files);
				onFilesUploaded(filesArray);
			}
		},
		[onFilesUploaded],
	);

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const filesArray = Array.from(e.target.files);
			onFilesUploaded(filesArray);
		}
	};

	return (
		<div
			className={cn(
				"flex h-[200px] flex-col items-center justify-center gap-2.5 rounded-[20px] border-2 border-dashed border-[#D9D9D9]",
				isDragging && "border-[#332687] bg-[#F4F7FE]",
			)}
			onDragEnter={handleDragIn}
			onDragLeave={handleDragOut}
			onDragOver={handleDrag}
			onDrop={handleDrop}
		>
			<Upload className="h-[50px] w-[50px] text-[#332687]" />
			<div className="flex flex-col items-center justify-center">
				<h3 className="font-roboto text-[22px] font-medium leading-7 text-[#2B3674]">
					Drag and drop files here
				</h3>
				<p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
					or click to browse
				</p>
			</div>
			<label htmlFor="file-upload">
				<Button
					type="button"
					className="h-auto rounded-[10px] bg-[#332687] px-4 py-2 font-roboto text-sm font-medium leading-5 tracking-[0.1px]"
					onClick={() => document.getElementById("file-upload")?.click()}
				>
					Choose File
				</Button>
				<input
					id="file-upload"
					type="file"
					multiple
					className="hidden"
					onChange={handleFileInput}
				/>
			</label>
		</div>
	);
}
