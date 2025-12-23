"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Lock, AlertTriangle } from "lucide-react";

interface Stat {
	id: string;
	icon: string;
	label: string;
	value: string;
	badge: string;
	badgeVariant: string;
	description: string;
	gradient: string;
	iconBg: string;
	iconColor: string;
	valueColor: string;
	descColor: string;
}

interface StatsCardsProps {
	stats: Stat[];
}

const iconMap: Record<string, any> = {
	FileText,
	Eye,
	Lock,
	AlertTriangle,
};

export function StatsCards({ stats }: StatsCardsProps) {
	return (
		<div className="grid grid-cols-1 gap-[14px] md:grid-cols-2   lg:grid-cols-4">
			{stats.map((stat) => {
				const Icon = iconMap[stat.icon];

				return (
					<Card
						key={stat.id}
						className={`flex h-[157px] flex-col gap-[14px] rounded-[14px]  p-[21px] pb-0 shadow-sm ${stat.gradient}`}
					>
						{/* Header */}
						<div className="flex items-start justify-between">
							{/* Icon */}
							<div
								className="flex h-[35px] w-[35px] items-center justify-center rounded-[14.5px]"
								style={{ backgroundColor: stat.iconBg }}
							>
								<Icon
									className="h-[17.5px] w-[17.5px]"
									style={{ color: stat.iconColor }}
								/>
							</div>

							{/* Badge */}
							{stat.badge && (
								<div
									className={`flex h-[17.5px] items-center justify-center gap-[3.5px] rounded-[8.5px] px-[7px] py-[1.75px] text-[10.5px] leading-[14px] ${
										stat.badgeVariant === "success"
											? "bg-[#D0FAE5] text-[#007A55]"
											: stat.badgeVariant === "info"
												? "bg-[#DBEAFE] text-[#1447E6]"
												: stat.badgeVariant === "purple"
													? "bg-[#F3E8FF] text-[#8200DB]"
													: "bg-[#FFEDD4] text-[#CA3500]"
									}`}
								>
									{stat.badge}
								</div>
							)}
						</div>

						{/* Content */}
						<div className="flex flex-col gap-[3.5px]">
							{/* Label */}
							<p className="text-[12.25px] leading-[17.5px] text-[#64748B]">
								{stat.label}
							</p>

							{/* Value */}
							<p
								className="text-[21px] font-bold leading-[28px]"
								style={{ color: stat.valueColor }}
							>
								{stat.value}
							</p>

							{/* Description */}
							{stat.description && (
								<p
									className="text-[10.5px] leading-[14px]"
									style={{ color: stat.descColor }}
								>
									{stat.description}
								</p>
							)}
						</div>
					</Card>
				);
			})}
		</div>
	);
}
