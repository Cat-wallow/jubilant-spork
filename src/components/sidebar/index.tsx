"use client";

import { HiX, HiMenuAlt3 } from "react-icons/hi";
import Links from "./components/Links";
import { IRoute } from "@/types/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import TenantSwitcher from "./components/TenantSwitcher";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
	const { routes, open, setOpen } = props;
	const { user } = useAuth();
	const [isCollapsed, setIsCollapsed] = useState(false);
	const pathname = usePathname();

	// Check if we are in project detail route
	const isProjectDetail =
		pathname?.includes("/tenant/projects/") && pathname.split("/").length > 4;

	useEffect(() => {
		if (isProjectDetail) {
			setIsCollapsed(true);
		}
	}, [isProjectDetail]);

	const getUserInitials = (name: string) => {
		if (!name) return "U";
		const names = name.split(" ");
		if (names.length >= 2) {
			return (names[0][0] + names[1][0]).toUpperCase();
		}
		return name.substring(0, 2).toUpperCase();
	};

	return (
		<div
			className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
				open ? "translate-x-0" : "-translate-x-96 xl:translate-x-0"
			} ${isCollapsed ? "w-[80px]" : "w-[290px]"}`}
		>
			<span
				className="absolute right-4 top-4 block cursor-pointer xl:hidden"
				onClick={() => setOpen(false)}
			>
				<HiX />
			</span>

			{/* Toggle Button for Desktop */}
			{isProjectDetail ? null : (
				<span
					className="absolute -right-3 top-8 hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 xl:flex text-gray-600 border border-gray-200 z-[60]"
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					<HiMenuAlt3
						className={`h-4 w-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
					/>
				</span>
			)}

			<div
				className={`flex flex-col gap-5 pt-5 ${isCollapsed ? "items-center px-2" : "px-5"}`}
			>
				{!isCollapsed && (
					<div className="flex flex-col">
						<Image
							src="https://api.builder.io/api/v1/image/assets/TEMP/00a49d181b0bb66e62377f3e7fba55a2f3929db2?width=240"
							alt="EasyTax Logo"
							width={120}
							height={29}
							className="h-[29px] w-[120px]"
						/>
						<p className="font-dm text-xs font-normal leading-[150%] tracking-[-0.24px] text-brand-900 dark:text-white">
							Tax Consultancy
						</p>
					</div>
				)}

				<div
					className={`flex items-center ${isCollapsed ? "justify-center" : "gap-[13px]"}`}
				>
					<div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-brand-500 dark:bg-brand-400">
						<span className="text-xl font-semibold leading-[30px] tracking-[-0.48px] text-white">
							{user ? getUserInitials(user.name) : "EX"}
						</span>
					</div>
					{!isCollapsed && (
						<div className="flex flex-col gap-1">
							<p className="font-dm text-xs font-bold leading-[24px] tracking-[-0.24px] text-gray-700 dark:text-gray-200">
								{user?.name || "John Doe"}
							</p>
							<TenantSwitcher />
						</div>
					)}
				</div>

				<div
					className={`h-[2px] bg-gray-300 dark:bg-white/30 ${isCollapsed ? "w-full" : "w-[250px]"}`}
				/>
			</div>

			<ul
				className={`mb-auto flex flex-col gap-5 pt-[50px] ${isCollapsed ? "px-2 items-center" : "px-5"}`}
			>
				<Links routes={routes} isCollapsed={isCollapsed} />
			</ul>
		</div>
	);
}

export default SidebarHorizon;
