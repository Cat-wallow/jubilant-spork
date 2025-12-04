import React from "react";
import Dropdown from "@/components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import NavLink from "@/components/link/NavLink";
import navbarimage from "/public/img/layout/Navbar.png";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
	IoMdNotificationsOutline,
	IoMdInformationCircleOutline,
} from "react-icons/io";
import avatar from "/public/img/avatars/avatar4.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// import { logout } from '@/services/auth.service';
import { useAuth } from "@/contexts/AuthContext";
import { clearTokens } from "@/lib/tokenManager";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = (props: {
	onOpenSidenav: () => void;
	brandText: string;
	secondary?: boolean | string;
	[x: string]: any;
}) => {
	const { onOpenSidenav, brandText, mini, hovered } = props;
	const [darkmode, setDarkmode] = React.useState(
		document.body.classList.contains("dark"),
	);
	const router = useRouter();
	const { tenant, user, logout } = useAuth();

	const handleLogout = async () => {
		try {
			logout();
		} catch (error) {
			console.error("Logout failed:", error);
		} finally {
			router.push("/auth/sign-in");
			clearTokens;
		}
	};

	const getUserInitials = (name: string) => {
		if (!name) return "U";
		const names = name.split(" ");
		if (names.length >= 2) {
			return (names[0][0] + names[1][0]).toUpperCase();
		}
		return name.substring(0, 2).toUpperCase();
	};

	const formatBreadcrumb = (segment: string) => {
		if (!segment) return "";

		return segment
			.replace(/-/g, " ") // ganti dash jadi spasi
			.replace(/\b\w/g, (c) => c.toUpperCase()); // capitalized words
	};

	const pathname = usePathname();

	// path: /dashboard/users/list → ["dashboard", "users", "list"]
	const paths = pathname.split("/").filter(Boolean);

	const buildHref = (index: number) =>
		"/" + paths.slice(0, index + 1).join("/");

	return (
		<>
			<nav className="sticky top-2 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl">
				<div className="relative mt-[3px] flex h-[61px] w-full flex-grow items-center justify-between gap-2 rounded-full bg-white px-8 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-full md:flex-grow-0 md:gap-1 xl:w-full xl:gap-4">
					<div className="hidden sm:flex">
						<p className="text-nowrap text-center text-[23px] font-extrabold uppercase text-navy-700 hover:text-navy-700 dark:text-white dark:hover:text-white">
							{tenant ? tenant.name : ""}
						</p>
					</div>
					<div className="flex h-full w-96 flex-row items-center justify-between gap-6 sm:justify-end">
						<div className="none mr-2 hidden h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white md:flex">
							<p className="pl-3 pr-2 text-xl">
								<FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
							</p>
							<input
								type="text"
								placeholder="Search..."
								className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
							/>
						</div>
						<span
							className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
							onClick={onOpenSidenav}
						>
							<FiAlignJustify className="h-5 w-5" />
						</span>
						{/* start Notification */}
						<div className="flex items-center justify-center gap-6">
							<Dropdown
								button={
									<p className="cursor-pointer">
										<IoMdNotificationsOutline className="h-6 w-6 text-gray-600 dark:text-white" />
									</p>
								}
								animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
								classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
							>
								<div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
									<div className="flex items-center justify-between">
										<p className="text-base font-bold text-navy-700 dark:text-white">
											Notification
										</p>
										<p className="text-sm font-bold text-navy-700 dark:text-white">
											Mark all read
										</p>
									</div>

									<button className="flex w-full items-center">
										<div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
											<BsArrowBarUp />
										</div>
										<div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
											<p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
												New Update: Horizon UI Dashboard PRO
											</p>
											<p className="font-base text-left text-xs text-gray-900 dark:text-white">
												A new update for your downloaded item is available!
											</p>
										</div>
									</button>

									<button className="flex w-full items-center">
										<div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
											<BsArrowBarUp />
										</div>
										<div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
											<p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
												New Update: Horizon UI Dashboard PRO
											</p>
											<p className="font-base text-left text-xs text-gray-900 dark:text-white">
												A new update for your downloaded item is available!
											</p>
										</div>
									</button>
								</div>
							</Dropdown>
							<div
								className="cursor-pointer text-gray-600"
								onClick={() => {
									if (darkmode) {
										document.body.classList.remove("dark");
										setDarkmode(false);
									} else {
										document.body.classList.add("dark");
										setDarkmode(true);
									}
								}}
							>
								{darkmode ? (
									<RiSunFill className="h-6 w-6 text-gray-600 dark:text-white" />
								) : (
									<RiMoonFill className="h-6 w-6 text-gray-600 dark:text-white" />
								)}
							</div>
							{/*// Profile & Dropdown */}
							<Dropdown
								button={
									user.avatar ? (
										<Image
											width="20"
											height="20"
											className="size-10 min-h-10 min-w-10 rounded-full bg-red-500"
											src={user.avatar}
											alt="Profile picture"
										/>
									) : (
										<div className="flex size-10 min-h-10 min-w-10 items-center justify-center rounded-full bg-brand-500 font-bold dark:bg-brand-400">
											<span className="cursor-pointer text-lg font-semibold leading-[30px] tracking-[-0.48px] text-white">
												{user ? getUserInitials(user.name) : "EX"}
											</span>
										</div>
									)
								}
								classNames={"py-2 top-8 -left-[180px] w-max"}
							>
								<div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
									<div className="ml-4 mt-3">
										<div className="flex items-center gap-2">
											<p className="text-sm font-bold text-navy-700 dark:text-white">
												{user?.name}
											</p>{" "}
										</div>
									</div>
									<div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20" />

									<div className="ml-4 mt-3 flex flex-col">
										<a
											href=" "
											className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
										>
											Profile Settings
										</a>
										<a
											href=" "
											className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
										>
											Newsletter Settings
										</a>
										<button
											onClick={handleLogout}
											className="mt-3 text-left text-sm font-medium text-red-500 hover:text-red-500"
										>
											Log Out
										</button>
									</div>
								</div>
							</Dropdown>
						</div>
					</div>
				</div>
			</nav>
			<Breadcrumb className="ml-2 mt-3.5 text-sm font-medium text-muted-foreground">
				<BreadcrumbList>
					{paths.map((seg, index) => (
						<React.Fragment key={seg}>
							{/* Hanya tampilkan separator jika bukan item pertama */}
							{index > 0 && <BreadcrumbSeparator />}

							<BreadcrumbItem>
								{index === paths.length - 1 ? (
									<BreadcrumbPage className="font-medium">
										{formatBreadcrumb(seg)}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink asChild>
										<Link href={buildHref(index)}>{formatBreadcrumb(seg)}</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</>
	);
};

export default Navbar;
