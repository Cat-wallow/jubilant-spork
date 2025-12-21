"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
	{ label: "Form 1771", path: "1771" },
	{ label: "1771-I", path: "1771-i" },
	{ label: "1771-II", path: "1771-ii" },
	{ label: "1771-III", path: "1771-iii" },
	{ label: "1771-IV", path: "1771-iv" },
	{ label: "1771-V", path: "1771-v" },
];

export default function TaxCountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const params = useParams();
	const pathname = usePathname();
	const projectId = params.projectId as string;

	return (
				<div className="flex flex-col gap-[30px]  ">
					{/* Tabs */}
					<div className="flex h-[42px] items-center gap-5 rounded-[5px] bg-card px-2 py-1">
						{tabs.map((tab) => {
							const href = `/tenant/projects/${projectId}/kk3/tax-count/pph/${tab.path}`;
							// const isActive = pathname.includes(`/pph/${tab.path}`);
							const isActive = pathname.split("/pph/")[1] === tab.path;

							return (
								<Link
									key={tab.path}
									href={href}
									className={cn(
										"flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[5px] px-[15px] py-[3px] text-sm font-semibold leading-[22px] transition-colors",
										isActive ? "bg-muted " : "bg-card",
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
