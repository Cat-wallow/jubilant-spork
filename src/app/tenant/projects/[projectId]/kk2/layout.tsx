"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
	{ label: "Dashboard", path: "dashboard" },
	{ label: "Voucher List", path: "voucher" },
	{ label: "Journal", path: "journal" },
	{ label: "Reports", path: "reports" },
];

export default function KK2Layout({ children }: { children: React.ReactNode }) {
	const params = useParams();
	const pathname = usePathname();
	const projectId = params.projectId as string;

	return (
		<div className="flex flex-col gap-[30px]  px-2 ">
			<div className="flex flex-col gap-[5px]">
				<h1 className="text-[34px] font-bold leading-[42px] tracking-[-0.68px] ">
					Kelola KK 2.0 (Manajemen Akuntansi)
				</h1>
			</div>

			<div className="flex bg-card p-1 ">
				{tabs.map((tab) => {
					const href = `/tenant/projects/${projectId}/kk2/${tab.path}`;
					const isActive = pathname.includes(tab.path);

					return (
						<Link
							key={tab.path}
							href={href}
							className={cn(
								"flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[5px] px-4 py-2 text-sm font-semibold leading-[22px] transition-colors",
								isActive ? "bg-muted " : "",
							)}
						>
							{tab.label}
						</Link>
					);
				})}
			</div>

			{children}
		</div>
	);
}
