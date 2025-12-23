"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";

interface PphDetail {
	name: string;
	dpp: string;
	tarif: string;
	amount: string;
}

interface PphArticleData {
	pasal: string;
	title: string;
	objekPajak: string;
	dpp: string;
	tarif: string;
	pphDipotong: string;
	jumlahBuktiPotong: string;
	details: PphDetail[];
}

interface PphArticleCardProps {
	data: PphArticleData;
}

export function PphArticleCard({ data }: PphArticleCardProps) {
	return (
		<Card className="rounded-[14px] border-[0.8px]  p-6">
			{/* Header */}
			<CardHeader className="flex flex-row items-center justify-between p-0 pb-3">
				<div className="flex items-start gap-2">
					<Badge
						variant="secondary"
						className="rounded-lg bg-[#DBEAFE]  text-xs text-primary"
					>
						{data.pasal}
					</Badge>
					<p className=" text-base ">{data.title}</p>
				</div>
				<div className="flex flex-col items-end gap-1">
					<p className=" text-lg font-bold leading-7 ">{data.pphDipotong}</p>
					<p className=" text-base text-muted-foreground">
						{data.jumlahBuktiPotong}
					</p>
				</div>
			</CardHeader>

			<CardContent className="flex flex-col gap-3 p-0">
				{/* Summary Cards */}
				<div className="flex items-center gap-[30px]">
					<div className="flex h-[68px] flex-1 flex-col border items-start gap-1 rounded-[10px] bg-muted p-3">
						<p className=" text-sm text-muted-foreground">Objek Pajak</p>
						<p className=" text-base font-bold ">{data.objekPajak}</p>
					</div>
					<Card className="flex h-[68px] flex-1 flex-col border items-start gap-1 rounded-[10px] bg-muted p-3">
						<p className=" text-sm text-muted-foreground">DPP</p>
						<p className=" text-base font-bold ">{data.dpp}</p>
					</Card>
					<Card className="flex h-[68px] flex-1 flex-col border items-start gap-1 rounded-[10px] bg-muted p-3">
						<p className=" text-sm text-muted-foreground">Tarif</p>
						<p className=" text-base font-bold ">{data.tarif}</p>
					</Card>
					<Card className="flex h-[68px] flex-1 flex-col border items-start gap-1 rounded-[10px] bg-muted p-3">
						<p className=" text-sm text-muted-foreground">PPh Dipotong</p>
						<p className=" text-base font-bold bg-muted">{data.pphDipotong}</p>
					</Card>
					<Card className="flex h-[68px] flex-1 flex-col border items-start gap-1 rounded-[10px] bg-muted p-3">
						<p className=" text-sm text-muted-foreground">
							Jumlah Bukti Potong
						</p>
						<p className=" text-base font-bold bg-muted">
							{data.jumlahBuktiPotong}
						</p>
					</Card>
				</div>

				{/* Separator */}
				<div className="h-px" />

				{/* Detail Perhitungan */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2 pb-1">
						<Building className="h-4 w-4" />
						<p className=" text-base ">Detail Perhitungan</p>
					</div>

					{data.details.map((detail, index) => (
						<div
							key={index}
							className="flex items-center justify-between rounded-[10px] border-[0.8px]  px-3 py-4"
						>
							<div className="flex flex-col gap-1">
								<p className=" text-base ">{detail.name}</p>
								<p className=" text-sm text-muted-foreground">
									DPP: {detail.dpp} × {detail.tarif}
								</p>
							</div>
							<div className="flex items-center gap-3">
								<p className=" text-base font-bold ">{detail.amount}</p>
								<Badge variant="outline" className="rounded-lg   text-xs">
									{detail.tarif}
								</Badge>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
