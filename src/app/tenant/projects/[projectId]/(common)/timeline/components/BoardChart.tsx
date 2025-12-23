"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BoardCard } from "../types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BoardChartProps {
	cards: BoardCard[];
}

const statusConfig = {
	pending: {
		label: "Pending",
		color: "bg-gray-100 text-gray-700 border-gray-300",
	},
	"in-progress": {
		label: "In Progress",
		color: "bg-blue-100 text-blue-700 border-blue-300",
	},
	completed: {
		label: "Completed",
		color: "bg-green-100 text-green-700 border-green-300",
	},
};

const priorityConfig = {
	low: { label: "Low", color: "bg-slate-100 text-slate-700" },
	medium: { label: "Medium", color: "bg-yellow-100 text-yellow-700" },
	high: { label: "High", color: "bg-red-100 text-red-700" },
};

export function BoardChart({ cards }: BoardChartProps) {
	const columns = ["pending", "in-progress", "completed"] as const;

	const getCardsForStatus = (status: (typeof columns)[number]) => {
		return cards.filter((card) => card.status === status);
	};

	return (
		<div id="board-chart-export" className="space-y-4">
			<Card className="overflow-hidden border-2  rounded-[30px]">
				<div className="p-6">
					<div className="grid grid-cols-3 gap-6">
						{columns.map((status) => (
							<div key={status} className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="font-semibold text-sm capitalize">
										{statusConfig[status].label}
									</h3>
									<Badge variant="outline" className="rounded-full">
										{getCardsForStatus(status).length}
									</Badge>
								</div>

								<div className="space-y-3">
									{getCardsForStatus(status).map((card) => (
										<Card
											key={card.id}
											className="p-4 border border-border hover:shadow-md transition-shadow cursor-pointer"
										>
											<div className="space-y-3">
												<div className="flex items-start justify-between gap-2">
													<h4 className="font-medium text-sm leading-tight flex-1">
														{card.title}
													</h4>
													<Badge
														variant="outline"
														className={cn(
															"text-xs",
															priorityConfig[card.priority].color,
														)}
													>
														{priorityConfig[card.priority].label}
													</Badge>
												</div>

												<div className="flex items-center gap-2">
													<Badge variant="secondary" className="text-xs">
														{card.module}
													</Badge>
												</div>

												<div className="flex items-center justify-between text-xs text-muted-foreground">
													<span>{format(card.dueDate, "MMM d, yyyy")}</span>
													{card.assignee && (
														<div className="flex items-center gap-1">
															<div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
																{card.assignee
																	.split(" ")
																	.map((n) => n[0])
																	.join("")}
															</div>
														</div>
													)}
												</div>
											</div>
										</Card>
									))}

									{getCardsForStatus(status).length === 0 && (
										<div className="text-center py-8 text-sm text-muted-foreground">
											No cards
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</Card>
		</div>
	);
}
