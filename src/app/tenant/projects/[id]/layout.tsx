"use client";

import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Home,
	FolderKanban,
	FileText,
	Sheet,
} from "lucide-react";

const projectModules = [
	{
		name: "Form 1.0",
		path: "form1",
		icon: Sheet,
	},
	{
		name: "KK 1.0",
		path: "kk1",
		icon: Sheet,
	},
	{
		name: "KK 2.0",
		path: "kk2",
		icon: Sheet,
	},
	{
		name: "KK 3.0",
		path: "kk3",
		icon: Sheet,
	},
	{
		name: "KK 4.0",
		path: "kk4",
		icon: Sheet,
	},
	{
		name: "KK 5.0",
		path: "kk5",
		icon: Sheet,
	},
];

export default function ProjectDetailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const params = useParams();
	const projectId = params.id as string;

	return (
		<div className="flex h-full gap-0">
			{/* Project-specific sidebar */}
			<div className="flex w-[290px] flex-col gap-[26px] bg-white pb-10 shadow-md">
				{/* Project Info */}
				<div className="flex flex-col justify-center px-5">
					<div className="flex h-[88px] flex-col justify-center">
						<h3 className="font-dm text-sm font-bold leading-6 tracking-tight text-[#2B3674]">
							Konsultasi Pajak PT Maju Bersama
						</h3>
						<p className="text-sm font-normal leading-[140%] text-[#2B3674]">
							PRJ-25-MS.001
						</p>
					</div>
					<div className="h-[2px] w-[250px] bg-[#D9D9D9]" />
				</div>

				{/* Module Links */}
				<div className="flex flex-col gap-5 px-5">
					{projectModules.map((module) => {
						const href = `/tenant/projects/${projectId}/${module.path}`;
						const isActive = pathname === href;
						const Icon = module.icon;

						return (
							<Link
								key={module.path}
								href={href}
								className={cn(
									"flex items-center gap-[15px] transition-colors",
									isActive
										? "text-[#332687] font-bold"
										: "text-[#A3AED0] hover:text-[#332687]"
								)}
							>
								<Icon className="h-6 w-6" />
								<span className="font-dm text-base font-bold leading-[30px] tracking-tight">
									{module.name}
								</span>
							</Link>
						);
					})}
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 overflow-auto">
				{children}
			</div>
		</div>
	);
}
