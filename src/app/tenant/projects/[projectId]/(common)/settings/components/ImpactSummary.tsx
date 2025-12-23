"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { impactSummary } from "../data/settingsData";
import { cn } from "@/lib/utils";

export function ImpactSummary() {
	return (
		<Card className="h-fit w-full rounded-[20px] ">
			<CardHeader className="p-[30px]">
				<CardTitle className="text-2xl font-bold text-primary">
					Ringkasan Dampak Perubahan
				</CardTitle>
				<p className="text-xs leading-4 text-primary">
					Menginformasikan dampak deri setiap konfigurasi yang dilakukan
				</p>
			</CardHeader>

			<CardContent className="flex flex-col gap-5 p-[30px] pt-0">
				{/* Separator */}
				<div className="h-px w-full bg-[rgba(145,158,171,0.20)]" />

				{/* Modul dan Timeline */}
				<div className="flex flex-col gap-5">
					<h3 className="text-base font-semibold ">Modul dan Timeline</h3>

					<div className="flex flex-col gap-5">
						{impactSummary.modules.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between gap-2.5"
							>
								<div className="flex flex-1 flex-col gap-[5px]">
									<span className="text-sm font-medium leading-5 ">
										{item.name}
									</span>
									<span className="text-xs leading-4 text-primary">
										{item.description}
									</span>
								</div>
								<div className="flex items-center gap-2.5">
									<Badge className="rounded-[5px] bg-[#14AE5C] px-2.5 py-1.5 text-xs font-bold text-white hover:bg-[#14AE5C]/90">
										{item.days}
									</Badge>
									<Badge
										className={cn(
											"rounded-[5px] px-2.5 py-1.5 text-xs font-bold",
											item.status === "Enabled"
												? "bg-[#14AE5C] text-white hover:bg-[#14AE5C]/90"
												: "bg-transparent  hover:bg-transparent",
										)}
									>
										{item.status}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Separator */}
				<div className="h-px w-full bg-[rgba(145,158,171,0.20)]" />

				{/* Billing */}
				<div className="flex flex-col gap-5">
					<h3 className="text-base font-semibold ">Billing</h3>

					<div className="flex flex-col gap-5">
						{impactSummary.billing.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between gap-2.5"
							>
								<div className="flex flex-1 flex-col gap-[5px]">
									<span className="text-sm font-medium leading-5 ">
										{item.name}
									</span>
									<span className="text-xs leading-4 text-primary">
										{item.description}
									</span>
								</div>
								<div className="flex items-center gap-2.5">
									<Badge className="rounded-[5px] bg-[#14AE5C] px-2.5 py-1.5 text-xs font-bold text-white hover:bg-[#14AE5C]/90">
										{item.days}
									</Badge>
									<Badge className="rounded-[5px] bg-transparent px-2.5 py-1.5 text-xs font-bold  hover:bg-transparent">
										{item.status}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Separator */}
				<div className="h-px w-full bg-[rgba(145,158,171,0.20)]" />

				{/* Reports */}
				<div className="flex flex-col gap-5">
					<h3 className="text-base font-semibold ">Reports</h3>

					<div className="flex flex-col gap-5">
						{impactSummary.reports.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between gap-2.5"
							>
								<div className="flex flex-1 flex-col gap-[5px]">
									<span className="text-sm font-medium leading-5 ">
										{item.name}
									</span>
									<span className="text-xs leading-4 text-primary">
										{item.description}
									</span>
								</div>
								<div className="flex items-center gap-2.5">
									<Badge className="rounded-[5px] bg-[#14AE5C] px-2.5 py-1.5 text-xs font-bold text-white hover:bg-[#14AE5C]/90">
										{item.days}
									</Badge>
									<Badge className="rounded-[5px] bg-transparent px-2.5 py-1.5 text-xs font-bold  hover:bg-transparent">
										{item.status}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
