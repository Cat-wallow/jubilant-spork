"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	FileText,
	FileSpreadsheet,
	Receipt,
	DollarSign,
	Package,
	CheckCircle,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Module {
	id: string;
	badge: string;
	title: string;
	description: string;
	status: string;
	statusVariant: string;
	icon: string;
	iconBg: string;
	iconColor: string;
	lastRun: string;
	link?: string;
}

interface AnalysisModulesProps {
	modules: Module[];
	projectId: string;
}

const iconMap: Record<string, any> = {
	FileText,
	FileSpreadsheet,
	Receipt,
	DollarSign,
	Package,
};

export function AnalysisModules({ modules, projectId }: AnalysisModulesProps) {
	return (
		<div className="flex flex-col gap-[14px]">
			{/* Header */}
			<h3 className="text-sm leading-[21px] text-[#1A1A2E]">Analysis Modules</h3>

			{/* Grid */}
			<div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 lg:grid-cols-3">
				{modules.map((module) => {
					const Icon = iconMap[module.icon];
					const moduleLink = module.link
						? module.link.replace("{projectId}", projectId)
						: "#";

					return (
						<Link key={module.id} href={moduleLink}>
							<Card className="flex h-full flex-col gap-[21px] rounded-[14.5px] border-[0.8px] border-[rgba(226,232,240,0.5)] bg-white p-[24px] shadow-sm transition-all hover:shadow-md">
								{/* Header */}
								<div className="flex flex-col gap-[16px]">
									<div className="flex items-start justify-between">
										{/* Icon */}
										<div
											className="flex h-[35px] w-[35px] items-center justify-center rounded-[10.5px]"
											style={{ backgroundColor: module.iconBg }}
										>
											<Icon
												className="h-[17.5px] w-[17.5px]"
												style={{ color: module.iconColor }}
											/>
										</div>

										{/* Status Badge */}
										<div
											className={`flex items-center justify-center gap-[3.5px] rounded-[8.5px] border-[0.8px] px-[7px] py-[1.75px] text-[10.5px] leading-[14px] ${
												module.statusVariant === "success"
													? "border-[#52C41A] bg-[#F6FFED] text-[#52C41A]"
													: "border-[#FAAD14] bg-[#FFFBE6] text-[#FAAD14]"
											}`}
										>
											{module.statusVariant === "success" && (
												<CheckCircle className="h-[11px] w-[11px]" />
											)}
											{module.status}
										</div>
									</div>

									{/* Content */}
									<div className="flex flex-col gap-[3.5px]">
										{/* Badge */}
										<Badge
											variant="outline"
											className="w-fit rounded-[8.5px] border-[0.8px] border-[#E2E8F0] px-[7px] py-[1.75px] text-[10.5px] leading-[14px] text-[#1A1A2E]"
										>
											{module.badge}
										</Badge>

										{/* Title */}
										<h4 className="text-sm leading-[21px] text-[#1A1A2E]">
											{module.title}
										</h4>

										{/* Description */}
										<p className="text-sm leading-[21px] text-[#64748B]">
											{module.description}
										</p>
									</div>
								</div>

								{/* Footer */}
								<div className="flex items-center justify-between text-[10.5px] leading-[14px]">
									<span className="text-[#64748B]">Last run: {module.lastRun}</span>
									<ArrowRight className="h-[14px] w-[14px] text-[#64748B]" />
								</div>
							</Card>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
