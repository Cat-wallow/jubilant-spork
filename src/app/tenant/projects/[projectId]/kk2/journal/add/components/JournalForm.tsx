"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { JournalLinesTable } from "./JournalLinesTable";
import { DocumentUpload } from "./DocumentUpload";
import { FileEdit, Table2, Paperclip } from "lucide-react";

export function JournalForm() {
	const [voucherType, setVoucherType] = useState("MJV");
	const [currency, setCurrency] = useState("IDR");

	return (
		<>
			{/* Informasi Voucher Card */}
			<Card className="flex flex-col items-start gap-[21px] self-stretch rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
				<CardHeader className="flex w-[1010.6px] flex-col items-start justify-end gap-[5.25px]">
					<CardTitle className="flex h-[18px] w-[969px] items-start gap-[7px]">
						<FileEdit className="h-[18px] w-[18px] " />
						<span className="text-[15.75px] font-medium leading-[15.75px] tracking-[-0.394px] ">
							Informasi Voucher
						</span>
					</CardTitle>
					<CardDescription className="flex h-5 items-center text-xs leading-[19.6px] text-[#64748B]">
						Isi informasi dasar voucher jurnal manual
					</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col items-start gap-[14px] self-stretch">
					{/* Row 1: Tipe, Tanggal, Mata Uang */}
					<div className="flex items-start justify-end gap-[14px] self-stretch">
						<div className="flex w-[314px] flex-col items-start gap-[7px]">
							<Label className="flex h-[12.25px] items-center gap-[7px] self-stretch text-xs font-medium leading-[12.25px] ">
								Tipe Voucher *
							</Label>
							<Select value={voucherType} onValueChange={setVoucherType}>
								<SelectTrigger className="h-[31.5px] self-stretch rounded-[5.25px] border-[0.8px] border-[rgba(0,0,0,0.08)]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="MJV">
										MJV - Manual Journal Voucher
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="flex w-[314px] flex-col items-start gap-[7px]">
							<Label className="text-xs font-medium leading-[12.25px] ">
								Tanggal Voucher *
							</Label>
							<Input
								type="date"
								className="h-[31.5px] self-stretch rounded-[5.25px] border-[0.8px] border-[rgba(0,0,0,0.08)]"
							/>
						</div>

						<div className="flex w-[314px] flex-col items-start gap-[7px]">
							<Label className="text-xs font-medium leading-[12.25px] ">
								Mata Uang
							</Label>
							<Select value={currency} onValueChange={setCurrency}>
								<SelectTrigger className="h-[31.5px] self-stretch rounded-[5.25px] border-[0.8px] border-[rgba(0,0,0,0.08)]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="IDR">IDR - Rupiah</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Narasi Voucher */}
					<div className="flex flex-col items-start gap-[7px] self-stretch">
						<Label className="text-xs font-medium leading-[12.25px] ">
							Narasi Voucher *
						</Label>
						<Textarea
							placeholder="Deskripsi transaksi atau adjustment..."
							className="h-14 self-stretch rounded-[5.25px] border-[0.8px] border-[rgba(0,0,0,0.08)] text-xs leading-[17.5px] text-[#64748B]"
						/>
					</div>

					{/* Checkbox */}
					<div className="flex items-center gap-[7px] self-stretch">
						<Checkbox
							id="adjustment"
							className="h-[14px] w-[14px] rounded border-[0.8px] border-[rgba(0,0,0,0.15)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
						/>
						<Label
							htmlFor="adjustment"
							className="flex h-[17.5px] w-[212.6px] items-center gap-[7px] text-xs font-medium leading-[17.5px] "
						>
							Ini adalah voucher adjustment/koreksi
						</Label>
					</div>
				</CardContent>
			</Card>

			{/* Baris Jurnal Card */}
			<JournalLinesTable />

			{/* Lampiran Dokumen Card */}
			<DocumentUpload />
		</>
	);
}
