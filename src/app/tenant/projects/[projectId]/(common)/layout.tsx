"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const projectData = {
	name: "Konsultasi Pajak PT Maju Bersama",
};

const projectTabs = [
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
	const { projectId } = useParams<{ projectId: string }>();
	const router = useRouter();
	const pathname = usePathname();

	const currentTab = pathname.split("/").pop() ?? "summary";

	return (
		<div className="flex w-full flex-col gap-6 justify-center px-2">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h1 className="font-dm text-[34px] font-bold">{projectData.name}</h1>
			</div>

			<Tabs
				value={currentTab}
				onValueChange={(value) => {
					router.push(`/tenant/projects/${projectId}/${value}`);
				}}
				className="w-full"
			>
				<TabsList className="grid grid-cols-12 w-full bg-card">
					{projectTabs.map((tab) => (
						<TabsTrigger key={tab.path} value={tab.path}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			{/* PAGE CONTENT */}
			{children}
		</div>
	);
}
