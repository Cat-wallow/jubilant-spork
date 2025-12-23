"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface PasalData {
	pasal: string;
	amount: number;
}

interface PemotonganByPasalChartProps {
	data: PasalData[];
}

export function PemotonganByPasalChart({ data }: PemotonganByPasalChartProps) {
	const maxAmount = Math.max(...data.map((d) => d.amount));

	return (
		<Card className="rounded-[14px] border-[0.8px]  p-6">
			<CardHeader className="p-0 pb-[30px]">
				<CardTitle className="flex items-center gap-2  text-base ">
					<FileText className="h-5 w-5" />
					Pemotongan Berdasarkan Pasal
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<div className="flex h-[445px] flex-col justify-end gap-4 p-4">
					<div className="flex h-full items-end justify-around gap-8">
						{data.map((item, index) => {
							const heightPercentage = (item.amount / maxAmount) * 100;
							return (
								<div
									key={index}
									className="flex flex-1 flex-col items-center gap-2"
								>
									<div className="flex w-full flex-1 items-end justify-center">
										<div
											className="w-full rounded-t-sm bg-primary"
											style={{ height: `${heightPercentage}%` }}
										/>
									</div>
									<p className="font-inter text-xs ">{item.pasal}</p>
								</div>
							);
						})}
					</div>
					<div className="border-t " />
				</div>
			</CardContent>
		</Card>
	);
}
