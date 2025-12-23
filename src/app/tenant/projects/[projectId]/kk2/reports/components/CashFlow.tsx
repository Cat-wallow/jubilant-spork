"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ArrowUpDown,
	Activity,
	Briefcase,
	CreditCard,
	DollarSign,
	Building2,
} from "lucide-react";
import { cashFlowData, formatCurrency } from "../data/mockData";

export default function CashFlow() {
	const data = cashFlowData;
	const isPositive = data.summary.netCashFlow > 0;

	return (
		<div className="space-y-6">
			<Card className="border ">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
					<div className="flex items-start gap-2">
						<ArrowUpDown className="h-5 w-5" />
						<div>
							<CardTitle className=" text-base leading-4 ">
								Laporan Arus Kas (Cash Flow Statement)
							</CardTitle>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge
							className={`rounded-lg border-0 px-3 py-1  text-xs ${
								isPositive
									? "bg-[#016630] text-white hover:bg-[#016630]"
									: "bg-[#FB2C36] text-white hover:bg-[#FB2C36]"
							}`}
						>
							<svg
								className="mr-1 h-3 w-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
								/>
							</svg>
							{isPositive ? "Positive Cash Flow" : "Negative Cash Flow"}
						</Badge>
						<Button variant="outline" size="sm" className="gap-2 rounded-lg ">
							<svg
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							Export
						</Button>
						<Button variant="outline" size="sm" className="gap-2 rounded-lg ">
							<svg
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
								/>
							</svg>
							Print
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2 text-center">
						<h2 className=" text-xl font-bold leading-7 ">
							{data.companyName}
						</h2>
						<h3 className=" text-lg font-bold leading-7 ">
							{data.reportTitle}
						</h3>
						<p className=" text-sm leading-5 text-muted-foreground">
							{data.period}
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
						<Card className="border  shadow-sm">
							<CardContent className="flex items-center justify-between p-4">
								<div className="space-y-1">
									<p className=" text-sm leading-5 text-muted-foreground">
										Arus Kas Operasi
									</p>
									<p className=" text-lg font-bold leading-7 text-[#00A63E]">
										{formatCurrency(data.summary.operatingCash)}
									</p>
								</div>
								<Activity className="h-8 w-8 text-[#2B7FFF]" />
							</CardContent>
						</Card>

						<Card className="border  shadow-sm">
							<CardContent className="flex items-center justify-between p-4">
								<div className="space-y-1">
									<p className=" text-sm leading-5 text-muted-foreground">
										Arus Kas Investasi
									</p>
									<p className=" text-lg font-bold leading-7 text-[#E7000B]">
										{formatCurrency(data.summary.investingCash)}
									</p>
								</div>
								<Briefcase className="h-8 w-8 text-[#AD46FF]" />
							</CardContent>
						</Card>

						<Card className="border  shadow-sm">
							<CardContent className="flex items-center justify-between p-4">
								<div className="space-y-1">
									<p className=" text-sm leading-5 text-muted-foreground">
										Arus Kas Pendanaan
									</p>
									<p className=" text-lg font-bold leading-7 text-[#00A63E]">
										{formatCurrency(data.summary.financingCash)}
									</p>
								</div>
								<CreditCard className="h-8 w-8 text-[#FF6900]" />
							</CardContent>
						</Card>

						<Card className="border  shadow-sm">
							<CardContent className="flex items-center justify-between p-4">
								<div className="space-y-1">
									<p className=" text-sm leading-5 text-muted-foreground">
										Arus Kas Bersih
									</p>
									<p className=" text-lg font-bold leading-7 text-[#00A63E]">
										{formatCurrency(data.summary.netCashFlow)}
									</p>
								</div>
								<DollarSign className="h-8 w-8 text-[#00C950]" />
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>

			<div className="space-y-6">
				<Card className="border ">
					<CardHeader className="flex flex-row items-center gap-2">
						<Activity className="h-5 w-5" />
						<CardTitle className=" text-base leading-4 ">
							{data.sections.operating.title}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{data.sections.operating.items.map((item, idx) => (
								<div
									key={idx}
									className="flex items-center justify-between rounded py-2"
								>
									<span className=" text-base leading-6 ">
										{item.description}
									</span>
									<span
										className={` text-base leading-6 ${
											item.amount < 0 ? "text-[#E7000B]" : "text-[#00A63E]"
										}`}
									>
										{item.amount < 0
											? `(${formatCurrency(Math.abs(item.amount))})`
											: formatCurrency(item.amount)}
									</span>
								</div>
							))}
						</div>
						<div className="border-t-2 border-[#D1D5DC] pt-4">
							<div className="flex items-center justify-between">
								<span className=" text-lg font-bold leading-7 ">
									Total Arus Kas dari Aktivitas Operasi
								</span>
								<span className=" text-lg font-bold leading-7 text-[#00A63E]">
									{formatCurrency(data.sections.operating.total)}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border ">
					<CardHeader className="flex flex-row items-center gap-2">
						<Briefcase className="h-5 w-5" />
						<CardTitle className=" text-base leading-4 ">
							{data.sections.investing.title}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{data.sections.investing.items.map((item, idx) => (
								<div
									key={idx}
									className="flex items-center justify-between rounded py-2"
								>
									<span className=" text-base leading-6 ">
										{item.description}
									</span>
									<span
										className={` text-base leading-6 ${
											item.amount < 0 ? "text-[#E7000B]" : "text-[#00A63E]"
										}`}
									>
										{item.amount < 0
											? `(${formatCurrency(Math.abs(item.amount))})`
											: formatCurrency(item.amount)}
									</span>
								</div>
							))}
						</div>
						<div className="border-t-2 border-[#D1D5DC] pt-4">
							<div className="flex items-center justify-between">
								<span className=" text-lg font-bold leading-7 ">
									Total Arus Kas dari Aktivitas Investasi
								</span>
								<span
									className={` text-lg font-bold leading-7 ${
										data.sections.investing.total < 0
											? "text-[#E7000B]"
											: "text-[#00A63E]"
									}`}
								>
									{data.sections.investing.total < 0
										? `(${formatCurrency(Math.abs(data.sections.investing.total))})`
										: formatCurrency(data.sections.investing.total)}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border ">
					<CardHeader className="flex flex-row items-center gap-2">
						<CreditCard className="h-5 w-5" />
						<CardTitle className=" text-base leading-4 ">
							{data.sections.financing.title}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							{data.sections.financing.items.map((item, idx) => (
								<div
									key={idx}
									className="flex items-center justify-between rounded py-2"
								>
									<span className=" text-base leading-6 ">
										{item.description}
									</span>
									<span
										className={` text-base leading-6 ${
											item.amount < 0 ? "text-[#E7000B]" : "text-[#00A63E]"
										}`}
									>
										{item.amount < 0
											? `(${formatCurrency(Math.abs(item.amount))})`
											: formatCurrency(item.amount)}
									</span>
								</div>
							))}
						</div>
						<div className="border-t-2 border-[#D1D5DC] pt-4">
							<div className="flex items-center justify-between">
								<span className=" text-lg font-bold leading-7 ">
									Total Arus Kas dari Aktivitas Pendanaan
								</span>
								<span className=" text-lg font-bold leading-7 text-[#00A63E]">
									{formatCurrency(data.sections.financing.total)}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border-r border-b border-l-4 border-t border-[#00C950]">
					<CardHeader>
						<CardTitle className=" text-base leading-4 ">
							Ringkasan Arus Kas
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between rounded py-2">
							<span className=" text-base font-bold leading-6 ">
								Arus kas bersih dari aktivitas operasi
							</span>
							<span className=" text-base font-bold leading-6 text-[#00A63E]">
								{formatCurrency(data.summary.operatingCash)}
							</span>
						</div>
						<div className="flex items-center justify-between rounded py-2">
							<span className=" text-base font-bold leading-6 ">
								Arus kas bersih dari aktivitas investasi
							</span>
							<span
								className={` text-base font-bold leading-6 ${
									data.summary.investingCash < 0
										? "text-[#E7000B]"
										: "text-[#00A63E]"
								}`}
							>
								{data.summary.investingCash < 0
									? `(${formatCurrency(Math.abs(data.summary.investingCash))})`
									: formatCurrency(data.summary.investingCash)}
							</span>
						</div>
						<div className="flex items-center justify-between rounded py-2">
							<span className=" text-base font-bold leading-6 ">
								Arus kas bersih dari aktivitas pendanaan
							</span>
							<span className=" text-base font-bold leading-6 text-[#00A63E]">
								{formatCurrency(data.summary.financingCash)}
							</span>
						</div>
						<div className="border-t-2 border-[#D1D5DC] pt-4">
							<div className="flex items-center justify-between py-2">
								<span className=" text-lg font-bold leading-7 ">
									Kenaikan (penurunan) bersih kas dan setara kas
								</span>
								<span className=" text-lg font-bold leading-7 text-[#00A63E]">
									{formatCurrency(data.reconciliation.netCashIncrease)}
								</span>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between py-2">
								<span className=" text-base leading-6 ">
									Kas dan setara kas awal periode
								</span>
								<span className=" text-base font-bold leading-6 ">
									{formatCurrency(data.reconciliation.beginningCash)}
								</span>
							</div>
							<div className="flex items-center justify-between py-2">
								<span className=" text-base leading-6 ">
									Kenaikan (penurunan) bersih kas dan setara kas
								</span>
								<span className=" text-base font-bold leading-6 text-[#00A63E]">
									{formatCurrency(data.reconciliation.netCashIncrease)}
								</span>
							</div>
							<div className="border-t-2 border-[#D1D5DC] pt-4">
								<div className="flex items-center justify-between py-2">
									<span className=" text-xl font-bold leading-7 ">
										Kas dan setara kas akhir periode
									</span>
									<span className=" text-xl font-bold leading-7 text-[#00A63E]">
										{formatCurrency(data.reconciliation.endingCash)}
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border ">
					<CardHeader className="flex flex-row items-center gap-2">
						<Building2 className="h-5 w-5" />
						<CardTitle className=" text-base leading-4 ">
							Analisis Arus Kas
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<div className="space-y-2">
								<h4 className=" text-base font-bold leading-6 text-primary">
									Aktivitas Operasi
								</h4>
								<p className=" text-sm leading-5 text-[#155DFC]">
									{data.analysis.operatingDescription}
								</p>
							</div>
							<div className="space-y-2">
								<h4 className=" text-base font-bold leading-6 text-[#6E11B0]">
									Aktivitas Investasi
								</h4>
								<p className=" text-sm leading-5 text-[#9810FA]">
									{data.analysis.investingDescription}
								</p>
							</div>
							<div className="space-y-2">
								<h4 className=" text-base font-bold leading-6 text-[#9F2D00]">
									Aktivitas Pendanaan
								</h4>
								<p className=" text-sm leading-5 text-[#F54900]">
									{data.analysis.financingDescription}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
