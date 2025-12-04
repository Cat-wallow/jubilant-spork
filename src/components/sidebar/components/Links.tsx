"use client";

import React, { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "@/components/link/NavLink";
import DashIcon from "@/components/icons/DashIcon";
import RBAC from "@/components/rbac/RBAC";

interface SubMenuItem {
	name: string;
	path: string;
}

const subMenuItems: SubMenuItem[] = [
	{ name: "Semua form 1.0 (DMS)", path: "form-1" },
	{ name: "Semua KK 1.0", path: "kk-1" },
	{ name: "Semua KK 2.0", path: "kk-2" },
	{ name: "Semua KK 3.0", path: "kk-3" },
	{ name: "Semua KK 4.0", path: "kk-4" },
	{ name: "Semua KK 5.0", path: "kk-5" },
];

export const SidebarLinks = (props: { routes: RoutesType[]; isCollapsed?: boolean }): JSX.Element => {
	const pathname = usePathname();
	const { routes, isCollapsed } = props;
	const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
		{},
	);

	const activeRoute = useCallback(
		(routeName: string) => {
			return pathname?.includes(routeName);
		},
		[pathname],
	);

	const toggleMenu = (routePath: string) => {
		if (isCollapsed) return; // Disable toggle when collapsed
		setExpandedMenus((prev) => ({
			...prev,
			[routePath]: !prev[routePath],
		}));
	};

	// Komponen untuk menu item individual
	const MenuItemContent = ({
		route,
		isActive,
		isExpanded,
		hasCollapse,
	}: {
		route: RoutesType;
		isActive: boolean;
		isExpanded: boolean;
		hasCollapse: boolean;
	}) => (
		<div className={`group relative flex w-full items-center ${isCollapsed ? "justify-center" : "gap-[73px]"} hover:cursor-pointer`}>
			<div className={`flex flex-1 items-center ${isCollapsed ? "justify-center" : "gap-[15px]"}`}>
				<span
					className={`flex h-6 w-6 items-center justify-center ${
						isActive || isExpanded
							? "text-brand-500 dark:text-white"
							: "text-gray-600 group-hover:text-brand-500 dark:text-gray-400 dark:group-hover:text-white"
					}`}
				>
					{route.icon ? route.icon : <DashIcon />}
				</span>
				{!isCollapsed && (
					<p
						className={`text-nowrap font-dm text-base leading-[30px] tracking-[-0.32px] ${
							isActive || isExpanded
								? "font-bold text-brand-500 dark:text-white"
								: "font-normal text-gray-600 group-hover:text-brand-500 dark:text-gray-400 dark:group-hover:text-white"
						}`}
					>
						{route.name}
					</p>
				)}
			</div>

			{!isCollapsed && isActive && !isExpanded && (
				<div className="h-9 w-1 flex-shrink-0 rounded-[25px] bg-brand-500 dark:bg-brand-400" />
			)}

			{!isCollapsed && hasCollapse && (
				<svg
					className={`h-6 w-3 flex-shrink-0 transition-transform ${
						isExpanded ? "rotate-180" : ""
					} ${
						isActive || isExpanded
							? "text-brand-500 dark:text-white"
							: "text-gray-600 dark:text-gray-400"
					}`}
					viewBox="0 0 24 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M11.2889 10.1569L5.63186 4.49994L7.04586 3.08594L11.9959 8.03594L16.9459 3.08594L18.3599 4.49994L12.7029 10.1569C12.5153 10.3444 12.261 10.4497 11.9959 10.4497C11.7307 10.4497 11.4764 10.3444 11.2889 10.1569Z"
						fill="currentColor"
					/>
				</svg>
			)}
		</div>
	);

	const createLinks = (routes: RoutesType[]) => {
		return routes.map((route, index) => {
			const isActive = activeRoute(route.path);
			const isExpanded = expandedMenus[route.path];
			const hasCollapse = route.collapsible;

			if (
				route.layout === "/admin" ||
				route.layout === "/auth" ||
				route.layout === "/rtl" ||
				route.layout === "/tenant"
			) {
				// Komponen untuk render menu dengan atau tanpa RBAC
				const renderMenuItem = () => {
					if (hasCollapse) {
						// Menu dengan collapse
						return (
							<div key={index}>
								<div
									onClick={() => toggleMenu(route.path)}
									className="cursor-pointer"
								>
									<MenuItemContent
										route={route}
										isActive={isActive}
										isExpanded={isExpanded}
										hasCollapse={hasCollapse}
									/>
								</div>

								{isExpanded && !isCollapsed && (
									<div className="ml-[20px] mt-2 flex w-[247px] flex-col">
										{subMenuItems.map((item, subIndex) => (
											<NavLink
												key={subIndex}
												href={route.layout + "/" + item.path}
											>
												<div className="flex items-center gap-[15px] px-[10px] py-[3px] hover:bg-gray-50 dark:hover:bg-navy-700">
													<svg
														className="h-6 w-6"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<circle
															cx="2"
															cy="2"
															r="2"
															transform="matrix(1 0 0 -1 10 14)"
															fill="#637381"
														/>
													</svg>
													<p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-sans text-sm font-medium leading-[22px] text-gray-600 dark:text-gray-400">
														{item.name}
													</p>
												</div>
											</NavLink>
										))}
									</div>
								)}
							</div>
						);
					} else {
						// Menu tanpa collapse
						return (
							<NavLink key={index} href={route.layout + "/" + route.path}>
								<MenuItemContent
									route={route}
									isActive={isActive}
									isExpanded={isExpanded}
									hasCollapse={hasCollapse}
								/>
							</NavLink>
						);
					}
				};

				// Jika ada permission, wrap dengan RBAC
				if (route.permission) {
					return (
						<RBAC requiredPermission={route.permission} key={index}>
							{renderMenuItem()}
						</RBAC>
					);
				}

				// Jika tidak ada permission, render langsung
				return renderMenuItem();
			}
		});
	};

	return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
