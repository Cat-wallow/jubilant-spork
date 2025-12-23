"use client";

import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statsData = [
	{
		label: "PPh 21",
		badge: "6",
		objek: "Rp. 1.800.000.000",
		pph: "Rp. 107.200.000",
		pphColor: "text-[#34C759]",
	},
	{
		label: "PPh 23",
		badge: "6",
		objek: "Rp. 1.800.000.000",
		pph: "Rp. 107.200.000",
		pphColor: "text-[#34C759]",
	},
	{
		label: "PPh 25",
		badge: "6",
		objek: "Rp. 1.800.000.000",
		pph: "Rp. 107.200.000",
		pphColor: "text-[#34C759]",
	},
	{
		label: "PPh 29",
		badge: "6",
		objek: "Rp. 1.800.000.000",
		pph: "Rp. 107.200.000",
		pphColor: "text-[#34C759]",
	},
];

export function StatsCards() {
	return (
		<div className="grid grid-cols-4 items-start gap-2 w-full">
			{statsData.map((stat, index) => (
				<Card
					key={index}
					className="flex flex-1 overflow-hidden items-center gap-2 border  py-3 px-2 "
				>
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-background p-[15px]">
						<Calculator className="h-10 w-10 text-primary" />
					</div>
					<div className="flex flex-1 flex-col items-start ">
						<div className="flex items-center justify-between self-stretch">
							<div className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-muted-foreground">
								{stat.label}
							</div>
							<Badge className=" bg-[#DBEAFE] px-2 py-0.5  text-xs text-primary">
								{stat.badge}
							</Badge>
						</div>
						<div className="flex flex-nowrap overflow-hidden items-center justify-between self-stretch">
							<div className="font-dm text-base font-bold leading-8 tracking-[-0.32px] ">
								Objek:
							</div>
							<div className="font-dm text-nowrap text-base font-bold leading-8 tracking-[-0.32px] ">
								{`${stat.objek} `}
							</div>
						</div>
						<div className="flex items-center justify-between self-stretch">
							<div className="font-dm text-base font-bold leading-8 tracking-[-0.32px] ">
								PPh:
							</div>
							<div
								className={`font-dm text-base font-bold leading-8 tracking-[-0.32px] ${stat.pphColor}`}
							>
								{stat.pph}
							</div>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
}
