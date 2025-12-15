"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import RBAC from "@/components/rbac/RBAC";
import { cn } from "@/lib/utils";
import {
	Search,
	ChevronRight,
	CheckCircle2,
	AlertCircle,
	Lock,
} from "lucide-react";

type ModuleStatus = "NOT_STARTED" | "IN_PROGRESS" | "REVIEW" | "APPROVED";

interface DiscussionModule {
	id: string;
	code: string; // e.g. "Form 1.0", "KK 1.0"
	stepLabel: string; // e.g. "Form 1.0", "KK1"
	status: ModuleStatus;
	progress: number;
	overdueTasks: number;
	readyForReviewPercent: number;
	openTasks: number;
}

const modules: DiscussionModule[] = [
	{
		id: "form-1",
		code: "Form 1.0",
		stepLabel: "Form 1.0",
		status: "APPROVED",
		progress: 100,
		overdueTasks: 0,
		readyForReviewPercent: 100,
		openTasks: 0,
	},
	{
		id: "kk-1",
		code: "KK 1.0",
		stepLabel: "KK1",
		status: "APPROVED",
		progress: 100,
		overdueTasks: 0,
		readyForReviewPercent: 100,
		openTasks: 0,
	},
	{
		id: "kk-2",
		code: "KK 2.0",
		stepLabel: "KK2",
		status: "APPROVED",
		progress: 92,
		overdueTasks: 1,
		readyForReviewPercent: 80,
		openTasks: 2,
	},
	{
		id: "kk-3",
		code: "KK 3.0",
		stepLabel: "KK3",
		status: "IN_PROGRESS",
		progress: 65,
		overdueTasks: 2,
		readyForReviewPercent: 45,
		openTasks: 4,
	},
	{
		id: "kk-4",
		code: "KK 4.0",
		stepLabel: "KK4",
		status: "IN_PROGRESS",
		progress: 40,
		overdueTasks: 0,
		readyForReviewPercent: 20,
		openTasks: 3,
	},
	{
		id: "kk-5",
		code: "KK 5.0",
		stepLabel: "KK5",
		status: "NOT_STARTED",
		progress: 0,
		overdueTasks: 0,
		readyForReviewPercent: 0,
		openTasks: 0,
	},
];

function getStatusConfig(status: ModuleStatus) {
	switch (status) {
		case "APPROVED":
			return { label: "Approved", className: "bg-[#CFF7D3] text-[#1B5E20]" };
		case "REVIEW":
			return { label: "Review", className: "bg-[#FFE8A3] text-[#BF6A02]" };
		case "IN_PROGRESS":
			return { label: "In Progress", className: "bg-[#F4F7FE] text-[#332687]" };
		case "NOT_STARTED":
		default:
			return { label: "Draft", className: "bg-muted text-muted-foreground" };
	}
}

function DiscussionPageContent() {
	const params = useParams();
	const projectId = params.id as string;

	const [activeModuleId, setActiveModuleId] = useState<string>(modules[0]?.id);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<"all" | ModuleStatus>("all");

	const kk5Index = modules.findIndex((m) => m.id === "kk-5");
	const allBeforeKk5Approved =
		kk5Index > 0 &&
		modules.slice(0, kk5Index).every((m) => m.status === "APPROVED");

	const filteredModules = useMemo(() => {
		return modules.filter((m) => {
			if (
				searchQuery &&
				!m.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
				!m.stepLabel.toLowerCase().includes(searchQuery.toLowerCase())
			) {
				return false;
			}
			if (statusFilter !== "all" && m.status !== statusFilter) return false;
			return true;
		});
	}, [searchQuery, statusFilter]);

	const handleGoToModule = (module: DiscussionModule, isLocked: boolean) => {
		if (isLocked) return;
		// Placeholder for actual navigation once module pages are ready
		console.log("Go to module", module.id);
	};

	return (
		<div className="flex w-full flex-col gap-[30px] p-[30px]">
			{/* Stepper */}
			<Card className="rounded-[20px] border border-border p-5">
				<CardHeader className="flex flex-col gap-1 p-0 pb-4">
					<CardTitle className="text-[20px] font-medium  text-foreground">
						Alur Modul Project
					</CardTitle>
					<p className="text-sm text-muted-foreground">
						Form 1.0 → KK1 → KK2 → KK3 → KK4 → KK5. Modul KK5 akan aktif setelah
						semua modul sebelumnya berstatus Approved.
					</p>
				</CardHeader>
				<CardContent className="p-0">
					<div className="flex flex-col gap-4">
						<div className="flex flex-wrap items-center gap-4">
							{modules.map((module, index) => {
								const isLocked = module.id === "kk-5" && !allBeforeKk5Approved;
								const isActive = module.id === activeModuleId;
								const isCompleted = module.status === "APPROVED";

								return (
									<div key={module.id} className="flex items-center gap-2">
										<button
											type="button"
											onClick={() => {
												if (isLocked) return;
												setActiveModuleId(module.id);
											}}
											className={cn(
												"flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
												isCompleted &&
													"bg-[#332687] text-white border-[#332687]",
												!isCompleted &&
													isActive &&
													!isLocked &&
													"bg-primary text-primary-foreground border-primary",
												isLocked &&
													"bg-muted text-muted-foreground border-dashed border-border",
												!isCompleted &&
													!isActive &&
													!isLocked &&
													"bg-card text-muted-foreground border-border",
											)}
										>
											{isLocked ? (
												<Lock className="h-4 w-4" />
											) : isCompleted ? (
												<CheckCircle2 className="h-4 w-4" />
											) : (
												<span>{index + 1}</span>
											)}
										</button>
										<span
											className={cn(
												"text-xs font-medium",
												isLocked && "text-muted-foreground",
												!isLocked && "text-foreground",
											)}
										>
											{module.stepLabel}
										</span>
										{index < modules.length - 1 && (
											<div className="hidden h-px w-8 bg-border sm:block md:w-12" />
										)}
									</div>
								);
							})}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Discussion modules cards */}
			<Card className="rounded-[20px] p-5">
				<div className="mb-4 flex flex-wrap items-center justify-between gap-4">
					<div className="flex flex-col gap-1">
						<h2 className="text-2xl font-bold">Forum Diskusi per Modul</h2>
						<p className="text-sm text-muted-foreground">
							Kelola forum diskusi untuk setiap modul dalam project.
						</p>
					</div>
					<div className="flex flex-1 items-center gap-2 rounded-[10px] border border-border bg-background px-4 py-2 md:max-w-md">
						<Search className="h-4 w-4 text-[#332687]" />
						<Input
							placeholder="Cari forum diskusi berdasarkan modul"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-9 border-0 bg-transparent px-0 text-sm focus-visible:ring-0"
						/>
					</div>
				</div>

				<div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
					<Button
						variant={statusFilter === "all" ? "default" : "outline"}
						size="sm"
						className="rounded-full px-3 py-1 text-xs"
						onClick={() => setStatusFilter("all")}
					>
						Semua Status
					</Button>
					<Button
						variant={statusFilter === "APPROVED" ? "default" : "outline"}
						size="sm"
						className="rounded-full px-3 py-1 text-xs"
						onClick={() => setStatusFilter("APPROVED")}
					>
						Approved
					</Button>
					<Button
						variant={statusFilter === "IN_PROGRESS" ? "default" : "outline"}
						size="sm"
						className="rounded-full px-3 py-1 text-xs"
						onClick={() => setStatusFilter("IN_PROGRESS")}
					>
						In Progress
					</Button>
					<Button
						variant={statusFilter === "REVIEW" ? "default" : "outline"}
						size="sm"
						className="rounded-full px-3 py-1 text-xs"
						onClick={() => setStatusFilter("REVIEW")}
					>
						Review
					</Button>
					<Button
						variant={statusFilter === "NOT_STARTED" ? "default" : "outline"}
						size="sm"
						className="rounded-full px-3 py-1 text-xs"
						onClick={() => setStatusFilter("NOT_STARTED")}
					>
						Draft
					</Button>
				</div>

				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{filteredModules.map((module) => {
						const isLocked = module.id === "kk-5" && !allBeforeKk5Approved;
						const isActive = module.id === activeModuleId;
						const statusCfg = getStatusConfig(module.status);

						return (
							<Card
								key={module.id}
								className={cn(
									"relative flex h-full flex-col gap-4 rounded-[20px] border border-border p-4 shadow-sm",
									isActive &&
										"border-primary ring-1 ring-primary/60 bg-muted/40",
								)}
							>
								<div className="flex items-start justify-between gap-2">
									<div className="flex flex-col gap-1">
										<span className="text-[11px] uppercase tracking-wide text-muted-foreground">
											Modul
										</span>
										<h3 className="text-sm font-semibold text-foreground">
											{module.code}
										</h3>
									</div>
									<div className="flex flex-col items-end gap-1">
										<Badge
											className={cn(
												"rounded-full px-3 py-1 text-xs",
												statusCfg.className,
											)}
										>
											{statusCfg.label}
										</Badge>
										{isLocked && (
											<span className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
												<Lock className="h-3 w-3" />
												KK5 akan aktif setelah semua modul approved
											</span>
										)}
									</div>
								</div>

								<div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
									<div>
										<p className="mb-1 text-[11px] font-medium uppercase tracking-wide">
											Status % Complete
										</p>
										<div className="flex items-center gap-2">
											<Progress
												value={module.progress}
												className="h-1.5 flex-1"
											/>
											<span className="text-xs font-semibold text-foreground">
												{module.progress}%
											</span>
										</div>
									</div>
									<div>
										<p className="mb-1 text-[11px] font-medium uppercase tracking-wide">
											Overdue
										</p>
										<div className="inline-flex items-center gap-1">
											<AlertCircle className="h-3 w-3 text-[#EC221F]" />
											<span className="text-xs font-semibold text-foreground">
												{module.overdueTasks} task
											</span>
										</div>
									</div>
									<div>
										<p className="mb-1 text-[11px] font-medium uppercase tracking-wide">
											Siap Review
										</p>
										<span className="text-xs font-semibold text-foreground">
											{module.readyForReviewPercent}% task siap di-review
										</span>
									</div>
									<div>
										<p className="mb-1 text-[11px] font-medium uppercase tracking-wide">
											Open Task
										</p>
										<span className="text-xs font-semibold text-foreground">
											{module.openTasks} task terbuka
										</span>
									</div>
								</div>

								<div className="mt-3 flex items-center justify-between gap-2">
									<Button
										variant="third"
										size="sm"
										className="gap-1 rounded-[8px] px-3 py-1 text-xs"
										onClick={() => handleGoToModule(module, isLocked)}
										disabled={isLocked}
									>
										<span>Go to</span>
										<ChevronRight className="h-4 w-4" />
									</Button>
									<div className="flex items-center gap-2 text-[11px] text-muted-foreground">
										<CheckCircle2 className="h-3 w-3" />
										<span>
											{module.progress}% selesai · {module.openTasks} open task
										</span>
									</div>
								</div>
							</Card>
						);
					})}
				</div>
			</Card>
		</div>
	);
}

export default function ProjectDiscussionPage() {
	return (
		<RBAC
			requiredPermission={["project:manage", "project:read"]}
			unauthorizedPage={true}
		>
			<DiscussionPageContent />
		</RBAC>
	);
}
