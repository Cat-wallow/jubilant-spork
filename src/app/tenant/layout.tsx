"use client";
// Layout components
import { usePathname, useParams } from "next/navigation";
import { useState, ReactNode } from "react";
import routes from "@/components/sidebar/routes";
import {
	getActiveNavbar,
	getActiveRoute,
	isWindowAvailable,
} from "@/utils/navigation";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer/Footer";
import RBAC from "@/components/rbac/RBAC";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet } from "lucide-react";

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

export default function Admin({ children }: { children: ReactNode }) {
	// states and functions
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const params = useParams();
	const projectId = params?.id as string;

	if (isWindowAvailable()) document.documentElement.dir = "ltr";

	// Check if we are in a project detail route
	const isProjectDetail =
		pathname?.includes(`/tenant/projects/${projectId}`) && !!projectId;

	return (
		<RBAC redirect>
			<div className="bg-background-100 dark:bg-background-900 flex h-full w-full">
				<Sidebar
					routes={routes}
					open={open}
					setOpen={setOpen}
					variant="admin"
				/>

				{/* Project Specific Sidebar - Rendered only in project detail context */}
				{isProjectDetail && (
					<div className="fixed left-[80px] items-start hidden md:flex top-0 z-40  h-full w-[290px] flex-col gap-[26px]  pb-10 shadow-md transition-all duration-175 bg-card">
						{/* Project Info */}
						<div className="flex flex-col justify-start items-center  px-5 ">
							<div className="flex h-24   flex-col justify-center">
								<h3 className="font-dm text-sm font-bold leading-6 tracking-tight text-primary">
									Konsultasi Pajak PT Maju Bersama
								</h3>
								<p className="text-sm font-normal leading-[140%] text-primary">
									PRJ-25-MS.001
								</p>
							</div>
							<div
								className={`h-[2px] bg-gray-300 dark:bg-white/30 w-[250px]`}
							/>
						</div>

						{/* Module Links */}
						<div className="flex flex-col  gap-5 px-5">
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
												? "text-primary font-bold "
												: "text-[#A3AED0] hover:text-primary dark:text-gray-400 dark:hover:text-white",
										)}
									>
										<Icon className="h-5 w-5" />
										<span className="font-semibold text-base leading-[30px] tracking-tight">
											{module.name}
										</span>
									</Link>
								);
							})}
						</div>
					</div>
				)}

				{/* Navbar & Main Content */}
				<div className="h-full w-full font-dm dark:bg-navy-900">
					{/* Main Content */}
					<main
						className={`mx-2.5 flex-none transition-all dark:bg-navy-900 md:pr-2 ${
							isProjectDetail ? "xl:ml-[380px]" : "xl:ml-[323px]"
						}`}
					>
						{/* Routes */}
						<div>
							<Navbar
								onOpenSidenav={() => setOpen(!open)}
								brandText={getActiveRoute(routes, pathname)}
								secondary={getActiveNavbar(routes, pathname)}
							/>
							<div className="mx-auto min-h-screen p-2 !pt-[4px] md:p-2">
								{children}
							</div>
							<div className="p-3">
								<Footer />
							</div>
						</div>
					</main>
				</div>
			</div>
		</RBAC>
	);
}
