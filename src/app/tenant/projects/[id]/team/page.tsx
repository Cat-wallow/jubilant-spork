"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

export default function TeamPage() {
	const params = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const projectId = params.id as string;

	const currentTab = pathname?.split("/").pop() || "summary";

	const handleTabClick = (tabPath: string) => {
		router.push(`/tenant/projects/${projectId}/${tabPath}`);
	};

	return (
		<div className="flex w-full flex-col gap-[30px] bg-[#F4F7FE] p-[30px]">
			{/* Header */}
			<div className="flex items-center justify-center gap-2.5">
				<div className="flex flex-1 flex-col gap-[5px]">
					<p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">
						Project &gt; Add Project
					</p>
					<h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-tight text-[#0B1437]">
						Konsultasi Pajak PT Maju Bersama
					</h1>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium text-[#404040]">Publish</span>
					<div className="relative h-6 w-11 rounded-[50px] bg-[#E2E8F0]">
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

			{/* Content */}
			<Card className="flex min-h-[400px] items-center justify-center rounded-[20px] p-10">
				<div className="text-center">
					<h2 className="mb-2 text-2xl font-bold text-primary">Team Page</h2>
					<p className="text-muted-foreground">
						Content for team page will be displayed here
					</p>
				</div>
			</Card>
		</div>
	);
}
