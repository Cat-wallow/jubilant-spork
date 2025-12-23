"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";

interface Issue {
	id: string;
	module: string;
	status: string;
	statusVariant: string;
	title: string;
	assignedTo: string;
	variance: string;
	icon: string;
	iconColor: string;
	iconBg: string;
}

interface RecentIssuesProps {
	issues: Issue[];
}

const iconMap: Record<string, any> = {
	AlertCircle,
	CheckCircle,
};

export function RecentIssues({ issues }: RecentIssuesProps) {
	return (
		<Card className="flex flex-col gap-[26.25px] rounded-[14.5px] border-[0.8px] border-[rgba(226,232,240,0.5)] bg-white p-[21px] shadow-sm">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex flex-col">
					<h3 className="text-sm leading-[14px] text-[#1A1A2E]">Recent Issues</h3>
					<p className="text-sm leading-[21px] text-[#64748B]">
						Latest findings requiring attention
					</p>
				</div>
				<Button
					variant="outline"
					className="h-[35px] rounded-[10.5px] border-[0.8px] border-[#E2E8F0] bg-white px-[14px] py-[7px] text-[12.25px] leading-[17.5px] text-[#1A1A2E] shadow-sm hover:bg-gray-50"
				>
					View All
				</Button>
			</div>

			{/* Issues List */}
			<div className="flex flex-col gap-[10.5px]">
				{issues.map((issue) => {
					const Icon = iconMap[issue.icon];

					return (
						<div
							key={issue.id}
							className="flex items-center justify-between gap-[14px] rounded-[10.5px] border-[0.8px] border-[#E2E8F0] p-[15px]"
						>
							{/* Left Section */}
							<div className="flex flex-1 items-center gap-[14px]">
								{/* Icon */}
								<div
									className="flex h-[22.6px] w-[29.6px] items-center justify-center rounded-[3.5px] border-[0.8px]"
									style={{
										backgroundColor: issue.iconBg,
										borderColor: issue.iconColor,
									}}
								>
									<Icon
										className="h-[14px] w-[14px]"
										style={{ color: issue.iconColor }}
									/>
								</div>

								{/* Content */}
								<div className="flex flex-1 flex-col gap-[3.5px]">
									{/* Badges */}
									<div className="flex items-center gap-[7px]">
										<Badge
											variant="outline"
											className="h-[19px] rounded-[8.5px] border-[0.8px] border-[#E2E8F0] px-[7px] py-[1.75px] text-[10.5px] leading-[14px] text-[#1A1A2E]"
										>
											{issue.module}
										</Badge>
										<Badge
											className={`h-[19px] rounded-[8.5px] border-[0.8px] px-[7px] py-[1.75px] text-[10.5px] leading-[14px] ${
												issue.statusVariant === "info"
													? "border-transparent bg-[#E6F7FF] text-[#1890FF] hover:bg-[#E6F7FF]"
													: issue.statusVariant === "success"
														? "border-transparent bg-[#F6FFED] text-[#52C41A] hover:bg-[#F6FFED]"
														: "border-transparent bg-[#F3F4F6] text-[#1E2939] hover:bg-[#F3F4F6]"
											}`}
										>
											{issue.status}
										</Badge>
									</div>

									{/* Title */}
									<p className="text-[12.25px] leading-[17.5px] text-[#1A1A2E]">
										{issue.title}
									</p>

									{/* Assigned To */}
									<p className="text-[10.5px] leading-[14px] text-[#64748B]">
										Assigned to: {issue.assignedTo}
									</p>
								</div>
							</div>

							{/* Right Section - Variance */}
							<div className="flex flex-col items-end">
								<p className="text-[12.25px] leading-[17.5px] text-[#F5222D]">
									{issue.variance}
								</p>
								<p className="text-[10.5px] leading-[14px] text-[#64748B]">
									variance
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
}
