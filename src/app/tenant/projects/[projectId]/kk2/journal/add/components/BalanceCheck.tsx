import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

export function BalanceCheck() {
	const totalDebit = 3000000;
	const totalCredit = 1000000;
	const difference = totalDebit - totalCredit;
	const isBalanced = difference === 0;

	return (
		<Card className="flex flex-col items-start gap-[26.25px] self-stretch rounded-[10.5px] border-[0.8px] border-[rgba(0,0,0,0.15)]">
			<CardTitle className="flex w-[452px] items-center p-6 pb-0 text-base font-medium leading-[24.5px] tracking-[-0.394px] ">
				Balance Check
			</CardTitle>

			<CardContent className="flex flex-col items-start gap-4 self-stretch">
				{/* Total Debit */}
				<div className="grid h-[42px] grid-cols-2 gap-[14px] self-stretch">
					<div className="flex flex-col items-start self-stretch">
						<div className="flex items-start self-stretch">
							<span className="flex-1 text-center text-xs leading-[17.5px] text-[#64748B]">
								Total Debit
							</span>
						</div>
						<div className="flex items-start self-stretch">
							<span className="flex-1 text-center text-[17.5px] font-bold leading-[24.5px] ">
								Rp {totalDebit.toLocaleString("id-ID")}
							</span>
						</div>
					</div>

					{/* Total Credit */}
					<div className="flex flex-col items-start self-stretch">
						<div className="flex items-start self-stretch">
							<span className="flex-1 text-center text-xs leading-[17.5px] text-[#64748B]">
								Total Kredit
							</span>
						</div>
						<div className="flex items-start self-stretch">
							<span className="flex-1 text-center text-[17.5px] font-bold leading-[24.5px] ">
								Rp {totalCredit.toLocaleString("id-ID")}
							</span>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="h-px self-stretch bg-border" />

				{/* Selisih */}
				<div className="h-[70px] self-stretch">
					<div className="flex w-[452px] items-start">
						<span className="flex-1 text-center text-xs leading-[17.5px] text-[#64748B]">
							Selisih
						</span>
					</div>
					<div className="flex w-[452px] items-start">
						<span className="flex-1 text-center text-[17.5px] font-bold leading-[24.5px] text-[#E7000B]">
							Rp {difference.toLocaleString("id-ID")}
						</span>
					</div>
					<div className="flex justify-center">
						<Badge
							variant="outline"
							className="mt-2 inline-flex items-center justify-center gap-[1.5px] rounded-[5.25px] border-[0.8px] border-transparent bg-[#E7000B] px-2 py-1"
						>
							<AlertTriangle className="h-[11px] w-[11px] text-white" />
							<span className="text-[10.5px] font-medium leading-[14px] text-white">
								{isBalanced ? "Balanced" : "Unbalanced"}
							</span>
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
