"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { GanttChart } from "./components/GanttChart";
import { BoardChart } from "./components/BoardChart";
import { TimelineFilters } from "./components/TimelineFilters";
import {
	mockTimelineTasks,
	mockBoardCards,
	modules,
	milestoneTypes,
} from "./data";
import { exportToPNG, exportToPDF } from "./utils/export";

export default function TimelinePage() {
	const [selectedModule, setSelectedModule] = useState("All Module");
	const [selectedMilestone, setSelectedMilestone] = useState("Milestone Type");
	const [selectedZoom, setSelectedZoom] = useState("Zoom By");
	const [viewMode, setViewMode] = useState<"gantt" | "board">("gantt");

	const handleExportPNG = () => {
		const elementId =
			viewMode === "gantt" ? "gantt-chart-export" : "board-chart-export";
		exportToPNG(elementId, `project-timeline-${viewMode}-${Date.now()}`);
	};

	const handleExportPDF = () => {
		const elementId =
			viewMode === "gantt" ? "gantt-chart-export" : "board-chart-export";
		exportToPDF(elementId, `project-timeline-${viewMode}-${Date.now()}`);
	};

	return (
		<Card className="flex w-full flex-col gap-[30px]  p-[30px]">
			<div className="flex flex-col items-start gap-[50px] rounded-[20px]">
				<div className="flex w-full items-start justify-between">
					<div className="flex flex-col items-start">
						<h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
							Project Timeline
						</h2>
						<p className=" text-xs leading-4 tracking-[0.4px] text-primary">
							Tinjau dan kelola timeline project
						</p>
					</div>
					<Button className="h-12 rounded-[10px] bg-primary hover:bg-[#241963]">
						<span className=" text-sm font-medium leading-5 tracking-[0.1px] text-white">
							Tambah Tugas
						</span>
					</Button>
				</div>

				<TimelineFilters
					selectedModule={selectedModule}
					setSelectedModule={setSelectedModule}
					selectedMilestone={selectedMilestone}
					setSelectedMilestone={setSelectedMilestone}
					selectedZoom={selectedZoom}
					setSelectedZoom={setSelectedZoom}
					onExportPNG={handleExportPNG}
					onExportPDF={handleExportPDF}
					modules={modules}
					milestones={milestoneTypes}
				/>

				<Card className="overflow-hidden border-2  rounded-[30px] w-full p-10">
					<Tabs
						value={viewMode}
						onValueChange={(v) => setViewMode(v as "gantt" | "board")}
						className="w-full"
					>
						<TabsList className="mb-6">
							<TabsTrigger value="gantt" className="font-medium">
								Gantt Chart
							</TabsTrigger>
							<TabsTrigger value="board" className="font-medium">
								Board
							</TabsTrigger>
						</TabsList>

						<TabsContent value="gantt" className="mt-0">
							<GanttChart tasks={mockTimelineTasks} />
						</TabsContent>

						<TabsContent value="board" className="mt-0">
							<BoardChart cards={mockBoardCards} />
						</TabsContent>
					</Tabs>
				</Card>
			</div>
		</Card>
	);
}
