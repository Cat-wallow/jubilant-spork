"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Lock, Eye, Clock, User, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReconciliationRun {
	id: string;
	version: string;
	period: string;
	status: string;
	statusVariant: string;
	statusIcon: string;
	adjustments: number;
	netImpact: string;
	createdBy: string;
	createdAt: string;
	locked: boolean;
}

interface ReconciliationTableProps {
	data: ReconciliationRun[];
}

const statusIconMap: Record<string, any> = {
	Lock,
	Eye,
	Clock,
};

export function ReconciliationTable({ data }: ReconciliationTableProps) {
	return (
		<Card className="rounded-[14.5px] border-[0.8px] border-[rgba(226,232,240,0.5)] bg-white p-[24px] shadow-sm">
			{/* Header */}
			<div className="mb-[20px] flex flex-col gap-[5px]">
				<h3 className="text-sm leading-[14px] text-[#1A1A2E]">
					Reconciliation Runs History
				</h3>
				<p className="text-sm leading-[21px] text-[#64748B]">
					All runs with version control and audit trail
				</p>
			</div>

			{/* Table */}
			<div className="rounded-[10.5px] border-[0.8px] border-transparent">
				<Table>
					<TableHeader>
						<TableRow className="border-b-[0.8px] border-[#E2E8F0]">
							<TableHead className="px-[14px] py-[12.8px] text-[10.5px] uppercase leading-[14px] tracking-[0.525px] text-[#64748B]">
								Run ID
							</TableHead>
							<TableHead className="px-[14px] py-[12.8px] text-[10.5px] uppercase leading-[14px] tracking-[0.525px] text-[#64748B]">
								Version
							</TableHead>
							<TableHead className="px-[14px] py-[12.8px] text-[10.5px] uppercase leading-[14px] tracking-[0.525px] text-[#64748B]">
								Period
							</TableHead>
							<TableHead className="px-[14px] py-[12.8px] text-[10.5px] uppercase leading-[14px] tracking-[0.525px] text-[#64748B]">
								Status
							</TableHead>
							<TableHead className="px-[14px] py-[12.8px] text-center text-[10.5px] uppercase leading-[14px] tracking-[0.525px] text-[#64748B]">
								Adjustments
							</TableHead>
							<TableHead className="px-[14px] py-[12.8px] text-right text-[10.5px] uppercase leading-[14px] tracking-[0.525px] text-[#64748B]">
								Net Impact
							</TableHead>
							<TableHead className="px-[14px] py-[12.8px] text-[10.5px] uppercase leading-[14px] tracking-[0.525px] text-[#64748B]">
								Created By
							</TableHead>
							<TableHead className="px-[14px] py-[12.8px] text-[10.5px] uppercase leading-[14px] tracking-[0.525px] text-[#64748B]">
								Created At
							</TableHead>
							<TableHead className="px-[14px] py-[12.8px] text-right text-[10.5px] uppercase leading-[14px] tracking-[0.525px] text-[#64748B]">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="bg-white">
						{data.map((run) => {
							const StatusIcon = statusIconMap[run.statusIcon];

							return (
								<TableRow
									key={run.id}
									className="border-b-[0.8px] border-[#E2E8F0] last:border-0"
								>
									{/* Run ID */}
									<TableCell className="px-[14px] py-0">
										<div className="flex h-[60px] items-center gap-[7px]">
											<span className="font-mono text-[12.25px] leading-[17.5px] text-[#1A1A2E]">
												{run.id}
											</span>
											{run.locked && (
												<Lock className="h-[10.5px] w-[10.5px] text-[#52C41A]" />
											)}
										</div>
									</TableCell>

									{/* Version */}
									<TableCell className="px-[14px] py-0">
										<div className="flex h-[60px] items-center">
											<Badge
												variant="outline"
												className="rounded-[8.5px] border-[0.8px] border-[#E2E8F0] px-[7px] py-[2.35px] font-mono text-[10.5px] leading-[14px] text-[#1A1A2E]"
											>
												{run.version}
											</Badge>
										</div>
									</TableCell>

									{/* Period */}
									<TableCell className="px-[14px] py-0">
										<div className="flex h-[60px] items-center">
											<span className="text-[12.25px] leading-[17.5px] text-[#1A1A2E]">
												{run.period}
											</span>
										</div>
									</TableCell>

									{/* Status */}
									<TableCell className="px-[14px] py-0">
										<div className="flex h-[60px] items-center">
											<Badge
												className={`flex items-center gap-[7px] rounded-[8.5px] border-[0.8px] px-[7px] py-[1.55px] text-[10.5px] leading-[14px] ${
													run.statusVariant === "success"
														? "border-[#52C41A] bg-[#F6FFED] text-[#52C41A] hover:bg-[#F6FFED]"
														: run.statusVariant === "warning"
															? "border-[#FAAD14] bg-[#FFFBE6] text-[#FAAD14] hover:bg-[#FFFBE6]"
															: "border-[#E2E8F0] bg-[#F3F4F6] text-[#1E2939] hover:bg-[#F3F4F6]"
												}`}
											>
												<StatusIcon className="h-[11px] w-[11px]" />
												{run.status}
											</Badge>
										</div>
									</TableCell>

									{/* Adjustments */}
									<TableCell className="px-[14px] py-0">
										<div className="flex h-[60px] items-center justify-center">
											<Badge
												variant="secondary"
												className="rounded-[8.5px] border-[0.8px] border-transparent bg-[#F1F5F9] px-[7px] py-[1.55px] text-[10.5px] leading-[14px] text-[#1A1A2E] hover:bg-[#F1F5F9]"
											>
												{run.adjustments}
											</Badge>
										</div>
									</TableCell>

									{/* Net Impact */}
									<TableCell className="px-[14px] py-0 text-right">
										<div className="flex h-[60px] items-center justify-end">
											<span className="text-[12.25px] leading-[17.5px] text-[#1890FF]">
												{run.netImpact}
											</span>
										</div>
									</TableCell>

									{/* Created By */}
									<TableCell className="px-[14px] py-0">
										<div className="flex h-[60px] items-center gap-[7px]">
											<User className="h-[10.5px] w-[10.5px] text-[#64748B]" />
											<span className="text-[12.25px] leading-[17.5px] text-[#1A1A2E]">
												{run.createdBy}
											</span>
										</div>
									</TableCell>

									{/* Created At */}
									<TableCell className="px-[14px] py-0">
										<div className="flex h-[60px] items-center">
											<span className="text-[12.25px] leading-[17.5px] text-[#64748B]">
												{run.createdAt}
											</span>
										</div>
									</TableCell>

									{/* Actions */}
									<TableCell className="px-[14px] py-0">
										<div className="flex h-[60px] items-center justify-end">
											<Button
												variant="ghost"
												size="icon"
												className="h-[32px] w-[32px] rounded-[10.5px] bg-transparent p-[8.75px]"
											>
												<MoreVertical className="h-[14px] w-[14px] text-[#1A1A2E]" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</Card>
	);
}
