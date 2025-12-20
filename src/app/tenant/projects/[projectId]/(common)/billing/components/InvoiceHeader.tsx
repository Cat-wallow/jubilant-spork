"use client";

import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export function InvoiceHeader() {
	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
			<div className="flex flex-col">
				<h2 className="font-dm text-2xl font-bold leading-8 text-primary">
					Invoice
				</h2>
				<p className=" text-xs leading-4 text-primary">
					Kelola Invoice di dalam Project
				</p>
			</div>

			<div className="flex flex-wrap items-center justify-start gap-2.5 md:justify-end">
				<Button
					variant="outline"
					className="flex items-center gap-1 rounded-[10px] border "
				>
					<Download className="h-[30px] w-[30px] " />
					<span className=" text-sm font-medium leading-5 text-muted-foreground">
						Export XLSX
					</span>
				</Button>

				<Button
					variant="outline"
					className="flex items-center gap-1 rounded-[10px] border "
				>
					<Download className="h-[30px] w-[30px] " />
					<span className=" text-sm font-medium leading-5 text-muted-foreground">
						Export PDF
					</span>
				</Button>

				<Button className="flex h-12 items-center gap-1 rounded-[10px] bg-primary hover:bg-[#241963]">
					<Plus className="h-6 w-6" />
					<span className=" text-sm font-medium leading-5">Buat Invoice</span>
				</Button>
			</div>
		</div>
	);
}
