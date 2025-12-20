"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface StatusItem {
	label: string;
	value: number;
	percentage: string;
	color: string;
}

interface StatusBuktiPotongCardProps {
	data: StatusItem[];
}

export function StatusBuktiPotongCard({ data }: StatusBuktiPotongCardProps) {
	const total = data.reduce((acc, item) => acc + item.value, 0);
	const complianceRate = data[0]?.percentage || "0%";

	return (
		<Card className="rounded-[14px] border-[0.8px]  p-6">
			<CardHeader className="p-0 pb-[30px]">
				<CardTitle className="flex items-center gap-2  text-base ">
					<Check className="h-5 w-5" />
					Status Bukti Potong
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-[30px] p-0">
				{/* Status Cards */}
				<div className="flex items-center gap-[30px]">
					{data.map((item, index) => (
						<div
							key={index}
							className="flex h-[83.975px] flex-1 flex-col items-start gap-2 rounded-[10px] bg-muted p-3 pt-3"
						>
							<p className={` text-lg font-bold leading-7 ${item.color}`}>
								{item.value}
							</p>
							<p className=" text-xs leading-4 text-muted-foreground">
								{item.label}
							</p>
							<p className=" text-xs leading-4 text-muted-foreground">
								({item.percentage})
							</p>
						</div>
					))}
				</div>

				{/* Pie Chart Placeholder */}
				<div className="flex h-[306px] items-center justify-center rounded-[10px] ">
					<div className="text-center">
						<div className="mx-auto mb-2 flex h-40 w-40 items-center justify-center rounded-full bg-[#10B981]">
							<div className="flex h-28 w-28 items-center justify-center rounded-full bg-card">
								<span className=" text-2xl font-bold text-[#10B981]">
									{complianceRate}
								</span>
							</div>
						</div>
						<p className="text-sm text-muted-foreground">
							Valid {data[0]?.value} ({complianceRate})
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="flex flex-col gap-2 border-t pt-3">
					<div className="flex items-center justify-between">
						<p className=" text-sm leading-5 text-muted-foreground">
							Total Bukti Potong:
						</p>
						<p className=" text-sm leading-5">{total}</p>
					</div>
					<div className="flex items-center justify-between">
						<p className=" text-sm leading-5 text-muted-foreground">
							Compliance Rate:
						</p>
						<p className=" text-sm leading-5 ">{complianceRate}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
