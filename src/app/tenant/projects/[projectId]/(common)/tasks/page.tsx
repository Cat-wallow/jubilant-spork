"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import RBAC from "@/components/rbac/RBAC";
import { cn } from "@/lib/utils";
import { createProjectTask, getProjectMembers } from "@/services/project.service";
import {
	ClipboardList,
	PlayCircle,
	Eye,
	CheckCircle2,
	LayoutList,
	LayoutGrid,
	Filter as FilterIcon,
	CalendarDays,
	ChevronDown,
} from "lucide-react";

type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

interface Task {
	id: string;
	title: string;
	module: string;
	assigneeInitials: string;
	assigneeName: string;
	priority: TaskPriority;
	status: TaskStatus;
	progress: number;
	dueDate: string; // YYYY-MM-DD
	updatedAt: string; // YYYY-MM-DD
	badge?: "OVERDUE" | "BLOCKED";
}

const createTaskFormSchema = z.object({
	projectId: z.string().min(1),
	title: z.string().min(1, "Judul wajib diisi"),
	description: z.string().optional(),
	assignedUserId: z.string().uuid().optional(),
	module: z.enum(["FORM_1", "KK_1", "KK_2", "KK_3", "KK_4", "KK_5"]),
	priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
	dueDate: z.date().optional(),
});

type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;

const tabs = [
	{ label: "Ringkasan", path: "summary" },
	{ label: "Task", path: "tasks" },
	{ label: "Timeline", path: "timeline" },
	{ label: "Team", path: "team" },
	{ label: "Diskusi", path: "discussion" },
	{ label: "Issues", path: "issues" },
	{ label: "Activity", path: "activity" },
	{ label: "Documents", path: "documents" },
	{ label: "File", path: "file" },
	{ label: "Billing", path: "billing" },
	{ label: "Report", path: "report" },
	{ label: "Settings", path: "settings" },
];

const dummyTasks: Task[] = [
	{
		id: "1",
		title: "Upload bukti transaksi bulan Desember",
		module: "Form 1.0",
		assigneeInitials: "KR",
		assigneeName: "Karsara",
		priority: "MEDIUM",
		status: "TODO",
		progress: 10,
		badge: "OVERDUE",
		dueDate: "2024-10-10",
		updatedAt: "2024-10-10",
	},
	{
		id: "2",
		title: "Upload bukti transaksi bulan Desember",
		module: "KK 1.0",
		assigneeInitials: "KR",
		assigneeName: "Karsara",
		priority: "HIGH",
		status: "IN_PROGRESS",
		progress: 45,
		dueDate: "2024-10-10",
		updatedAt: "2024-10-10",
	},
	{
		id: "3",
		title: "Review draft KK 2.0",
		module: "KK 2.0",
		assigneeInitials: "ST",
		assigneeName: "Sony Tandara",
		priority: "MEDIUM",
		status: "IN_REVIEW",
		progress: 75,
		dueDate: "2024-10-10",
		updatedAt: "2024-10-09",
	},
	{
		id: "4",
		title: "Finalisasi kalkulasi pajak",
		module: "KK 3.0",
		assigneeInitials: "DK",
		assigneeName: "Dewi Kartika",
		priority: "LOW",
		status: "IN_PROGRESS",
		progress: 60,
		badge: "BLOCKED",
		dueDate: "2024-10-12",
		updatedAt: "2024-10-10",
	},
	{
		id: "5",
		title: "Cek kelengkapan dokumen minimal",
		module: "Form 1.0",
		assigneeInitials: "AM",
		assigneeName: "Amara",
		priority: "MEDIUM",
		status: "DONE",
		progress: 100,
		dueDate: "2024-10-05",
		updatedAt: "2024-10-06",
	},
];

function formatProjectModuleLabel(module: string) {
	const normalized = module.toUpperCase();
	if (normalized === "FORM_1") return "Form 1.0";
	if (normalized === "KK_1") return "KK 1.0";
	if (normalized === "KK_2") return "KK 2.0";
	if (normalized === "KK_3") return "KK 3.0";
	if (normalized === "KK_4") return "KK 4.0";
	if (normalized === "KK_5") return "KK 5.0";
	return module;
}

function getInitials(name: string) {
	const parts = name
		.split(" ")
		.map((p) => p.trim())
		.filter(Boolean);
	if (parts.length === 0) return "-";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[1][0]).toUpperCase();
}

function mapBackendStatusToUi(status: string): TaskStatus {
	const normalized = status.toUpperCase();
	if (normalized === "OPEN") return "TODO";
	if (normalized === "IN_PROGRESS") return "IN_PROGRESS";
	if (normalized === "ON_REVIEW") return "IN_REVIEW";
	if (normalized === "FINISHED") return "DONE";
	return "TODO";
}

function TasksPageContent() {
	const params = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const projectId = params.projectId as string;

	const currentTab = pathname?.split("/").pop() || "summary";

	const queryClient = useQueryClient();

	const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
	const [moduleFilter, setModuleFilter] = useState<string>("all");
	const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
	const [priorityFilter, setPriorityFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [dueFilter, setDueFilter] = useState<string>("all");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedTasks, setSelectedTasks] = useState<Record<string, boolean>>(
		{},
	);
	const [tasks, setTasks] = useState<Task[]>(dummyTasks);
	const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
	const [assigneeSearch, setAssigneeSearch] = useState("");
	const [debouncedAssigneeSearch] = useDebounce(assigneeSearch, 350);

	const handleTabClick = (tabPath: string) => {
		router.push(`/tenant/projects/${projectId}/${tabPath}`);
	};

	const form = useForm<CreateTaskFormValues>({
		resolver: zodResolver(createTaskFormSchema),
		defaultValues: {
			projectId,
			title: "",
			description: "",
			assignedUserId: undefined,
			module: "FORM_1",
			priority: "MEDIUM",
			dueDate: undefined,
		},
	});

	const { data: membersData, isLoading: isMembersLoading } = useQuery<Awaited<ReturnType<typeof getProjectMembers>>>({
		queryKey: ["projectMembers", projectId, debouncedAssigneeSearch],
		queryFn: () =>
			getProjectMembers({
				projectId,
				page: 1,
				pageSize: 20,
				search: debouncedAssigneeSearch,
			}),
		enabled: isCreateTaskOpen,
		placeholderData: keepPreviousData,
		staleTime: 60 * 1000,
	});

	const members = membersData?.data?.members ?? [];
	const selectedAssigneeId = form.watch("assignedUserId");
	const selectedAssignee = members.find((m) => m.id === selectedAssigneeId);

	const createTaskMutation = useMutation({
		mutationFn: async (values: CreateTaskFormValues) => {
			return createProjectTask(projectId, {
				title: values.title,
				description: values.description,
				assigned_user_id: values.assignedUserId,
				module: values.module,
				priority: values.priority,
				due_date: values.dueDate ? values.dueDate.toISOString() : undefined,
			});
		},
		onSuccess: (created) => {
			const moduleLabel = formatProjectModuleLabel(created.module);
			const due = created.due_date
				? new Date(created.due_date).toISOString().slice(0, 10)
				: new Date().toISOString().slice(0, 10);
			const updated = created.updated_at
				? new Date(created.updated_at).toISOString().slice(0, 10)
				: new Date().toISOString().slice(0, 10);
			const assigneeName = selectedAssignee?.name ?? "Unassigned";

			setTasks((prev) => [
				{
					id: created.id,
					title: created.title,
					module: moduleLabel,
					assigneeInitials: getInitials(assigneeName),
					assigneeName,
					priority: created.priority,
					status: mapBackendStatusToUi(created.status),
					progress: created.progress ?? 0,
					dueDate: due,
					updatedAt: updated,
				},
				...prev,
			]);

			toast.success("Berhasil", { description: "Task berhasil dibuat." });
			queryClient.invalidateQueries({ queryKey: ["projectTasks", projectId] });
			setIsCreateTaskOpen(false);
			setAssigneeSearch("");
			form.reset({ ...form.getValues(), title: "", description: "", assignedUserId: undefined, dueDate: undefined });
		},
		onError: () => {
			toast.error("Gagal", { description: "Task gagal dibuat." });
		},
	});

	const filteredTasks = useMemo(() => {
		return tasks.filter((task) => {
			if (
				moduleFilter !== "all" &&
				task.module.toLowerCase() !== moduleFilter.toLowerCase()
			) {
				return false;
			}

			if (
				assigneeFilter !== "all" &&
				assigneeFilter !== task.assigneeName &&
				assigneeFilter !== task.assigneeInitials
			) {
				return false;
			}

			if (priorityFilter !== "all" && priorityFilter !== task.priority) {
				return false;
			}

			if (statusFilter !== "all") {
				const map: Record<string, TaskStatus> = {
					todo: "TODO",
					in_progress: "IN_PROGRESS",
					in_review: "IN_REVIEW",
					done: "DONE",
				};
				if (map[statusFilter] !== task.status) return false;
			}

			if (dueFilter === "overdue") {
				if (task.badge !== "OVERDUE") return false;
			}

			if (
				searchQuery &&
				!task.title.toLowerCase().includes(searchQuery.toLowerCase())
			) {
				return false;
			}

			return true;
		});
	}, [
		tasks,
		moduleFilter,
		assigneeFilter,
		priorityFilter,
		statusFilter,
		dueFilter,
		searchQuery,
	]);

	const statusCounts = useMemo(() => {
		return filteredTasks.reduce(
			(acc, task) => {
				acc[task.status] += 1;
				return acc;
			},
			{ TODO: 0, IN_PROGRESS: 0, IN_REVIEW: 0, DONE: 0 } as Record<
				TaskStatus,
				number
			>,
		);
	}, [filteredTasks]);

	const allSelected =
		filteredTasks.length > 0 &&
		filteredTasks.every((task) => selectedTasks[task.id]);

	const selectedCount = Object.values(selectedTasks).filter(Boolean).length;

	const toggleSelectAll = (checked: boolean) => {
		const next: Record<string, boolean> = {};
		filteredTasks.forEach((task) => {
			next[task.id] = checked;
		});
		setSelectedTasks(next);
	};

	const toggleSelect = (id: string, checked: boolean) => {
		setSelectedTasks((prev) => ({ ...prev, [id]: checked }));
	};

	const handleBulkAction = (
		action: "reassign" | "changeDue" | "updateProgress",
	) => {
		const ids = Object.entries(selectedTasks)
			.filter(([, v]) => v)
			.map(([id]) => id);
		if (ids.length === 0) return;
		// Placeholder – integrate with backend later
		console.log("Bulk action", action, ids);
	};

	const uniqueModules = Array.from(new Set(tasks.map((t) => t.module)));
	const uniqueAssignees = Array.from(
		new Set(tasks.map((t) => t.assigneeName)),
	);

	return (
		<div className="flex w-full flex-col gap-[30px] ">
			{/* Status summary cards */}
			<div className="grid grid-cols-4 gap-[30px]">
				<Card className="flex h-[97px] items-center gap-[18px] rounded-[20px] px-5 py-[6px]">
					<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
						<ClipboardList className="h-[30px] w-[30px] text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6  text-[#A3AED0]">
							Not Started
						</span>
						<span className="font-dm text-2xl font-bold leading-8  text-muted-foreground">
							{statusCounts["TODO"]} Task
						</span>
						<span className="font-dm text-xs leading-5  text-[#A3AED0]">
							12 My task
						</span>
					</div>
				</Card>
				<Card className="flex h-[97px] items-center gap-[18px] rounded-[20px] px-5 py-[6px]">
					<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
						<PlayCircle className="h-[30px] w-[30px] text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6  text-[#A3AED0]">
							In Progress
						</span>
						<span className="font-dm text-2xl font-bold leading-8  text-muted-foreground">
							{statusCounts["IN_PROGRESS"]} Task
						</span>
						<span className="font-dm text-xs leading-5  text-[#A3AED0]">
							2 My task
						</span>
					</div>
				</Card>
				<Card className="flex h-[97px] items-center gap-[18px] rounded-[20px] px-5 py-[6px]">
					<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
						<Eye className="h-[30px] w-[30px] text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6  text-[#A3AED0]">
							Awaiting Review and Approval
						</span>
						<span className="font-dm text-2xl font-bold leading-8  text-muted-foreground">
							{statusCounts["IN_REVIEW"]} Task
						</span>
						<span className="font-dm text-xs leading-5  text-[#A3AED0]">
							2 My task
						</span>
					</div>
				</Card>
				<Card className="flex h-[97px] items-center gap-[18px] rounded-[20px] px-5 py-[6px]">
					<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
						<CheckCircle2 className="h-[30px] w-[30px] text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6  text-[#A3AED0]">
							Complete
						</span>
						<span className="font-dm text-2xl font-bold leading-8  text-muted-foreground">
							{statusCounts["DONE"]} Task
						</span>
						<span className="font-dm text-xs leading-5  text-[#A3AED0]">
							2 My task
						</span>
					</div>
				</Card>
			</div>

			{/* Task list + filters */}
			<Card className="mt-[10px] rounded-[20px] p-6">
				<div className="mb-4 flex flex-wrap items-center justify-between gap-4">
					<div className="flex flex-col">
						<h2 className="text-2xl font-bold">Task</h2>
						<p className="text-sm text-muted-foreground">
							Kelola tugas di dalam Project
						</p>
					</div>
					<div className="flex items-center gap-3">
						<Dialog
							open={isCreateTaskOpen}
							onOpenChange={(open) => {
								setIsCreateTaskOpen(open);
								if (!open) {
									setAssigneeSearch("");
									form.reset({
										projectId,
										title: "",
										description: "",
										assignedUserId: undefined,
										module: "FORM_1",
										priority: "MEDIUM",
										dueDate: undefined,
									});
								}
							}}
						>
							<DialogTrigger asChild>
								<Button className="gap-2">
									<PlusIcon />
									Tambah Tugas
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-[680px]">
								<DialogHeader>
									<DialogTitle>Tambah Tugas</DialogTitle>
								</DialogHeader>

								<form
									className="grid gap-4"
									onSubmit={form.handleSubmit((values) =>
										createTaskMutation.mutate(values),
									)}
								>
									<input type="hidden" value={projectId} {...form.register("projectId")} />

									<div className="grid gap-2">
										<Label htmlFor="title">Title</Label>
										<Input id="title" {...form.register("title")} />
										{form.formState.errors.title?.message ? (
											<p className="text-sm text-red-600">
												{form.formState.errors.title.message}
											</p>
										) : null}
									</div>

									<div className="grid gap-2">
										<Label htmlFor="description">Description</Label>
										<Textarea
											id="description"
											rows={4}
											{...form.register("description")}
										/>
									</div>

									<div className="grid gap-2">
										<Label>Assignee</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													type="button"
													variant="outline"
													className="w-full justify-between"
												>
													<span className="truncate">
														{selectedAssignee?.name ?? "Pilih assignee"}
													</span>
													<ChevronDown className="h-4 w-4 opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent align="start" className="w-[420px] p-3">
												<div className="grid gap-2">
													<Input
														placeholder="Cari user..."
														value={assigneeSearch}
														onChange={(e) => setAssigneeSearch(e.target.value)}
													/>

													<div className="max-h-56 overflow-y-auto rounded-md border">
														<Button
															type="button"
															variant="ghost"
															className="w-full justify-start rounded-none"
															onClick={() => form.setValue("assignedUserId", undefined)}
														>
															Unassigned
														</Button>
														{isMembersLoading ? (
															<div className="p-3 text-sm text-muted-foreground">
																Loading...
															</div>
														) : members.length === 0 ? (
															<div className="p-3 text-sm text-muted-foreground">
																User tidak ditemukan
															</div>
														) : (
															members.map((m) => (
																<Button
																	key={m.id}
																	type="button"
																	variant="ghost"
																	className="w-full justify-start rounded-none"
																	onClick={() =>
																		form.setValue("assignedUserId", m.id)
																	}
																>
																	{m.name}
																</Button>
															))
														)}
													</div>
												</div>
											</PopoverContent>
										</Popover>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-2">
											<Label>Modul</Label>
											<Controller
												control={form.control}
												name="module"
												render={({ field }) => (
													<Select
														value={field.value}
														onValueChange={field.onChange}
													>
														<SelectTrigger>
															<SelectValue placeholder="Pilih modul" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="FORM_1">Form 1.0</SelectItem>
															<SelectItem value="KK_1">KK 1.0</SelectItem>
															<SelectItem value="KK_2">KK 2.0</SelectItem>
															<SelectItem value="KK_3">KK 3.0</SelectItem>
															<SelectItem value="KK_4">KK 4.0</SelectItem>
															<SelectItem value="KK_5">KK 5.0</SelectItem>
														</SelectContent>
													</Select>
												)}
											/>
										</div>

										<div className="grid gap-2">
											<Label>Priority</Label>
											<Controller
												control={form.control}
												name="priority"
												render={({ field }) => (
													<Select
														value={field.value ?? ""}
														onValueChange={(v) =>
															field.onChange(v ? (v as any) : undefined)
														}
													>
														<SelectTrigger>
															<SelectValue placeholder="Pilih priority" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="LOW">Low</SelectItem>
															<SelectItem value="MEDIUM">Medium</SelectItem>
															<SelectItem value="HIGH">High</SelectItem>
														</SelectContent>
													</Select>
												)}
											/>
										</div>
									</div>

									<div className="grid gap-2">
										<Label>Due date</Label>
										<Controller
											control={form.control}
											name="dueDate"
											render={({ field }) => (
												<DatePicker
													value={field.value}
													onChange={field.onChange}
													placeholder="Pilih tanggal jatuh tempo"
												/>
											)}
										/>
									</div>

									<DialogFooter>
										<Button
											type="submit"
											disabled={createTaskMutation.isPending}
										>
											{createTaskMutation.isPending ? "Menyimpan..." : "Simpan"}
										</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
						<div className="inline-flex rounded-[10px] bg-[#F4F7FE] p-1">
							<Button
								variant={viewMode === "list" ? "default" : "ghost"}
								size="icon"
								className={cn(
									"h-9 w-9 rounded-[8px]",
									viewMode === "list"
										? "bg-white text-[#332687]"
										: "text-[#757575]",
								)}
								onClick={() => setViewMode("list")}
							>
								<LayoutList className="h-5 w-5" />
							</Button>
							<Button
								variant={viewMode === "kanban" ? "default" : "ghost"}
								size="icon"
								className={cn(
									"h-9 w-9 rounded-[8px]",
									viewMode === "kanban"
										? "bg-white text-[#332687]"
										: "text-[#757575]",
								)}
								onClick={() => setViewMode("kanban")}
							>
								<LayoutGrid className="h-5 w-5" />
							</Button>
						</div>
					</div>
				</div>

				{/* Filters row */}
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<div className="flex h-[40px] items-center rounded-[10px] border border-border bg-background px-[10px]">
						<Select defaultValue="20">
							<SelectTrigger className="h-full w-[70px] border-0 bg-transparent px-1">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="10">10</SelectItem>
								<SelectItem value="20">20</SelectItem>
								<SelectItem value="50">50</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-1 min-w-[220px] items-center gap-2 rounded-[10px] border border-border bg-background px-3">
						<FilterIcon className="h-4 w-4 text-[#332687]" />
						<Input
							placeholder="Cari nama tugas"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-[40px] border-0 bg-transparent focus-visible:ring-0"
						/>
					</div>
					<Select value={moduleFilter} onValueChange={setModuleFilter}>
						<SelectTrigger className="w-[140px] rounded-[10px] border border-border bg-background">
							<SelectValue placeholder="Modul" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Modul</SelectItem>
							{uniqueModules.map((m) => (
								<SelectItem key={m} value={m}>
									{m}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
						<SelectTrigger className="w-[160px] rounded-[10px] border border-border bg-background">
							<SelectValue placeholder="Assignee" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Assignee</SelectItem>
							{uniqueAssignees.map((a) => (
								<SelectItem key={a} value={a}>
									{a}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select value={priorityFilter} onValueChange={setPriorityFilter}>
						<SelectTrigger className="w-[140px] rounded-[10px] border border-border bg-background">
							<SelectValue placeholder="Priority" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Priority</SelectItem>
							<SelectItem value="HIGH">High</SelectItem>
							<SelectItem value="MEDIUM">Medium</SelectItem>
							<SelectItem value="LOW">Low</SelectItem>
						</SelectContent>
					</Select>
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-[150px] rounded-[10px] border border-border bg-background">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="todo">To-Do</SelectItem>
							<SelectItem value="in_progress">In Progress</SelectItem>
							<SelectItem value="in_review">In Review</SelectItem>
							<SelectItem value="done">Done</SelectItem>
						</SelectContent>
					</Select>
					<Select value={dueFilter} onValueChange={setDueFilter}>
						<SelectTrigger className="w-[130px] rounded-[10px] border border-border bg-background">
							<SelectValue placeholder="Due" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Due</SelectItem>
							<SelectItem value="overdue">Overdue</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Bulk actions */}
				{selectedCount > 0 && (
					<div className="mb-4 flex items-center gap-3 rounded-[10px] bg-muted px-4 py-2 text-sm">
						<span className="font-medium">{selectedCount} task selected</span>
						<div className="flex flex-wrap gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleBulkAction("reassign")}
							>
								Reassign
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleBulkAction("changeDue")}
							>
								Change due date
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleBulkAction("updateProgress")}
							>
								Update progress
							</Button>
						</div>
					</div>
				)}

				{viewMode === "list" ? (
					<TaskTableView
						tasks={filteredTasks}
						allSelected={allSelected}
						onToggleAll={toggleSelectAll}
						onToggleOne={toggleSelect}
						selectedTasks={selectedTasks}
					/>
				) : (
					<KanbanView tasks={filteredTasks} />
				)}
			</Card>
		</div>
	);
}

function TaskTableView({
	tasks,
	allSelected,
	onToggleAll,
	onToggleOne,
	selectedTasks,
}: {
	tasks: Task[];
	allSelected: boolean;
	onToggleAll: (checked: boolean) => void;
	onToggleOne: (id: string, checked: boolean) => void;
	selectedTasks: Record<string, boolean>;
}) {
	return (
		<div className="mt-4 space-y-2">
			<div className="h-px w-full bg-[#E9EDF7]" />
			<div className="grid grid-cols-[minmax(0,3fr)_minmax(0,1.5fr)_minmax(0,1.5fr)_minmax(0,1.2fr)_minmax(0,1.5fr)_minmax(0,1.3fr)_minmax(0,1.2fr)] items-center gap-3 px-2 py-2 text-xs font-medium text-[#6E7184]">
				<div className="flex items-center gap-2">
					<Checkbox
						checked={allSelected}
						onCheckedChange={(v) => onToggleAll(Boolean(v))}
					/>
					<span>Task</span>
				</div>
				<span>Modul</span>
				<span>Assignee</span>
				<span>Priority</span>
				<span>Status</span>
				<span>Progress</span>
				<span>Due</span>
			</div>
			<div className="space-y-1">
				{tasks.map((task) => (
					<div
						key={task.id}
						className="grid grid-cols-[minmax(0,3fr)_minmax(0,1.5fr)_minmax(0,1.5fr)_minmax(0,1.2fr)_minmax(0,1.5fr)_minmax(0,1.3fr)_minmax(0,1.2fr)] items-center gap-3 rounded-[10px] px-2 py-2 hover:bg-[#F9FAFB]"
					>
						<div className="flex items-center gap-3">
							<Checkbox
								checked={Boolean(selectedTasks[task.id])}
								onCheckedChange={(v) => onToggleOne(task.id, Boolean(v))}
							/>
							<div className="flex flex-col">
								<span className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-primary">
									{task.title}
								</span>
								<span className="text-xs text-[#6E7184]">
									Update: {task.updatedAt}
								</span>
							</div>
						</div>
						<div>
							<span className="rounded-[6.25px] border border-[#C2C5CC] bg-[#EEEFF1] px-2 py-[3px] text-[11px] text-[#7C7D8C]">
								{task.module}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-semibold text-white">
								{task.assigneeInitials}
							</div>
							<span className="text-sm font-medium text-muted-foreground">
								{task.assigneeName}
							</span>
						</div>
						<div>
							<PriorityBadge priority={task.priority} />
						</div>
						<div>
							<StatusBadge status={task.status} />
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-bold text-primary">
								{task.progress}%
							</span>
							<div className="relative h-2 w-[70px] overflow-hidden rounded-[21px] bg-[#EFF4FB]">
								<div
									className="h-full rounded-[21px] bg-[#4318FF]"
									style={{ width: `${task.progress}%` }}
								/>
							</div>
						</div>
						<div className="flex flex-col items-end gap-1">
							<div className="flex items-center gap-1 rounded-[6px] border border-[#D9D9D9] bg-[#F9FAFB] px-2 py-[3px] text-xs">
								<CalendarDays className="h-3 w-3 text-[#332687]" />
								<span className="text-muted-foreground">{task.dueDate}</span>
							</div>
							{task.badge && (
								<Badge
									className={cn(
										"inline-flex items-center justify-center rounded-[5px] px-2 py-[3px] text-xs whitespace-nowrap",
										task.badge === "OVERDUE"
											? "bg-[#EC221F] text-white"
											: "bg-[#FFE8A3] text-[#BF6A02]",
									)}
								>
									{task.badge === "OVERDUE" ? "Overdue" : "Blocked"}
								</Badge>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function KanbanView({ tasks }: { tasks: Task[] }) {
	const columns: { key: TaskStatus; title: string }[] = [
		{ key: "TODO", title: "To-Do" },
		{ key: "IN_PROGRESS", title: "In-Progress" },
		{ key: "IN_REVIEW", title: "In-Review" },
		{ key: "DONE", title: "Done" },
	];

	return (
		<div className="mt-4 grid gap-4 md:grid-cols-4">
			{columns.map((col) => (
				<div
					key={col.key}
					className="flex flex-col gap-3 rounded-[16px] bg-[#F4F7FE] p-3"
				>
					<div className="flex items-center justify-between">
						<span className="text-sm font-semibold text-muted-foreground">
							{col.title}
						</span>
						<span className="text-xs text-[#6E7184]">
							{tasks.filter((t) => t.status === col.key).length} Task
						</span>
					</div>
					<div className="space-y-3">
						{tasks
							.filter((t) => t.status === col.key)
							.map((task) => (
								<div
									key={task.id}
									className="flex flex-col gap-2 rounded-[14px] border border-[#E2E8F0] bg-white p-3 shadow-sm"
								>
									<div className="flex items-start justify-between gap-2">
										<div className="flex-1">
											<p className="font-dm text-sm font-bold leading-5 text-primary">
												{task.title}
											</p>
											<p className="text-xs text-[#6E7184]">{task.module}</p>
										</div>
										<PriorityBadge priority={task.priority} />
									</div>
									<div className="flex items-center justify-between gap-2">
										<div className="flex items-center gap-2">
											<div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4F46E5] text-[11px] font-semibold text-white">
												{task.assigneeInitials}
											</div>
											<span className="text-xs text-muted-foreground">
												{task.assigneeName}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<div className="flex items-center gap-1">
												<span className="text-xs font-semibold text-primary">
													{task.progress}%
												</span>
												<div className="relative h-1.5 w-[60px] overflow-hidden rounded-[21px] bg-[#EFF4FB]">
													<div
														className="h-full rounded-[21px] bg-[#4318FF]"
														style={{ width: `${task.progress}%` }}
													/>
												</div>
											</div>
											<div className="flex items-center gap-1 rounded-[6px] border border-[#D9D9D9] bg-[#F9FAFB] px-2 py-[2px] text-[10px]">
												<CalendarDays className="h-3 w-3 text-[#332687]" />
												<span className="text-primary">{task.dueDate}</span>
											</div>
										</div>
									</div>
									{task.badge && (
										<div className="flex justify-between">
											<StatusBadge status={task.status} />
											<Badge
												className={cn(
													"rounded-[5px] px-2 py-[3px] text-[10px]",
													task.badge === "OVERDUE"
														? "bg-[#EC221F] text-white"
														: "bg-[#FFE8A3] text-[#BF6A02]",
												)}
											>
												{task.badge === "OVERDUE" ? "Overdue" : "Blocked"}
											</Badge>
										</div>
									)}
								</div>
							))}
					</div>
				</div>
			))}
		</div>
	);
}

function PriorityBadge({ priority }: { priority: TaskPriority }) {
	if (priority === "HIGH") {
		return (
			<span className="inline-flex items-center justify-center rounded-[50px] bg-[#FDD3D0] px-3 py-1 text-xs font-medium text-[#BF6A02]">
				High
			</span>
		);
	}
	if (priority === "LOW") {
		return (
			<span className="inline-flex items-center justify-center rounded-[50px] bg-[#E8F5E9] px-3 py-1 text-xs font-medium text-[#2E7D32]">
				Low
			</span>
		);
	}
	return (
		<span className="inline-flex items-center justify-center rounded-[50px] bg-[#FFE8A3] px-3 py-1 text-xs font-medium text-[#BF6A02]">
			Medium
		</span>
	);
}

function StatusBadge({ status }: { status: TaskStatus }) {
	const map: Record<TaskStatus, { label: string; className: string }> = {
		TODO: {
			label: "To-Do",
			className: "bg-[#F4F7FE] text-muted-foreground",
		},
		IN_PROGRESS: {
			label: "In Progress",
			className: "bg-[#E8DEF8] text-muted-foreground",
		},
		IN_REVIEW: {
			label: "In Review",
			className: "bg-[#FFE8A3] text-[#BF6A02]",
		},
		DONE: {
			label: "Selesai",
			className: "bg-[#CFF7D3] text-muted-foreground",
		},
	};

	const cfg = map[status];
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center rounded-[50px] px-3 py-1 text-xs font-medium",
				cfg.className,
			)}
		>
			{cfg.label}
		</span>
	);
}

function PlusIcon() {
	return <span className="text-xl leading-none">+</span>;
}

export default function TasksPage() {
	return (
		<RBAC
			requiredPermission={["project:manage", "project:read"]}
			unauthorizedPage={true}
		>
			<TasksPageContent />
		</RBAC>
	);
}
