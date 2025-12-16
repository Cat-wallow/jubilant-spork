"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Dummy data for projectData (will need to be made dynamic later)
const projectData = {
	id: "1",
	name: "Konsultasi Pajak PT Maju Bersama",
	code: "PRJ-2025-02-001",
	client: "PT Maju Mundur Bersama",
	startDate: "2024-02-20",
	deadline: "2024-02-22",
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
	modules: [],
	team: [],
	topIssues: [],
	complianceIssues: [],
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

export default function CommonProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const params = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const projectId = params.projectId as string;

	const currentTab = pathname?.split("/").pop() || "summary";

	const handleTabClick = (tabPath: string) => {
		router.push(`/tenant/projects/${projectId}/${tabPath}`);
	};

	return (
		<div className="flex w-full flex-col gap-4">
			{/* Header */}
			<div className="flex items-center justify-center gap-2.5">
				<div className="flex flex-1 flex-col gap-[5px]">
					<p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">
						{projectData.breadcrumb}
					</p>
					<h1 className="font-dm text-[34px] mt-2 ml-2 font-bold leading-[42px]  ">
						{projectData.name}
					</h1>
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

			{children}
		</div>
	);
}
