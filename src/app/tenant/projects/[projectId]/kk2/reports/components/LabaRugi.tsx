"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Calculator, Target } from "lucide-react";
import { incomeStatementData, formatCurrency } from "../data/mockData";

export default function LabaRugi() {
	const data = incomeStatementData;
	const isLoss = data.summary.netProfit < 0;

	return (
		<div className="space-y-6">
			<Card className="border ">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
					<div className="flex items-start gap-2">
						<TrendingUp className="h-5 w-5" />
						<div>
							<CardTitle className=" text-base leading-4 ">
								Laporan Laba Rugi (Income Statement)
							</CardTitle>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge
							className={`rounded-lg border-0 px-3 py-1  text-xs ${
								isLoss
									? "bg-[#FB2C36] text-white hover:bg-[#FB2C36]"
									: "bg-[#00C950] text-white hover:bg-[#00C950]"
							}`}
						>
							<TrendingUp className="mr-1 h-3 w-3" />
							{isLoss ? "Loss" : "Profit"}
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
										Total Pendapatan
									</p>
									<p className=" text-lg font-bold leading-7 ">
										{formatCurrency(data.summary.totalRevenue)}
									</p>
								</div>
								<DollarSign className="h-8 w-8 text-[#2B7FFF]" />
							</CardContent>
						</Card>

						<Card className="border  shadow-sm">
							<CardContent className="flex items-center justify-between p-4">
								<div className="space-y-1">
									<p className=" text-sm leading-5 text-muted-foreground">
										Laba Kotor
									</p>
									<p className=" text-lg font-bold leading-7 ">
										{formatCurrency(data.summary.grossProfit)}
									</p>
									<p className=" text-xs leading-4 text-muted-foreground">
										{data.summary.grossProfitPercentage.toFixed(1)}%
									</p>
								</div>
								<Calculator className="h-8 w-8 text-[#00C950]" />
							</CardContent>
						</Card>

						<Card className="border  shadow-sm">
							<CardContent className="flex items-center justify-between p-4">
								<div className="space-y-1">
									<p className=" text-sm leading-5 text-muted-foreground">
										Total Beban
									</p>
									<p className=" text-lg font-bold leading-7 ">
										{formatCurrency(data.summary.totalExpenses)}
									</p>
									<p className=" text-xs leading-4 text-muted-foreground">
										{data.summary.totalExpensesPercentage.toFixed(1)}%
									</p>
								</div>
								<TrendingUp className="h-8 w-8 text-[#FB2C36]" />
							</CardContent>
						</Card>

						<Card className="border  shadow-sm">
							<CardContent className="flex items-center justify-between p-4">
								<div className="space-y-1">
									<p className=" text-sm leading-5 text-muted-foreground">
										Laba Bersih
									</p>
									<p
										className={` text-lg font-bold leading-7 ${
											isLoss ? "text-[#E7000B]" : "text-[#00A63E]"
										}`}
									>
										{formatCurrency(data.summary.netProfit)}
									</p>
									<p className=" text-xs leading-4 text-muted-foreground">
										{data.summary.netProfitPercentage.toFixed(1)}%
									</p>
								</div>
								<Target className="h-8 w-8 text-[#FB2C36]" />
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>

			<Card className="border ">
				<CardHeader>
					<CardTitle className=" text-base leading-4 ">
						Rincian Laporan Laba Rugi
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<div className="flex items-center justify-between rounded border-y  py-3">
							<h3 className=" text-base font-bold leading-6 ">
								{data.sections.revenue.title}
							</h3>
						</div>
						{data.sections.revenue.items.map((item, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between rounded py-2"
							>
								<div className="flex items-center gap-3">
									<span className=" text-sm leading-5 text-muted-foreground">
										{item.accountNo}
									</span>
									<span className=" text-base leading-6 ">
										{item.accountName}
									</span>
								</div>
								<span className=" text-base leading-6 ">
									{formatCurrency(item.amount)}
								</span>
							</div>
						))}
						<div className="border-t border-[#E5E7EB] pt-2">
							<div className="flex items-center justify-between py-2">
								<span className=" text-base font-bold leading-6 ">
									Total Pendapatan
								</span>
								<div className="space-y-1 text-right">
									<p className=" text-base font-bold leading-6 ">
										{formatCurrency(data.sections.revenue.total)}
									</p>
									<p className=" text-xs font-bold leading-4 text-muted-foreground">
										{data.sections.revenue.percentage?.toFixed(1)}%
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between rounded border-y  py-3">
							<h3 className=" text-base font-bold leading-6 ">
								{data.sections.cogs.title}
							</h3>
						</div>
						<div className="border-t border-[#E5E7EB] pt-2">
							<div className="flex items-center justify-between py-2">
								<span className=" text-base font-bold leading-6 ">
									Total Harga Pokok Penjualan
								</span>
								<div className="space-y-1 text-right">
									<p className=" text-base font-bold leading-6 ">
										({formatCurrency(Math.abs(data.sections.cogs.total))})
									</p>
									<p className=" text-xs font-bold leading-4 text-muted-foreground">
										{data.sections.cogs.percentage?.toFixed(1)}%
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="border-t-2 border-[#D1D5DC] pt-4">
						<div className="flex items-center justify-between py-2">
							<h3 className=" text-lg font-bold leading-7 ">LABA KOTOR</h3>
							<div className="space-y-1 text-right">
								<p
									className={` text-lg font-bold leading-7 ${
										data.summary.grossProfit < 0
											? "text-[#E7000B]"
											: "text-[#00A63E]"
									}`}
								>
									{formatCurrency(data.summary.grossProfit)}
								</p>
								<p className=" text-sm font-bold leading-5 text-muted-foreground">
									{data.summary.grossProfitPercentage.toFixed(1)}%
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between rounded border-y  py-3">
							<h3 className=" text-base font-bold leading-6 ">
								{data.sections.operatingExpenses.title}
							</h3>
						</div>
						<div className="border-t border-[#E5E7EB] pt-2">
							<div className="flex items-center justify-between py-2">
								<span className=" text-base font-bold leading-6 ">
									Total Beban Operasional
								</span>
								<div className="space-y-1 text-right">
									<p className=" text-base font-bold leading-6 ">
										(
										{formatCurrency(
											Math.abs(data.sections.operatingExpenses.total),
										)}
										)
									</p>
									<p className=" text-xs font-bold leading-4 text-muted-foreground">
										{data.sections.operatingExpenses.percentage?.toFixed(1)}%
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="border-t-2 border-[#D1D5DC] pt-4">
						<div
							className={`flex items-center justify-between rounded py-4 ${
								isLoss
									? "border-l-4 border-[#FB2C36]"
									: "border-l-4 border-[#00C950]"
							}`}
						>
							<h3 className="pl-4  text-xl font-bold leading-7 ">
								LABA BERSIH
							</h3>
							<div className="space-y-1 text-right">
								<p
									className={` text-xl font-bold leading-7 ${
										isLoss ? "text-[#E7000B]" : "text-[#00A63E]"
									}`}
								>
									({formatCurrency(Math.abs(data.summary.netProfit))})
								</p>
								<p className=" text-sm font-bold leading-5 text-muted-foreground">
									{data.summary.netProfitPercentage.toFixed(1)}%
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card
				className={`border-r border-b ${
					isLoss
						? "border-l-4 border-t border-[#FB2C36]"
						: "border-l-4 border-t border-[#00C950]"
				}`}
			>
				<CardHeader className="flex flex-row items-center gap-2">
					<Calculator className="h-5 w-5" />
					<CardTitle className=" text-base leading-4 ">
						Analisis Kinerja
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<div className="space-y-2 text-center">
							<p className=" text-sm leading-5 text-[#155DFC]">
								Gross Profit Margin
							</p>
							<p className=" text-xl font-bold leading-7 text-primary">
								{data.analysis.grossProfitMargin.toFixed(1)}%
							</p>
						</div>
						<div className="space-y-2 text-center">
							<p className=" text-sm leading-5 text-[#F54900]">
								Operating Expense Ratio
							</p>
							<p className=" text-xl font-bold leading-7 text-[#9F2D00]">
								{data.analysis.operatingExpenseRatio.toFixed(1)}%
							</p>
						</div>
						<div className="space-y-2 text-center">
							<p className=" text-sm leading-5 text-[#E7000B]">
								Net Profit Margin
							</p>
							<p className=" text-xl font-bold leading-7 text-[#9F0712]">
								{data.analysis.netProfitMargin.toFixed(1)}%
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
