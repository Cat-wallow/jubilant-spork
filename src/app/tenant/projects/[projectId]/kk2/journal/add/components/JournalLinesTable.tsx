"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Plus, Table2 } from "lucide-react";
import { accountOptions } from "../../mock-data";

interface JournalLine {
	id: string;
	accountCode: string;
	accountName: string;
	debit: string;
	credit: string;
	notes: string;
}

export function JournalLinesTable() {
	const [lines, setLines] = useState<JournalLine[]>([
		{
			id: "1",
			accountCode: "1110",
			accountName: "Kas",
			debit: "1000000",
			credit: "0",
			notes: "",
		},
		{
			id: "2",
			accountCode: "1140",
			accountName: "Biaya Dibayar Dimuka",
			debit: "0",
			credit: "1000000",
			notes: "",
		},
		{
			id: "3",
			accountCode: "2120",
			accountName: "Utang Bank",
			debit: "1000000",
			credit: "0",
			notes: "",
		},
		{
			id: "4",
			accountCode: "1120",
			accountName: "Piutang Usaha",
			debit: "1000000",
			credit: "0",
			notes: "",
		},
		{
			id: "5",
			accountCode: "",
			accountName: "",
			debit: "0",
			credit: "0",
			notes: "",
		},
		{
			id: "6",
			accountCode: "",
			accountName: "",
			debit: "0",
			credit: "0",
			notes: "",
		},
	]);

	const handleAccountChange = (id: string, accountCode: string) => {
		const account = accountOptions.find((acc) => acc.code === accountCode);
		if (account) {
			setLines((prev) =>
				prev.map((line) =>
					line.id === id
						? { ...line, accountCode, accountName: account.name }
						: line,
				),
			);
		}
	};

	const addLine = () => {
		setLines((prev) => [
			...prev,
			{
				id: String(prev.length + 1),
				accountCode: "",
				accountName: "",
				debit: "0",
				credit: "0",
				notes: "",
			},
		]);
	};

	return (
		<Card className="flex flex-col items-start gap-[26.25px] self-stretch rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
			<CardHeader className="flex h-[37.1px] items-center justify-between self-stretch">
				<div className="flex w-[294.712px] flex-col items-start">
					<div className="flex h-[17.5px] items-start gap-[7px] self-stretch">
						<Table2 className="h-[18px] w-[18px] " />
						<span className="text-[15.75px] font-medium leading-[15.75px] tracking-[-0.394px] ">
							Baris Jurnal
						</span>
					</div>
					<div className="flex items-center justify-end self-stretch text-xs leading-[19.6px] text-[#64748B]">
						Tambahkan baris debit dan kredit untuk voucher jurnal
					</div>
				</div>
				<Button
					onClick={addLine}
					className="flex justify-end items-end gap-[7px] rounded-[5.25px] bg-primary hover:bg-primary/90"
				>
					<Plus className="h-[14px] w-[14px]" />
					<span className="text-xs font-medium leading-[17.5px]">
						Tambah Baris
					</span>
				</Button>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col items-start self-stretch">
				<Table>
					<TableHeader>
						<TableRow className="h-[35px] border-b-[0.8px] border-[rgba(0,0,0,0.15)]">
							<TableHead className="w-[213px] text-xs font-medium leading-[17.5px] ">
								Akun *
							</TableHead>
							<TableHead className="text-xs font-medium leading-[17.5px] ">
								Nama Akun
							</TableHead>
							<TableHead className="w-[130px] text-xs font-medium leading-[17.5px] ">
								Debit
							</TableHead>
							<TableHead className="w-[130px] text-xs font-medium leading-[17.5px] ">
								Kredit
							</TableHead>
							<TableHead className="w-[256px] text-xs font-medium leading-[17.5px] ">
								Catatan
							</TableHead>
							<TableHead className="w-[46px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{lines.map((line) => (
							<TableRow
								key={line.id}
								className="h-[46px] border-b-[0.8px] border-[rgba(0,0,0,0.15)]"
							>
								<TableCell className="p-2">
									<Select
										value={line.accountCode}
										onValueChange={(value) =>
											handleAccountChange(line.id, value)
										}
									>
										<SelectTrigger className="h-8 rounded-[5.25px] border-[0.8px] border-[rgba(0,0,0,0.08)]">
											<SelectValue placeholder="Pilih" />
										</SelectTrigger>
										<SelectContent>
											{accountOptions.map((account) => (
												<SelectItem key={account.code} value={account.code}>
													{account.code} - {account.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</TableCell>
								<TableCell className="p-2">
									<span className="text-xs leading-[17.5px] ">
										{line.accountName}
									</span>
								</TableCell>
								<TableCell className="p-2">
									<Input
										type="text"
										value={line.debit}
										onChange={(e) =>
											setLines((prev) =>
												prev.map((l) =>
													l.id === line.id
														? { ...l, debit: e.target.value }
														: l,
												),
											)
										}
										className="h-8 rounded-[5.25px] border-[0.8px] border-[rgba(0,0,0,0.08)] text-xs text-[#64748B]"
									/>
								</TableCell>
								<TableCell className="p-2">
									<Input
										type="text"
										value={line.credit}
										onChange={(e) =>
											setLines((prev) =>
												prev.map((l) =>
													l.id === line.id
														? { ...l, credit: e.target.value }
														: l,
												),
											)
										}
										className="h-8 rounded-[5.25px] border-[0.8px] border-[rgba(0,0,0,0.08)] text-xs text-[#64748B]"
									/>
								</TableCell>
								<TableCell className="p-2">
									<Input
										type="text"
										placeholder="Catatan opsional"
										value={line.notes}
										onChange={(e) =>
											setLines((prev) =>
												prev.map((l) =>
													l.id === line.id
														? { ...l, notes: e.target.value }
														: l,
												),
											)
										}
										className="h-8 rounded-[5.25px] border-[0.8px] border-[rgba(0,0,0,0.08)] text-xs text-[#64748B] placeholder:text-[#64748B]"
									/>
								</TableCell>
								<TableCell className="p-2">
									<Button
										variant="ghost"
										size="icon"
										className="h-7 w-8 rounded-[5.25px]"
									>
										{/* Delete icon can go here */}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
