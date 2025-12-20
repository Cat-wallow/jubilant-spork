"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { taxRates } from "../_data/mock-data";
import { cn } from "@/lib/utils";

export function TaxRateSummary() {
	const getBadgeStyle = (variant: string) => {
		switch (variant) {
			case "default":
				return "bg-[#DBEAFE] text-primary border-0";
			case "success":
				return "bg-[#DCFCE7] text-[#016630] border-0";
			case "warning":
				return "bg-[#FEF9C2] text-[#894B00] border-0";
			default:
				return "";
		}
	};

	return (
		<Card className="rounded-[14px] border-[0.8px] ">
			<CardHeader className="p-6">
				<CardTitle className="text-base ">
					Ringkasan Tarif
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 p-6 pt-0">
				{taxRates.map((rate, index) => (
					<div key={index} className="rounded-[10px] border-[0.8px]  p-3">
						<div className="mb-2 flex items-center justify-between">
							<span className="text-base ">{rate.name}</span>
							<Badge
								className={cn(
									"rounded-lg px-2 py-0.5 text-xs",
									getBadgeStyle(rate.badgeVariant),
								)}
							>
								{rate.rate}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{rate.description}</p>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
