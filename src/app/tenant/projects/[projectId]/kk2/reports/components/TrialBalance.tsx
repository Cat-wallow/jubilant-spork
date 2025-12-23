"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, MoreHorizontal, Search } from "lucide-react";
import { trialBalanceAccounts, formatCurrency } from "../data/mockData";
import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function TrialBalance() {
	const totalDebit = trialBalanceAccounts.reduce(
		(sum, acc) => sum + acc.debit,
		0,
	);
	const totalCredit = trialBalanceAccounts.reduce(
		(sum, acc) => sum + acc.credit,
		0,
	);

	return (
		<Card className="space-y-4 p-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="font-dm text-2xl font-bold leading-8 tracking-tight text-primary">
						Trial Balance
					</h2>
					<p className=" text-xs leading-4 tracking-wide text-primary">
						Deskripsi
					</p>
				</div>
				<Button
					variant="outline"
					className="gap-2 rounded-lg border  px-4 py-3"
				>
					<Download className="h-5 w-5 " />
					Export XLSX
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

			<div className="overflow-x-auto rounded-lg border border-[rgba(0,0,0,0.1)]">
				<table className="w-full">
					<thead>
						<tr className="border-b border-[rgba(0,0,0,0.1)] bg-card">
							<th className="p-3 text-left  text-sm ">Account No</th>
							<th className="p-3 text-left  text-sm ">Account Name</th>
							<th className="p-3 text-left  text-sm ">Begining Balance</th>
							<th className="p-3 text-right  text-sm ">Debit</th>
							<th className="p-3 text-right  text-sm ">Credit</th>
							<th className="p-3 text-right  text-sm ">Balance</th>
							<th className="p-3 text-left  text-sm ">Normal Side</th>
						</tr>
					</thead>
					<tbody>
						{trialBalanceAccounts.map((account, index) => (
							<tr
								key={index}
								className="border-b border-[rgba(0,0,0,0.1)] last:border-b-0"
							>
								<td className="p-3  text-sm ">{account.accountNo}</td>
								<td className="p-3  text-sm ">{account.accountName}</td>
								<td className="p-3  text-sm ">
									{formatCurrency(account.beginningBalance)}
								</td>
								<td className="p-3 text-right  text-sm ">
									{account.debit > 0 ? formatCurrency(account.debit) : "-"}
								</td>
								<td className="p-3 text-right  text-sm ">
									{account.credit > 0 ? formatCurrency(account.credit) : "-"}
								</td>
								<td className="p-3 text-right  text-sm ">
									{formatCurrency(account.balance)}
								</td>
								<td className="p-3">
									<Badge
										variant="outline"
										className="rounded-lg border-[rgba(0,0,0,0.1)]"
									>
										{account.normalSide}
									</Badge>
								</td>
							</tr>
						))}
						<tr className="border-t-2 border-[#0A0A0A] bg-gray-50">
							<td colSpan={3} className="p-3  text-sm font-bold ">
								TOTAL
							</td>
							<td className="p-3 text-right  text-sm font-bold ">
								{formatCurrency(totalDebit)}
							</td>
							<td className="p-3 text-right  text-sm font-bold ">
								{formatCurrency(totalCredit)}
							</td>
							<td className="p-3"></td>
							<td className="p-3"></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="flex items-center justify-between">
				<div className="font-geist text-sm text-[#737373]">
					Showing 1-10 of 100 products
				</div>
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="sm">
						Previous
					</Button>
					<Button variant="outline" size="sm" className="bg-card shadow-sm">
						1
					</Button>
					<Button variant="ghost" size="sm">
						2
					</Button>
					<Button variant="ghost" size="sm">
						3
					</Button>
					<Button variant="ghost" size="sm">
						4
					</Button>
					<span className="px-2">...</span>
					<Button variant="ghost" size="sm">
						10
					</Button>
					<Button variant="ghost" size="sm">
						Next
					</Button>
				</div>
			</div>
		</Card>
	);
}
