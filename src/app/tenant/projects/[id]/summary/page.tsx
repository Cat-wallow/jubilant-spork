"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
	TrendingUp,
	CheckCircle2,
	AlertCircle,
	FileCheck,
	Clock,
	Eye,
	AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy data
const projectData = {
	id: "1",
	name: "Konsultasi Pajak PT Maju Bersama",
	code: "PRJ-2025-02-001",
	client: "PT Maju Mundur Bersama",
	startDate: "2024-02-20",
	deadline: "2024-02-22",
	breadcrumb: "Project > Detail Project",
	description:
		"Konsultasi pajak komprehensif untuk PT Maju Bersama periode Januari 2024, meliputi penyusunan laporan keuangan, kalkulasi pajak, dan optimasi tax planning.",
	stats: {
		progress: 90.2,
		progressChange: "+2%",
		modulesApproval: "2/5",
		currentModule: "KK 3.0",
		overdue: 10,
		complianceStatus: 85,
		daysLeft: 30,
		totalDays: 90,
	},
	status: "In Progress",
	overallProgress: 38.5,
	modules: [
		{
			name: "Form 1.0",
			status: "Completed",
			progress: 50,
			pic: "Dewi Kartika",
			deadline: "2025-10-10",
		},
		{
			name: "KK 1.0",
			status: "Completed",
			progress: 50,
			pic: "Sony Tandara",
			deadline: "2025-10-10",
		},
		{
			name: "KK 2.0",
			status: "Completed",
			progress: 50,
			pic: "Dewi Kartika",
			deadline: "2025-10-10",
		},
		{
			name: "KK 3.0",
			status: "On Progress",
			progress: 50,
			pic: "Dewi Kartika",
			deadline: "2025-10-10",
			overdue: 1,
		},
		{
			name: "KK 4.0",
			status: "Not Started",
			progress: 50,
			pic: "Amara",
			deadline: "2025-10-10",
		},
		{
			name: "KK 5.0",
			status: "Not Started",
			progress: 50,
			pic: "Amara",
			deadline: "2025-10-10",
		},
	],
	team: [
		{
			name: "Amara",
			role: "Project Manager",
			initials: "A",
			modules: ["All Module"],
		},
		{
			name: "Karsara",
			role: "Team Leader",
			initials: "KR",
			modules: ["KK 1.0", "KK 2.0", "KK 3.0"],
		},
		{
			name: "Sony Tandara",
			role: "Team",
			initials: "ST",
			modules: ["KK 1.0"],
		},
		{
			name: "Dewi Kartika",
			role: "Team",
			initials: "DK",
			modules: ["KK 2.0", "KK 3.0"],
		},
	],
	topIssues: [
		{
			title: "Dokumen Minimal Terpenuhi",
			description: "20/25 Dokumen lengkap",
			severity: "Medium",
			percentage: 80,
		},
		{
			title: "Faktur Pajak",
			subtitle: "2 Dokumen",
			severity: "Medium",
		},
		{
			title: "Bukti Potong PPh21",
			subtitle: "2 Document",
			severity: "High",
		},
		{
			title: "Rekening Koran",
			subtitle: "1 Dokumen",
			severity: "Low",
		},
	],
	complianceIssues: [
		{
			title: "Dokumen Minimal Terpenuhi",
			description: "20/25 Dokumen lengkap",
			severity: "Medium",
			percentage: 80,
		},
		{
			title: "Client Approval required for KK 2.0",
			module: "KK 2.0",
			assignee: "Solana Liana",
			severity: "Medium",
			deadline: "2025-09-10",
		},
		{
			title: "Missing bank statement for Dec 2024",
			module: "Form 1.0",
			assignee: "Sony Tandara",
			severity: "Medium",
			deadline: "2025-09-10",
		},
		{
			title: "PMO Approval required for KK 4.0",
			module: "KK 4.0",
			assignee: "Amara",
			severity: "High",
			deadline: "2025-09-10",
		},
		{
			title: "Tax Calculation discrepancy in PPh 21",
			module: "KK 3.0",
			assignee: "Dewi Kartika",
			severity: "High",
			deadline: "2025-09-10",
		},
	],
};

const tabs = [
	{ label: "Ringkasan", path: "summary" },
	{ label: "Tasks", path: "tasks" },
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

export default function ProjectSummaryPage() {
	const params = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const projectId = params.id as string;

	const currentTab = pathname?.split("/").pop() || "summary";

	const handleTabClick = (tabPath: string) => {
		router.push(`/tenant/projects/${projectId}/${tabPath}`);
	};

	return (
		<div className="flex w-full flex-col gap-[30px]  p-[30px]">
			{/* Header */}
			<div className="flex items-center justify-center gap-2.5">
				<div className="flex flex-1 flex-col gap-[5px]">
					<p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">
						{projectData.breadcrumb}
					</p>
					<h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-tight ">
						{projectData.name}
					</h1>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium text-[#404040]">Publish</span>
					<div className="h-6 w-11 rounded-[50px] relative">
						<div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className="flex h-[42px] items-center gap-2 overflow-x-auto rounded-[5px] bg-muted/60 p-[4px]">
				{tabs.map((tab) => (
					<button
						key={tab.path}
						onClick={() => handleTabClick(tab.path)}
						className={cn(
							"flex shrink-0 items-center justify-center gap-2.5 rounded-[5px] px-[14px] py-[6px] font-public-sans text-sm font-semibold leading-[22px] transition-colors",
							currentTab === tab.path
								? "bg-white text-[#332687]"
								: "bg-transparent text-muted-foreground hover:bg-white/50",
						)}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Stats Cards */}
			<div className="flex gap-[30px]">
				{/* Progress */}
				<Card className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] p-[6px_20px]">
					<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
						<TrendingUp className="h-[30px] w-[30px] text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6 tracking-tight text-[#A3AED0]">
							Progress
						</span>
						<span className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
							{projectData.stats.progress}%
						</span>
						<div className="flex gap-2">
							<span className="font-dm text-xs font-bold leading-5 tracking-tight text-[#05CD99]">
								{projectData.stats.progressChange}
							</span>
							<span className="font-dm text-xs leading-5 tracking-tight text-[#A3AED0]">
								dari target
							</span>
						</div>
					</div>
				</Card>

				{/* Modules Approval */}
				<Card className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] p-[6px_20px]">
					<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
						<CheckCircle2 className="h-[30px] w-[30px] text-[#332687]" />
					</div>
					<div className="flex w-[144px] flex-col gap-[3px]">
						<span className="font-dm text-sm font-bold leading-6 tracking-tight text-[#A3AED0]">
							Modules Approval
						</span>
						<span className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
							{projectData.stats.modulesApproval}
						</span>
						<div className="flex gap-2">
							<span className="font-dm text-xs font-bold leading-5 tracking-tight text-[#05CD99]">
								{projectData.stats.currentModule}
							</span>
							<span className="font-dm text-xs leading-5 tracking-tight text-[#A3AED0]">
								On Progress
							</span>
						</div>
					</div>
				</Card>

				{/* Overdue */}
				<Card className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] p-[6px_20px]">
					<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
						<AlertCircle className="h-[30px] w-[30px] text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6 tracking-tight text-[#A3AED0]">
							Overdue
						</span>
						<span className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
							{projectData.stats.overdue}
						</span>
						<div className="flex gap-2">
							<span className="font-dm text-xs font-bold leading-5 tracking-tight text-[#05CD99]">
								Requires
							</span>
							<span className="font-dm text-xs leading-5 tracking-tight text-[#A3AED0]">
								your attention
							</span>
						</div>
					</div>
				</Card>

				{/* Compliance Status */}
				<Card className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] p-[6px_20px]">
					<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
						<FileCheck className="h-[30px] w-[30px] text-[#332687]" />
					</div>
					<div className="flex w-[234px] flex-col">
						<span className="font-dm text-sm font-bold leading-6 tracking-tight text-[#A3AED0]">
							Compliance Status
						</span>
						<span className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
							{projectData.stats.complianceStatus}%
						</span>
					</div>
				</Card>

				{/* Timeline */}
				<Card className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] p-[6px_20px]">
					<div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
						<Clock className="h-[30px] w-[30px] text-[#332687]" />
					</div>
					<div className="flex flex-col">
						<span className="font-dm text-sm font-bold leading-6 tracking-tight text-[#A3AED0]">
							Timeline
						</span>
						<span className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
							{projectData.stats.daysLeft} Days left
						</span>
						<div className="flex gap-2">
							<span className="font-dm text-xs font-bold leading-5 tracking-tight text-[#05CD99]">
								/ {projectData.stats.totalDays}
							</span>
							<span className="font-dm text-xs leading-5 tracking-tight text-[#A3AED0]">
								from timeline
							</span>
						</div>
					</div>
				</Card>
			</div>

			{/* Main Content */}
			<div className="flex gap-[30px]">
				{/* Left Column */}
				<div className="flex flex-1 flex-col gap-[30px]">
					{/* Project Information */}
					<Card className="rounded-[20px] p-10">
						<CardHeader className="p-0 pb-5">
							<CardTitle className="font-roboto text-[22px] font-medium leading-7">
								Informasi Project
							</CardTitle>
							<p className="font-roboto text-xs font-normal leading-4 text-[#2B3674]">
								Indormasi dasar project dan timeline
							</p>
						</CardHeader>
						<CardContent className="flex flex-col gap-2.5 p-0">
							<div className="flex justify-between">
								<span className="font-roboto text-sm text-[#404040]">
									Project ID:
								</span>
								<span className="font-roboto text-sm font-medium text-[#404040]">
									{projectData.code}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="font-roboto text-sm text-[#404040]">
									Project Name:
								</span>
								<span className="font-roboto text-sm font-medium text-[#404040]">
									Project Akuntansi dan Pajak
								</span>
							</div>
							<div className="flex justify-between">
								<span className="font-roboto text-sm text-[#404040]">
									Client Name:
								</span>
								<span className="font-roboto text-sm font-medium text-[#404040]">
									{projectData.client}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="font-roboto text-sm text-[#404040]">
									Start Date:
								</span>
								<span className="font-roboto text-sm font-medium text-[#404040]">
									{projectData.startDate}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="font-roboto text-sm text-[#404040]">
									Deadline:
								</span>
								<span className="font-roboto text-sm font-medium text-[#404040]">
									{projectData.deadline}
								</span>
							</div>
							<div className="mt-4 flex flex-col">
								<span className="font-roboto text-base font-medium text-[#404040]">
									Description
								</span>
								<p className="font-roboto text-xs leading-4 text-[#2B3674]">
									{projectData.description}
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Project Status */}
					<Card className="flex flex-col gap-5 rounded-[20px] p-5">
						<div className="flex justify-between">
							<div className="flex flex-col gap-2">
								<h3 className="font-roboto text-base font-medium text-[#2B3674]">
									Project Status
								</h3>
								<p className="font-roboto text-xs text-[#2B3674]">
									Overall progress and modul completion
								</p>
							</div>
							<Badge className="h-fit rounded-[50px] bg-[#E8DEF8] px-3 py-1.5 text-sm font-medium text-[#4A4459]">
								{projectData.status}
							</Badge>
						</div>

						<div className="flex items-center gap-5">
							<div className="flex flex-1 flex-col gap-5">
								<div className="flex justify-between">
									<span className="font-inter text-[13.9px] text-[#6E7184]">
										Progress
									</span>
									<span className="font-inter text-[12.2px] text-[#9C9EAA]">
										{projectData.overallProgress}%
									</span>
								</div>
								<div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#A3AED0]">
									<div
										className="h-full bg-[#332687]"
										style={{ width: `${projectData.overallProgress}%` }}
									/>
								</div>
							</div>
							<Button
								variant="outline"
								className="flex items-center gap-1 rounded-[5px] border border-[#CAC4D0]"
							>
								<Eye className="h-6 w-6" />
								<span className="font-roboto text-sm font-medium">View</span>
							</Button>
						</div>

						{/* Module Progress */}
						<div className="flex items-center gap-5">
							{/* Timeline */}
							<div className="flex h-[690px] flex-col justify-between">
								{projectData.modules.map((module, index) => (
									<div
										key={module.name}
										className="flex flex-col items-center gap-[3px]"
									>
										<div
											className={cn(
												"flex h-[35px] w-[35px] items-center justify-center rounded-full",
												module.status === "Completed"
													? "bg-[#14AE5C]"
													: module.status === "On Progress"
														? "bg-[#08F]"
														: "bg-[#D9D9D9]",
											)}
										>
											{module.status === "Completed" && (
												<CheckCircle2 className="h-[30px] w-[30px] text-white" />
											)}
										</div>
										{index < projectData.modules.length - 1 && (
											<div className="h-[53px] w-0.5 bg-[#8C8C8C]" />
										)}
									</div>
								))}
							</div>

							{/* Module Cards */}
							<div className="flex flex-1 flex-col gap-[25px]">
								{projectData.modules.map((module) => (
									<div
										key={module.name}
										className="flex flex-col gap-5 rounded-[20px] border border-[#D9D9D9] bg-white p-5 shadow-sm"
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2.5">
												<span className="font-inter text-xs font-bold text-[#404040]">
													{module.name}
												</span>
												<Badge
													className={cn(
														"rounded-[5px] border border-[rgba(145,158,171,0.20)] px-[5px] py-[5px] text-xs",
														module.status === "Completed"
															? "bg-[#CFF7D3] text-[#404040]"
															: module.status === "On Progress"
																? "bg-[#F4F7FE] text-[#404040]"
																: "bg-white text-[#404040]",
													)}
												>
													{module.status}
												</Badge>
												{module.overdue && (
													<Badge className="rounded-[5px] border border-[rgba(145,158,171,0.20)] bg-[#EC221F] px-[5px] py-[5px] text-xs text-white">
														{module.overdue} overdue
													</Badge>
												)}
											</div>
											<span className="font-roboto text-sm text-[#2B3674]">
												{module.progress}%
											</span>
										</div>
										<div className="flex flex-col gap-[5px]">
											<div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#A3AED0]">
												<div
													className="h-full bg-[#332687]"
													style={{ width: `${module.progress}%` }}
												/>
											</div>
											<div className="flex justify-between">
												<span className="font-inter text-xs text-[#6E7184]">
													PIC : {module.pic}
												</span>
												<span className="font-inter text-xs text-[#6E7184]">
													Deadline: {module.deadline}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</Card>
				</div>

				{/* Right Column */}
				<div className="flex w-[600px] flex-col gap-[30px]">
					{/* Team Assignment */}
					<Card className="rounded-[20px] p-10">
						<CardHeader className="p-0 pb-5">
							<CardTitle className="font-roboto text-[22px] font-medium leading-7">
								Team Assignment
							</CardTitle>
							<p className="font-public-sans text-sm text-[#919EAB]">
								Team members assigned to this project
							</p>
						</CardHeader>
						<CardContent className="flex flex-col gap-5 p-0">
							{projectData.team.map((member) => (
								<div key={member.name} className="flex items-center gap-2.5">
									<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#4F46E5]">
										<span className="font-dm text-xl font-normal leading-[30px] tracking-tight text-white">
											{member.initials}
										</span>
									</div>
									<div className="flex flex-1 flex-col gap-[5px]">
										<span className="font-inter text-sm font-medium text-[#404040]">
											{member.name}
										</span>
										<span className="font-roboto text-sm text-[#2B3674]">
											{member.role}
										</span>
									</div>
									{member.modules.map((module) => (
										<Badge
											key={module}
											className="rounded-[5px] border border-[rgba(145,158,171,0.20)] bg-[#F4F7FE] px-2.5 py-[5px] text-xs text-[#332687]"
										>
											{module}
										</Badge>
									))}
								</div>
							))}
						</CardContent>
					</Card>

					{/* Top Issues */}
					<Card className="rounded-[30px] p-[30px]">
						<div className="mb-2.5 flex items-start justify-between">
							<div className="flex flex-col">
								<h3 className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
									Top Issues
								</h3>
								<p className="font-roboto text-xs text-[#8C8C8C]">
									Beberapa hal yang memerlukan tindakan khusus
								</p>
							</div>
							<Button
								variant="outline"
								className="flex items-center gap-1 rounded-[5px] border border-[#CAC4D0]"
							>
								<Eye className="h-6 w-6" />
								<span className="font-roboto text-sm font-medium">
									View All Issues
								</span>
							</Button>
						</div>

						{/* First Issue with percentage */}
						<div className="my-2.5 flex items-center gap-2.5 pr-[15px]">
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FEE9E7]">
								<span className="font-dm text-2xl font-normal leading-[30px] tracking-tight text-[#BF6A02]">
									80%
								</span>
							</div>
							<div className="flex flex-1 flex-col gap-[5px]">
								<span className="font-inter text-sm font-medium text-[#404040]">
									{projectData.topIssues[0].title}
								</span>
								<span className="font-roboto text-xs text-[#2B3674]">
									{projectData.topIssues[0].description}
								</span>
							</div>
							<Badge
								className={cn(
									"rounded-[5px] border border-[rgba(145,158,171,0.20)] px-2.5 py-[5px] text-xs",
									projectData.topIssues[0].severity === "Medium"
										? "bg-[#FFE8A3] text-[#BF6A02]"
										: "",
								)}
							>
								{projectData.topIssues[0].severity}
							</Badge>
						</div>

						{/* Other Issues */}
						<div className="flex flex-col gap-0">
							{projectData.topIssues.slice(1).map((issue, index) => (
								<div
									key={index}
									className={cn(
										"flex items-center gap-2.5 rounded-lg border border-[rgba(145,158,171,0.20)] p-[10px_14px]",
										issue.severity === "Medium"
											? "bg-[#FFFBEB]"
											: issue.severity === "High"
												? "bg-[#FEE9E7]"
												: "bg-white",
									)}
								>
									<AlertTriangle className="h-[30px] w-[30px] text-[#900B09]" />
									<div className="flex flex-1 flex-col justify-center">
										<span className="font-roboto text-sm text-[#404040]">
											{issue.title}
										</span>
										<span className="font-roboto text-xs text-[#EC221F]">
											{issue.subtitle}
										</span>
									</div>
									<Badge
										className={cn(
											"rounded-[5px] border border-[rgba(145,158,171,0.20)] px-2.5 py-[5px] text-xs",
											issue.severity === "Medium"
												? "bg-[#FFE8A3] text-[#BF6A02]"
												: issue.severity === "High"
													? "bg-[#FDD3D0] text-[#BF6A02]"
													: "bg-white text-[#404040]",
										)}
									>
										{issue.severity}
									</Badge>
								</div>
							))}
						</div>
					</Card>

					{/* Compliance Document */}
					<Card className="rounded-[30px] p-[30px]">
						<div className="mb-2.5 flex items-start justify-between">
							<div className="flex flex-col">
								<h3 className="font-dm text-2xl font-bold leading-8 tracking-tight text-[#404040]">
									Compliance Dokumen Minimal
								</h3>
								<p className="font-roboto text-xs text-[#8C8C8C]">
									Status kelengkapan dokumen di dalam project
								</p>
							</div>
							<Button
								variant="outline"
								className="flex items-center gap-1 rounded-[5px] border border-[#CAC4D0]"
							>
								<Eye className="h-6 w-6" />
								<span className="font-roboto text-sm font-medium">
									View Bundle
								</span>
							</Button>
						</div>

						{/* Compliance percentage */}
						<div className="my-2.5 flex items-center gap-2.5 pr-[15px]">
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FEE9E7]">
								<span className="font-dm text-2xl font-normal leading-[30px] tracking-tight text-[#BF6A02]">
									80%
								</span>
							</div>
							<div className="flex flex-1 flex-col gap-[5px]">
								<span className="font-inter text-sm font-medium text-[#404040]">
									Dokumen Minimal Terpenuhi
								</span>
								<span className="font-roboto text-xs text-[#2B3674]">
									20/25 Dokumen lengkap
								</span>
							</div>
							<Badge className="rounded-[5px] border border-[rgba(145,158,171,0.20)] bg-[#FFE8A3] px-2.5 py-[5px] text-xs text-[#BF6A02]">
								Medium
							</Badge>
						</div>

						{/* Compliance Issues */}
						<div className="flex flex-col gap-0">
							{projectData.complianceIssues.slice(1).map((issue, index) => (
								<div
									key={index}
									className="flex items-center gap-2.5 rounded-lg border border-[rgba(145,158,171,0.20)] bg-[#FFFBEB] p-[10px_14px]"
								>
									<AlertTriangle className="h-[30px] w-[30px] text-[#900B09]" />
									<div className="flex flex-1 flex-col justify-center gap-[5px]">
										<span className="font-roboto text-sm text-[#404040]">
											{issue.title}
										</span>
										<div className="flex items-center gap-2.5">
											<Badge className="rounded-[5px] border border-[rgba(145,158,171,0.20)] bg-[#FFE8A3] px-2.5 py-[5px] text-xs text-[#BF6A02]">
												{issue.module}
											</Badge>
											<span className="font-roboto text-xs text-[#EC221F]">
												{issue.assignee}
											</span>
										</div>
									</div>
									<div className="flex flex-col items-end gap-2.5">
										<Badge
											className={cn(
												"rounded-[5px] border border-[rgba(145,158,171,0.20)] px-2.5 py-[5px] text-xs",
												issue.severity === "Medium"
													? "bg-[#FFE8A3] text-[#BF6A02]"
													: "bg-[#FDD3D0] text-[#BF6A02]",
											)}
										>
											{issue.severity}
										</Badge>
										<span className="font-roboto text-xs text-[#EC221F]">
											{issue.deadline}
										</span>
									</div>
								</div>
							))}
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
