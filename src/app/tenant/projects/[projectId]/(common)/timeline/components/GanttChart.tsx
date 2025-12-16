"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimelineTask } from "../types";
import { cn } from "@/lib/utils";
import {
	format,
	eachDayOfInterval,
	startOfMonth,
	endOfMonth,
	isSameDay,
} from "date-fns";

interface GanttChartProps {
	tasks: TimelineTask[];
}

export function GanttChart({ tasks }: GanttChartProps) {
	const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1));

	const dateRange = useMemo(() => {
		const start = startOfMonth(currentDate);
		const end = endOfMonth(currentDate);
		return eachDayOfInterval({ start, end });
	}, [currentDate]);

	const goToPreviousMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
		);
	};

	const goToNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
		);
	};

	const goToToday = () => {
		setCurrentDate(new Date());
	};

	const getTaskPosition = (task: TimelineTask) => {
		const startIndex = dateRange.findIndex((date) =>
			isSameDay(date, task.startDate),
		);
		const endIndex = dateRange.findIndex((date) =>
			isSameDay(date, task.endDate),
		);

		if (startIndex === -1 || endIndex === -1) {
			return null;
		}

		const left = (startIndex / dateRange.length) * 100;
		const width = ((endIndex - startIndex + 1) / dateRange.length) * 100;

		return { left: `${left}%`, width: `${width}%` };
	};

	const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

	return (
		<div id="gantt-chart-export" className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon" onClick={goToPreviousMonth}>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button variant="outline" size="icon" onClick={goToNextMonth}>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<span className="text-sm font-medium">
						{format(currentDate, "MMMM yyyy")}
					</span>
				</div>
				<Button variant="outline" size="sm" onClick={goToToday}>
					Today
				</Button>
			</div>

			<Card className="overflow-hidden border-2 border-[#D9D9D9] rounded-[30px]">
				<div className="p-6">
					<div className="flex">
						<div className="w-48 flex-shrink-0">
							<div className="h-12 flex items-center border-b px-4 font-medium text-sm">
								Project
							</div>
							{tasks.map((task) => (
								<div
									key={task.id}
									className="h-16 flex items-center border-b px-4 text-sm"
								>
									<div className="flex items-center gap-2">
										<div
											className="w-2 h-2 rounded-full"
											style={{ backgroundColor: task.color }}
										/>
										<span className="font-medium">{task.name}</span>
									</div>
								</div>
							))}
							<div className="h-12 flex items-center px-4 text-sm text-muted-foreground">
								+ New phase
							</div>
						</div>

						<div className="flex-1 overflow-x-auto">
							<div className="min-w-[800px]">
								<div className="flex border-b h-12">
									{dateRange.map((date, index) => (
										<div
											key={index}
											className="flex-1 flex flex-col items-center justify-center text-xs border-r last:border-r-0"
										>
											<div className="text-muted-foreground">
												{weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1]}
											</div>
											<div className="font-medium">{format(date, "d")}</div>
										</div>
									))}
								</div>

								{tasks.map((task) => {
									const position = getTaskPosition(task);
									return (
										<div key={task.id} className="relative h-16 border-b">
											<div className="flex h-full">
												{dateRange.map((_, index) => (
													<div
														key={index}
														className="flex-1 border-r last:border-r-0"
													/>
												))}
											</div>
											{position && (
												<div
													className="absolute top-1/2 -translate-y-1/2 h-10 rounded-lg flex items-center px-3 text-white text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity"
													style={{
														left: position.left,
														width: position.width,
														backgroundColor: task.color,
													}}
												>
													<span className="truncate">{task.progress}%</span>
												</div>
											)}
										</div>
									);
								})}

								<div className="h-12 relative">
									<div className="flex h-full">
										{dateRange.map((_, index) => (
											<div
												key={index}
												className="flex-1 border-r last:border-r-0"
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
