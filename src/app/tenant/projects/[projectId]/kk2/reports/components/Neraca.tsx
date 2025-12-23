"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Download,
	FileText,
	TrendingUp,
	TrendingDown,
	DollarSign,
	Building2,
	X,
	AlertTriangle,
} from "lucide-react";
import { balanceSheetData, formatCurrency } from "../data/mockData";
import { Card } from "@/components/ui/card";

export default function Neraca() {
	const data = balanceSheetData;

	return (
		<Card className="space-y-4">
			{/* Main Card */}
			<div className="space-y-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] p-6">
				{/* Card Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Building2 className="h-5 w-5 " />
						<span className=" text-base ">Neraca (Balance Sheet)</span>
					</div>
					<div className="flex items-center gap-2">
						<Badge
							variant="destructive"
							className="gap-2 rounded-lg border-0 bg-gradient-to-r from-red-500 to-red-600"
						>
							<TrendingUp className="h-3 w-3" />
							Unbalanced
						</Badge>
						<Button
							variant="outline"
							size="sm"
							className="gap-2 rounded-lg border border-[rgba(0,0,0,0.1)]"
						>
							<Download className="h-4 w-4" />
							Export
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="gap-2 rounded-lg border border-[rgba(0,0,0,0.1)]"
						>
							<FileText className="h-4 w-4" />
							Print
						</Button>
					</div>
				</div>

				{/* Company Header */}
				<div className="space-y-1 text-center">
					<h1 className=" text-xl font-bold ">{data.companyName}</h1>
					<h2 className=" text-lg font-bold ">NERACA</h2>
					<p className=" text-sm text-muted-foreground">{data.reportDate}</p>
				</div>

				{/* Summary Cards */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{/* Total Aktiva */}
					<div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] p-4">
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<p className=" text-sm text-muted-foreground">Total Aktiva</p>
								<p className=" text-lg font-bold ">
									{formatCurrency(data.totalAktiva)}
								</p>
							</div>
							<div className="rounded-full bg-blue-50 p-2">
								<DollarSign className="h-6 w-6 text-[#2B7FFF]" />
							</div>
						</div>
					</div>

					{/* Total Kewajiban */}
					<div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] p-4">
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<p className=" text-sm text-muted-foreground">
									Total Kewajiban
								</p>
								<p className=" text-lg font-bold ">
									{formatCurrency(data.kewajiban.total)}
								</p>
							</div>
							<div className="rounded-full bg-red-50 p-2">
								<TrendingDown className="h-6 w-6 text-[#FB2C36]" />
							</div>
						</div>
					</div>

					{/* Total Modal */}
					<div className="rounded-[14px] border border-[rgba(0,0,0,0.1)] p-4">
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<p className=" text-sm text-muted-foreground">Total Modal</p>
								<p className=" text-lg font-bold ">
									{formatCurrency(data.modal.total)}
								</p>
							</div>
							<div className="rounded-full bg-green-50 p-2">
								<TrendingUp className="h-6 w-6 text-[#00C950]" />
							</div>
						</div>
					</div>
				</div>

				{/* Main Content - Two Columns */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{/* AKTIVA Column */}
					<div className="space-y-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] p-6">
						<h3 className=" text-base ">AKTIVA</h3>

						<div className="space-y-4">
							{/* AKTIVA LANCAR */}
							<div className="space-y-1">
								<div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
									<p className=" text-base font-bold ">
										{data.aktiva.lancar.title}
									</p>
								</div>

								{data.aktiva.lancar.accounts.map((account, idx) => (
									<div
										key={idx}
										className="flex items-center justify-between py-2"
									>
										<div className="flex items-center gap-3">
											<span className=" text-sm text-muted-foreground">
												{account.accountNo}
											</span>
											<span className=" text-base ">{account.accountName}</span>
										</div>
										<span className=" text-base ">
											{formatCurrency(account.amount)}
										</span>
									</div>
								))}

								<div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
									<div className="flex items-center justify-between">
										<p className=" text-base font-bold ">Total Aktiva Lancar</p>
										<p className=" text-base font-bold ">
											{formatCurrency(data.aktiva.lancar.total)}
										</p>
									</div>
								</div>
							</div>

							{/* AKTIVA TETAP */}
							<div className="space-y-1">
								{data.aktiva.tetap.accounts.map((account, idx) => (
									<div
										key={idx}
										className="flex items-center justify-between py-2"
									>
										<div className="flex items-center gap-3">
											<span className=" text-sm text-muted-foreground">
												{account.accountNo}
											</span>
											<span className=" text-base ">{account.accountName}</span>
										</div>
										<span className=" text-base ">
											{formatCurrency(account.amount)}
										</span>
									</div>
								))}

								<div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
									<p className=" text-base font-bold ">
										{data.aktiva.tetap.title}
									</p>
								</div>
							</div>

							{/* TOTAL AKTIVA */}
							<div className="border-t-2 border-[#D1D5DC] pt-2">
								<div className="flex items-center justify-between">
									<p className=" text-lg font-bold ">TOTAL AKTIVA</p>
									<p className=" text-lg font-bold ">
										{formatCurrency(data.totalAktiva)}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* KEWAJIBAN & MODAL Column */}
					<div className="space-y-6 rounded-[14px] border border-[rgba(0,0,0,0.1)] p-6">
						<h3 className=" text-base ">KEWAJIBAN & MODAL</h3>

						<div className="space-y-4">
							{/* KEWAJIBAN */}
							<div className="space-y-1">
								<div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
									<p className=" text-base font-bold ">KEWAJIBAN</p>
								</div>

								{data.kewajiban.accounts.map((account, idx) => (
									<div
										key={idx}
										className="flex items-center justify-between py-2"
									>
										<div className="flex items-center gap-3">
											<span className=" text-sm text-muted-foreground">
												{account.accountNo}
											</span>
											<span className=" text-base ">{account.accountName}</span>
										</div>
										<span className=" text-base ">
											{formatCurrency(account.amount)}
										</span>
									</div>
								))}

								<div className="rounded border-t border-[#E5E7EB] py-2">
									<div className="flex items-center justify-between">
										<p className=" text-base font-bold ">Total Kewajiban</p>
										<p className=" text-base font-bold ">
											{formatCurrency(data.kewajiban.total)}
										</p>
									</div>
								</div>
							</div>

							{/* MODAL */}
							<div className="space-y-4">
								<div className="rounded border-y border-[rgba(0,0,0,0.1)] py-2">
									<p className=" text-base font-bold ">MODAL</p>
								</div>

								<div className="rounded border-t border-[#E5E7EB] py-2">
									<div className="flex items-center justify-between">
										<p className=" text-base font-bold ">Total Modal</p>
										<p className=" text-base font-bold ">
											{formatCurrency(data.modal.total)}
										</p>
									</div>
								</div>
							</div>

							{/* TOTAL KEWAJIBAN & MODAL */}
							<div className="border-t-2 border-[#D1D5DC] pt-2">
								<div className="flex items-center justify-between">
									<p className=" text-lg font-bold ">TOTAL KEWAJIBAN & MODAL</p>
									<p className=" text-lg font-bold ">
										{formatCurrency(data.totalKewajibanModal)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Error Alert - Unbalanced */}
				{!data.isBalanced && (
					<div className="flex items-center justify-between rounded-[14px] border-l-4 border-[#FB2C36] bg-red-50 p-4">
						<div className="flex items-center gap-2">
							<AlertTriangle className="h-5 w-5 text-[#FB2C36]" />
							<span className=" text-base font-bold ">
								Neraca Tidak Seimbang
							</span>
						</div>
						<div className="text-right">
							<p className=" text-sm text-muted-foreground">Selisih:</p>
							<p className=" text-base font-bold text-[#E7000B]">
								{formatCurrency(data.difference)}
							</p>
						</div>
					</div>
				)}
			</div>
		</Card>
	);
}
