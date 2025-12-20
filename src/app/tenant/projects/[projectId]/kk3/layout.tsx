"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
	{ label: "Overview", path: "overview" },
	{ label: "Mapping (COA-Tax)", path: "mapping" },
	{ label: "Perhitungan Pajak", path: "tax-count" },
	{ label: "SPT Management", path: "spt-management" },
	{ label: "Audit & Log", path: "audit-log" },
	{ label: "Reports", path: "reports" },
];

export default function KK3Layout({ children }: { children: React.ReactNode }) {
	const params = useParams();
	const pathname = usePathname();
	const projectId = params.projectId as string;

	return (
		<>
			{pathname.includes("/p2pph/") ? (
				children
			) : (
				<div className="flex flex-col gap-[30px] py-6 px-2 ">
					<div className="flex flex-col gap-[5px]">
						<div className="flex flex-col">
							<h1 className="text-[34px] font-bold leading-[42px] tracking-[-0.68px] ">
								Kelola KK 3.0 (Manajemen Perpajakan)
							</h1>
							<p className="text-sm leading-6 tracking-[-0.28px] ">
								Analisa Pemenuhan Kewajiban Perpajakan
							</p>
						</div>
					</div>

					<div className="flex h-[42px] items-center gap-5 rounded-[5px] bg-card p-1">
						{tabs.map((tab) => {
							const href = `/tenant/projects/${projectId}/kk3/${tab.path}`;
							const isActive = pathname.includes(`/kk3/${tab.path}`);

							return (
								<Link
									key={tab.path}
									href={href}
									className={cn(
										"flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[5px] px-[15px] py-[3px] text-sm font-semibold leading-[22px] transition-colors",
										isActive ? "bg-muted " : "bg-card  ",
									)}
								>
									{tab.label}
								</Link>
							);
						})}
					</div>

					{children}
				</div>
			)}
		</>
	);
}
