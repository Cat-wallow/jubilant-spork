"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PPNDetailLayoutProps {
	children: React.ReactNode;
	params: {
		projectId: string;
		id: string;
	};
}

const tabs = [
	{ label: "Overview", path: "overview" },
	{ label: "Perhitungan", path: "calculation" },
	{ label: "List Transaksi", path: "transactions" },
	{ label: "Jurnal Transaksi", path: "journal" },
];

export default function PPNDetailLayout({
	children,
	params,
}: PPNDetailLayoutProps) {
	const pathname = usePathname();
	const baseUrl = `/tenant/projects/${params.projectId}/kk3/tax-count/ppn/${params.id}`;

	const isTabActive = (tabPath: string) => {
		return pathname.endsWith(`/${tabPath}`);
	};

	return (
		<div className="flex w-full flex-col gap-[30px] px-[30px]">
			{/* Header */}
			<div className="flex flex-col gap-[5px]">
				<p className="font-dm text-sm font-medium leading-6 text-muted-foreground">
					KK 3.0 &gt; Perhitungan Pajak
				</p>
				<h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] ">
					Detail PPN {params.id}
				</h1>
			</div>

			{/* Tabs */}
			<div className="flex h-[42px] items-center gap-5 self-stretch rounded-[5px] bg-background p-[5px]">
				{tabs.map((tab) => (
					<Link
						key={tab.path}
						href={`${baseUrl}/${tab.path}`}
						className={cn(
							"flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[5px] px-[15px] py-[3px]",
							isTabActive(tab.path) ? "bg-card" : "bg-transparent",
						)}
					>
						<span className=" text-sm font-semibold leading-[22px] text-muted-foreground">
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
