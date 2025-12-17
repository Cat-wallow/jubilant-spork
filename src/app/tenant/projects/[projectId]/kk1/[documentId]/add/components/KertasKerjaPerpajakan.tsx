"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo } from "react";
import { FileUploader } from "@/components/shared/FileUploader";
import { Button } from "@/components/ui/button";
import { X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface KertasKerjaPerpajakanProps {
	taxTypeOptions: { id: string; name: string; type: string }[];
}

export default function KertasKerjaPerpajakan({
	taxTypeOptions,
}: KertasKerjaPerpajakanProps) {
	const {
		register,
		watch,
		setValue,
		formState: { errors },
	} = useFormContext();

	const currency = watch("currency") || "IDR";
	const transactionTaxes = watch("transaction_taxes") || {};
	const taxProofFiles = watch("tax_proof_files") || [];
    const taxErrors = errors.transaction_taxes as any;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	};

	// Calculate total tax nominal
	const totalTaxNominal = useMemo(() => {
		const fields = [
			"tax_deposit",
			"ppn",
			"pph_21",
			"pph_23",
			"pph_4_2",
			"pph_credit",
			"other_pph",
		];
		return fields.reduce(
			(sum, field) => sum + (Number(transactionTaxes[field]) || 0),
			0,
		);
	}, [transactionTaxes]);

	// Determine if any tax input is filled for conditional validation
	const isAnyTaxInputFilled = useMemo(() => {
		const fields = [
			"tax_deposit",
			"ppn",
			"pph_21",
			"pph_23",
			"pph_4_2",
			"pph_credit",
			"other_pph",
		];
		return fields.some(
			(field) =>
				transactionTaxes[field] !== undefined &&
				transactionTaxes[field] !== null &&
				transactionTaxes[field] !== 0 &&
				transactionTaxes[field] !== "",
		);
	}, [transactionTaxes]);

	const handleFilesAdded = (files: File[] | null) => {
		if (files && files.length > 0) {
			const newFiles = files.map((file) => ({
				id: file.name + file.size + Date.now(),
				file_name: file.name,
				file_url: URL.createObjectURL(file),
				file: file,
			}));
			setValue("tax_proof_files", [...taxProofFiles, ...newFiles], {
				shouldValidate: true,
			});
		}
	};

	const handleRemoveFile = (id: string) => {
		setValue(
			"tax_proof_files",
			taxProofFiles.filter((file: any) => file.id !== id),
			{ shouldValidate: true },
		);
	};

	return (
		<Card className="flex-1 rounded-xl border p-5">
			<div className="mb-5 flex items-center justify-between">
				<CardTitle className="text-xl">
					Kertas Kerja Perpajakan (Objek Pajak)
				</CardTitle>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{/* Explicit Rows */}
				<div className="flex gap-5 items-center">
					<div className="flex flex-1 flex-col gap-2">
						<Label>Setoran Pajak (KK-1.7.1)</Label>
						<Input
							type="number"
							//
							placeholder="0"
                            className={cn(taxErrors?.tax_deposit && "border-red-500")}
							{...register("transaction_taxes.tax_deposit", {
								valueAsNumber: true,
							})}
						/>
                        {taxErrors?.tax_deposit && <p className="text-xs text-red-500">{taxErrors.tax_deposit.message}</p>}
					</div>
				</div>
				<div className="flex gap-5 items-center">
					<div className="flex flex-1 flex-col gap-2">
						<Label>PPN (KK-1.7.2)</Label>
						<Input
							type="number"

							placeholder="0"
                            className={cn(taxErrors?.ppn && "border-red-500")}
							{...register("transaction_taxes.ppn", { valueAsNumber: true })}
						/>
                        {taxErrors?.ppn && <p className="text-xs text-red-500">{taxErrors.ppn.message}</p>}
					</div>
				</div>
				<div className="flex gap-5 items-center">
					<div className="flex flex-1 flex-col gap-2">
						<Label>PPh Pasal 21 (KK-1.7.3)</Label>
						<Input
							type="number"

							placeholder="0"
                            className={cn(taxErrors?.pph_21 && "border-red-500")}
							{...register("transaction_taxes.pph_21", { valueAsNumber: true })}
						/>
                        {taxErrors?.pph_21 && <p className="text-xs text-red-500">{taxErrors.pph_21.message}</p>}
					</div>
				</div>
				<div className="flex gap-5 items-center">
					<div className="flex flex-1 flex-col gap-2">
						<Label>PPh Pasal 23 (KK-1.7.3)</Label>
						<Input
							type="number"

							placeholder="0"
                            className={cn(taxErrors?.pph_23 && "border-red-500")}
							{...register("transaction_taxes.pph_23", { valueAsNumber: true })}
						/>
                        {taxErrors?.pph_23 && <p className="text-xs text-red-500">{taxErrors.pph_23.message}</p>}
					</div>
				</div>
				<div className="flex gap-5 items-center">
					<div className="flex flex-1 flex-col gap-2">
						<Label>PPh Pasal 4(2) (KK-1.7.3)</Label>
						<Input
							type="number"

							placeholder="0"
                            className={cn(taxErrors?.pph_4_2 && "border-red-500")}
							{...register("transaction_taxes.pph_4_2", {
								valueAsNumber: true,
							})}
						/>
                        {taxErrors?.pph_4_2 && <p className="text-xs text-red-500">{taxErrors.pph_4_2.message}</p>}
					</div>
				</div>
				<div className="flex gap-5 items-center">
					<div className="flex flex-1 flex-col gap-2">
						<Label>Piutang/Kredit PPh dipot/put pihak lain (KK-1.7.6)</Label>
						<Input
							type="number"

							placeholder="0"
                            className={cn(taxErrors?.pph_credit && "border-red-500")}
							{...register("transaction_taxes.pph_credit", {
								valueAsNumber: true,
							})}
						/>
                        {taxErrors?.pph_credit && <p className="text-xs text-red-500">{taxErrors.pph_credit.message}</p>}
					</div>
				</div>
				<div className="flex gap-5 items-center">
					<div className="flex flex-1 flex-col gap-2">
						<Label>P2Ph Lainnya (KK-1.7.7)</Label>
						<Input
							type="number"

							placeholder="0"
                            className={cn(taxErrors?.other_pph && "border-red-500")}
							{...register("transaction_taxes.other_pph", {
								valueAsNumber: true,
							})}
						/>
                        {taxErrors?.other_pph && <p className="text-xs text-red-500">{taxErrors.other_pph.message}</p>}
					</div>
				</div>
			</div>

			{/* Upload Bukti Potong / Setor Pajak */}
			<div className="mt-8 flex flex-col gap-4">
				<h3 className="text-sm font-medium">
					Upload Bukti Potong / Setor Pajak
					{isAnyTaxInputFilled && <span className="text-red-500 ml-1">*</span>}
				</h3>

				{/* Existing Files List */}
				{taxProofFiles.length > 0 && (
					<div className="flex flex-col gap-2 mb-2">
						{taxProofFiles.map((file: any, fileIndex: number) => (
							<div
								key={file.id || fileIndex}
								className="flex items-center justify-between rounded-md border p-2 bg-white"
							>
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4 text-blue-500" />
									<span className="text-sm truncate max-w-[200px]">
										{file.file_name}
									</span>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={() => handleRemoveFile(file.id)}
									className="h-8 w-8"
								>
									<X className="h-4 w-4 text-red-500" />
								</Button>
							</div>
						))}
					</div>
				)}

				{/* File Uploader Component */}
				<FileUploader
					value={null}
					onValueChange={handleFilesAdded}
					dropzoneOptions={{
						maxFiles: 5,
						maxSize: 5 * 1024 * 1024,
						accept: {
							"image/*": [],
							"application/pdf": [],
						},
					}}
					texts={{
						title: "Klik atau drag & drop file di sini",
						subtitle: "Upload bukti potong/setor pajak",
						fileTypes: "PDF, JPG, PNG (Max 5MB)",
					}}
				/>

				{errors.tax_proof_files && isAnyTaxInputFilled && (
					<p className="text-red-500 text-sm mt-1">
						{errors.tax_proof_files.message as string}
					</p>
				)}
			</div>
		</Card>
	);
}
