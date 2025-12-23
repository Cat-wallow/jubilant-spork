"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface P2PPhDetailLayoutProps {
	children: React.ReactNode;
	params: {
		projectId: string;
		id: string;
	};
}

const tabs = [
	{ label: "Overview", path: "overview" },
	{ label: "Perhitungan Pajak", path: "calculation" },
	{ label: "Pemotongan Pajak", path: "tax-cuts" },
];

export default function P2PPhDetailLayout({
	children,
	params,
}: P2PPhDetailLayoutProps) {
	const pathname = usePathname();
	const baseUrl = `/tenant/projects/${params.projectId}/kk3/tax-count/p2pph/${params.id}`;

	const isTabActive = (tabPath: string) => {
		return pathname.includes(`/${tabPath}`);
	};

	return (
		<div className="flex w-full flex-col gap-[30px] px-2">
			{/* Header */}
			<div className="flex flex-col gap-[5px]">
				<h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] ">
					Dashboard P2PPh - Perhitungan & Pemotongan PPh
				</h1>
			</div>

			{/* Tabs */}
			<div className="flex h-[42px] items-center gap-5 self-stretch rounded-[5px] bg-card p-[5px]">
				{tabs.map((tab) => (
					<Link
						key={tab.path}
						href={`${baseUrl}/${tab.path}`}
						className={cn(
							"flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[5px] ",
							isTabActive(tab.path) ? "bg-muted" : "bg-card",
						)}
					>
						<span className=" text-sm font-semibold leading-[22px] ">
							{tab.label}
						</span>
					</Link>
				))}
			</div>

			{/* Page Content */}
			{children}
		</div>
	);
}
