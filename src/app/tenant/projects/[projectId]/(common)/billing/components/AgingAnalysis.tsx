"use client";

import { Badge } from "@/components/ui/badge";
import { AgingData } from "../data/invoices";
import { Card } from "@/components/ui/card";

interface AgingAnalysisProps {
	data: AgingData[];
}

export function AgingAnalysis({ data }: AgingAnalysisProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	return (
		// <div className="flex w-full flex-col gap-[30px] rounded-[15px] border border-[#D9D9D9] p-6 shadow-md xl:w-[450px]">
		<Card className="flex  w-full p-6 flex-col gap-[30px]">
			<div className="flex flex-col">
				<h3 className="font-roboto text-base font-medium leading-6 text-[#404040]">
					Aging Analysis
				</h3>
				<p className="font-roboto text-xs font-normal leading-4 text-[#8C8C8C]">
					Invoice aging by payment status
				</p>
			</div>

			<div className="flex flex-col gap-5">
				{data.map((item, idx) => {
					// Different colors for different aging periods
					const colors = ["#05CD99", "#FFB547", "#FFB547", "#EA4848"];
					const bgColor = colors[idx] || "#05CD99";

					return (
						<div key={idx} className="flex flex-col gap-5">
							<Badge
								variant="outline"
								className="w-fit rounded-[5px] border border-[rgba(145,158,171,0.20)] font-inter text-xs font-normal text-[#404040]"
							>
								{item.count} Invoice
							</Badge>

							<div className="flex flex-col gap-[5px]">
								{/* Progress bars */}
								<div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#F4F7FE]">
									<div
										className="h-full rounded-full transition-all"
										style={{
											width: `${item.percentage}%`,
											backgroundColor: bgColor,
										}}
									/>
								</div>

								<div className="flex items-center justify-between">
									<span className="font-inter text-xs font-normal text-[#6E7184]">
										{item.label}
									</span>
									<span className="font-inter text-xs font-normal text-[#6E7184]">
										{formatCurrency(item.amount)}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
}
