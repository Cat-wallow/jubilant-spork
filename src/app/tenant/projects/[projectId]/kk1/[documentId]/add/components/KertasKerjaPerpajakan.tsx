"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo } from "react"; // Added useEffect
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
    const calculatedTagihanExcludePajak = watch('calculated_tagihan_exclude_pajak') || 0;

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
			const newFiles = files?.map((file) => ({
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

	const handleFileClick = (url: string) => {
		window.open(url, "_blank");
	};

    const taxFields = useMemo(() => ([
        { name: "tax_deposit", label: "Setoran Pajak (KK-1.7.1)" },
        { name: "ppn", label: "PPN (KK-1.7.2)" },
        { name: "pph_21", label: "PPh Pasal 21 (KK-1.7.3)" },
        { name: "pph_23", label: "PPh Pasal 23 (KK-1.7.3)" },
        { name: "pph_4_2", label: "PPh Pasal 4(2) (KK-1.7.3)" },
        { name: "pph_credit", label: "Piutang/Kredit PPh dipot/put pihak lain (KK-1.7.6)" },
        { name: "other_pph", label: "P2Ph Lainnya (KK-1.7.7)" },
    ]), []);

    // Effect to calculate amount from percentage
    useEffect(() => {
        taxFields.forEach(field => {
            const percentage = watch(`transaction_taxes.${field.name}_percentage`);
            const currentAmount = watch(`transaction_taxes.${field.name}`);

            if (percentage !== undefined && calculatedTagihanExcludePajak !== 0) {
                const newAmount = (percentage / 100) * calculatedTagihanExcludePajak;
                if (newAmount !== currentAmount) {
                    setValue(`transaction_taxes.${field.name}`, newAmount, { shouldValidate: true });
                }
            } else if (percentage === undefined || calculatedTagihanExcludePajak === 0) {
                 // If percentage is cleared or base is zero, amount should be zero, but don't clear if existing amount is non-zero
                 if (currentAmount !== 0) {
                     // setValue(`transaction_taxes.${field.name}`, 0, { shouldValidate: true });
                 }
            }
        });
    }, [watch, setValue, calculatedTagihanExcludePajak, taxFields]);

    // Effect to calculate percentage from amount (for initial load/existing data)
    useEffect(() => {
        taxFields.forEach(field => {
            const amount = watch(`transaction_taxes.${field.name}`);
            const currentPercentage = watch(`transaction_taxes.${field.name}_percentage`);

            if (amount !== undefined && calculatedTagihanExcludePajak !== 0 && currentPercentage === undefined) {
                const newPercentage = (amount / calculatedTagihanExcludePajak) * 100;
                if (!isNaN(newPercentage) && newPercentage >= 0) { // Avoid NaN for division by zero
                    setValue(`transaction_taxes.${field.name}_percentage`, newPercentage, { shouldValidate: true });
                }
            }
        });
    }, [watch, setValue, calculatedTagihanExcludePajak, taxFields]);


	return (
		<Card className="flex-1 rounded-xl border p-5">
			<div className="mb-5 flex items-center justify-between">
				<CardTitle className="text-xl">
					Kertas Kerja Perpajakan (Objek Pajak)
				</CardTitle>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{/* Explicit Rows */}
                {taxFields.map((field) => (
                    <div key={field.name} className="flex gap-5 items-center">
                        <div className="flex flex-1 flex-col gap-2">
                            <Label>{field.label}</Label>
                            <div className="flex gap-2 items-center">
                                <Input
                                    type="number"
                                    placeholder="0"
                                    className={cn("w-20", taxErrors?.[`${field.name}_percentage`] && "border-red-500")}
                                    {...register(`transaction_taxes.${field.name}_percentage`, {
                                        valueAsNumber: true,
                                    })}
                                />
                                <span className="text-lg">%</span>
                                <Input
                                    type="number"
                                    readOnly
                                    placeholder="0"
                                    className={cn("flex-1 cursor-not-allowed", taxErrors?.[field.name] && "border-red-500")}
                                    {...register(`transaction_taxes.${field.name}`, {
                                        valueAsNumber: true,
                                    })}
                                />
                            </div>
                            {taxErrors?.[field.name] && <p className="text-xs text-red-500">{taxErrors[field.name].message}</p>}
                            {taxErrors?.[`${field.name}_percentage`] && <p className="text-xs text-red-500">{taxErrors[`${field.name}_percentage`].message}</p>}
                        </div>
                    </div>
                ))}
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
						{taxProofFiles?.map((file: any, fileIndex: number) => (
							<div
								key={file.id || fileIndex}
								onClick={() => handleFileClick(file.file_url)}
								className="flex items-center justify-between cursor-pointer rounded-md border p-2 bg-white"
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
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
							"text/csv": [],
							"application/vnd.ms-excel": [],
						},
					}}
					texts={{
						title: "Klik atau drag & drop file di sini",
						subtitle: "Upload bukti potong/setor pajak",
						fileTypes: "PDF, JPG, PNG, XLSX, CSV (Max 5MB)",
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
