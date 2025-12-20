"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Search,
	Filter,
	MoreHorizontal,
	ChevronLeft,
	ChevronRight,
	Plus,
	Edit2,
	Trash2,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mappingData = [
	{
		id: "1101",
		accountNo: "1101",
		accountName: "Kas",
		type: "Asset",
		normalSide: "Debit",
		taxMapping: ["No Tax"],
		status: "Active",
	},
	{
		id: "1102",
		accountNo: "1102",
		accountName: "Bank",
		type: "Asset",
		normalSide: "Debit",
		taxMapping: ["No Tax"],
		status: "Active",
	},
	{
		id: "1201",
		accountNo: "1201",
		accountName: "Piutang Dagang",
		type: "Asset",
		normalSide: "Debit",
		taxMapping: ["No Tax"],
		status: "Active",
	},
	{
		id: "1301",
		accountNo: "1301",
		accountName: "Piutang PPh 22",
		type: "Asset",
		normalSide: "Debit",
		taxMapping: ["PPh"],
		status: "Active",
	},
	{
		id: "1302",
		accountNo: "1302",
		accountName: "Piutang PPh 23",
		type: "Asset",
		normalSide: "Debit",
		taxMapping: ["PPh"],
		status: "Active",
	},
	{
		id: "2101",
		accountNo: "2101",
		accountName: "Hutang PPN",
		type: "Liability",
		normalSide: "Credit",
		taxMapping: ["PPN"],
		status: "Active",
	},
	{
		id: "2201",
		accountNo: "2201",
		accountName: "Uang Muka Penjualan",
		type: "Liability",
		normalSide: "Credit",
		taxMapping: ["No Tax"],
		status: "Active",
	},
	{
		id: "4101",
		accountNo: "4101",
		accountName: "Penjualan",
		type: "Revenue",
		normalSide: "Credit",
		taxMapping: ["PPN", "PPh"],
		status: "Active",
	},
	{
		id: "4102",
		accountNo: "4102",
		accountName: "Penjualan Service",
		type: "Revenue",
		normalSide: "Credit",
		taxMapping: ["PPN", "PPh"],
		status: "Active",
	},
	{
		id: "4103",
		accountNo: "4103",
		accountName: "Penjualan Sparepart",
		type: "Revenue",
		normalSide: "Credit",
		taxMapping: ["PPN", "PPh"],
		status: "Active",
	},
	{
		id: "2301",
		accountNo: "2301",
		accountName: "Hutang Accrual",
		type: "Liability",
		normalSide: "Credit",
		taxMapping: ["No Tax"],
		status: "Active",
	},
	{
		id: "5101",
		accountNo: "5101",
		accountName: "Beban Operasional",
		type: "Expense",
		normalSide: "Debit",
		taxMapping: ["No Tax"],
		status: "Active",
	},
	{
		id: "3101",
		accountNo: "3101",
		accountName: "Modal Disetor",
		type: "Equity",
		normalSide: "Credit",
		taxMapping: ["No Tax"],
		status: "Active",
	},
	{
		id: "3201",
		accountNo: "3201",
		accountName: "Laba Ditahan",
		type: "Equity",
		normalSide: "Credit",
		taxMapping: ["No Tax"],
		status: "Active",
	},
];

export function CoAMappingTable() {
	return (
		<div className="flex flex-col gap-[30px] rounded-[14px] bg-card pb-8">
			{/* Header & Toolbar */}
			<div className="flex flex-col gap-5 p-[30px] pb-0">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						{/* Title placeholder if needed, though design shows it in the tab content area roughly */}
						<div className="flex flex-col items-start">
							<h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-primary">
								Charts of Accounts & Tax Mapping
							</h2>
						</div>
					</div>
					<Button className="gap-2 text-base font-medium text-white ">
						<Plus className="h-4 w-4" />
						New Account
					</Button>
				</div>

				{/* Filters */}
				<div className="flex items-center gap-5 self-stretch rounded-[10px]  p-2.5">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="h-[54px] gap-1 rounded-[10px]  bg-card px-[5px] py-0"
							>
								<span className="px-1.5 py-1.5  text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
									20
								</span>
								<svg width="12" height="24" viewBox="0 0 24 12" fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M11.2884 10.1569L5.63137 4.49994L7.04537 3.08594L11.9954 8.03594L16.9454 3.08594L18.3594 4.49994L12.7024 10.1569C12.5148 10.3444 12.2605 10.4497 11.9954 10.4497C11.7302 10.4497 11.4759 10.3444 11.2884 10.1569Z"
										fill="#332687"
									/>
								</svg>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>10</DropdownMenuItem>
							<DropdownMenuItem>20</DropdownMenuItem>
							<DropdownMenuItem>50</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<div className="flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border  bg-card px-5">
						<Search className="h-5 w-5 text-primary" />
						<Input
							placeholder="Cari dokumen"
							className="h-auto border-0 p-0 font-dm text-base leading-5 tracking-[-0.32px] text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>

					<div className="flex items-center gap-2.5">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="h-[54px] gap-1 rounded-[10px]  bg-card px-[5px] py-0"
								>
									<span className="px-1.5 py-1.5  text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
										All Status
									</span>
									<svg width="12" height="24" viewBox="0 0 24 12" fill="none">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M11.2884 10.1569L5.63137 4.49994L7.04537 3.08594L11.9954 8.03594L16.9454 3.08594L18.3594 4.49994L12.7024 10.1569C12.5148 10.3444 12.2605 10.4497 11.9954 10.4497C11.7302 10.4497 11.4759 10.3444 11.2884 10.1569Z"
											fill="#332687"
										/>
									</svg>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>All Status</DropdownMenuItem>
								<DropdownMenuItem>Valid</DropdownMenuItem>
								<DropdownMenuItem>Pending</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="h-[54px] gap-1 rounded-[10px]  bg-card px-[5px] py-0"
								>
									<span className="px-1.5 py-1.5  text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
										All Type
									</span>
									<svg width="12" height="24" viewBox="0 0 24 12" fill="none">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M11.2884 10.1569L5.63137 4.49994L7.04537 3.08594L11.9954 8.03594L16.9454 3.08594L18.3594 4.49994L12.7024 10.1569C12.5148 10.3444 12.2605 10.4497 11.9954 10.4497C11.7302 10.4497 11.4759 10.3444 11.2884 10.1569Z"
											fill="#332687"
										/>
									</svg>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>All Type</DropdownMenuItem>
								<DropdownMenuItem>Asset</DropdownMenuItem>
								<DropdownMenuItem>Liability</DropdownMenuItem>
								<DropdownMenuItem>Revenue</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Button
							variant="outline"
							className="h-[54px] gap-1 rounded-[10px]   px-[5px] py-0"
						>
							<Filter className="h-[18px] w-[18px] text-primary" />
							<span className="px-1.5 py-1.5  text-sm font-medium leading-5 tracking-[0.1px] text-muted-foreground">
								Filter
							</span>
						</Button>

						<Button
							variant="outline"
							className="h-[54px] w-[54px] rounded-[10px] "
						>
							<MoreHorizontal className="h-[35px] w-[35px] text-primary" />
						</Button>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="px-[30px]">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-[197px]  text-base font-bold text-muted-foreground">
								Account No
							</TableHead>
							<TableHead className="w-[325px]  text-base font-bold text-muted-foreground">
								Account Name
							</TableHead>
							<TableHead className="w-[172px]  text-base font-bold text-muted-foreground">
								Type
							</TableHead>
							<TableHead className="w-[204px]  text-base font-bold text-muted-foreground">
								Normal Side
							</TableHead>
							<TableHead className="w-[215px]  text-base font-bold text-muted-foreground">
								Tax Mapping
							</TableHead>
							<TableHead className="w-[145px]  text-base font-bold text-muted-foreground">
								Status
							</TableHead>
							<TableHead className="w-[207px]  text-base font-bold text-muted-foreground">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{mappingData.map((row) => (
							<TableRow
								key={row.id}
								className="h-[49px] border-b border-[rgba(0,0,0,0.10)] hover:bg-muted/50"
							>
								<TableCell className=" text-base ">{row.accountNo}</TableCell>
								<TableCell className=" text-base ">{row.accountName}</TableCell>
								<TableCell>
									<Badge
										variant="secondary"
										className="h-[21px] rounded bg-[#F3F4F6] px-2 py-[3px]  text-xs font-medium text-[#1F2937]"
									>
										{row.type}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge
										variant="secondary"
										className="h-[21px] rounded bg-[#F3F4F6] px-2 py-[3px]  text-xs font-medium text-[#1F2937]"
									>
										{row.normalSide}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex gap-2">
										{row.taxMapping.map((tax, idx) => (
											<Badge
												key={idx}
												variant="secondary"
												className="h-[21px] rounded bg-[#F3F4F6] px-2 py-[3px]  text-xs font-medium text-[#1F2937]"
											>
												{tax}
											</Badge>
										))}
									</div>
								</TableCell>
								<TableCell>
									<Badge className="h-[21px] rounded bg-[#E6F4EA] px-2 py-[3px]  text-xs font-medium text-[#137333] hover:bg-[#E6F4EA]">
										{row.status}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="icon" className="h-8 w-9">
											<Edit2 className="h-4 w-4 text-muted-foreground" />
										</Button>
										<Button variant="ghost" size="icon" className="h-8 w-9">
											<Trash2 className="h-4 w-4 text-muted-foreground" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between px-[30px]">
				<span className=" text-sm text-muted-foreground">
					Showing 1-10 of 100 products
				</span>
				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="icon"
						className="h-9 w-9 rounded-[10px] border-[rgba(0,0,0,0.10)]"
						disabled
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="default"
						className="h-9 w-9 rounded-[10px]  p-0  text-sm font-medium text-white "
					>
						1
					</Button>
					<Button
						variant="ghost"
						className="h-9 w-9 rounded-[10px] p-0  text-sm text-muted-foreground"
					>
						2
					</Button>
					<Button
						variant="ghost"
						className="h-9 w-9 rounded-[10px] p-0  text-sm text-muted-foreground"
					>
						3
					</Button>
					<Button
						variant="ghost"
						className="h-9 w-9 rounded-[10px] p-0  text-sm text-muted-foreground"
					>
						4
					</Button>
					<span className="flex h-9 w-9 items-center justify-center  text-sm text-muted-foreground">
						...
					</span>
					<Button
						variant="ghost"
						className="h-9 w-9 rounded-[10px] p-0  text-sm text-muted-foreground"
					>
						10
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-9 w-9 rounded-[10px] border-[rgba(0,0,0,0.10)]"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
