"use client";

import { JournalForm } from "./components/JournalForm";
import { BalanceCheck } from "./components/BalanceCheck";
import { ActionButtons } from "./components/ActionButtons";
import { QuickTips } from "./components/QuickTips";

export default function AddJournalPage() {
	return (
		<div className="flex flex-col items-start gap-[30px] self-stretch">
			{/* Header */}
			<div className="flex items-center justify-center gap-2.5 self-stretch">
				<div className="flex flex-1 flex-col items-start gap-[5px]">
					<div className="self-stretch text-sm font-medium leading-6 text-muted-foreground">
						KK 1.0 &gt; Jurnal &gt; Tambah Jurnal Manual
					</div>
					<div className="flex flex-col items-start self-stretch">
						<div className="self-stretch text-[34px] font-bold leading-[42px] tracking-[-0.68px] ">
							Tambah Jurnal Manual
						</div>
						<div className="text-sm leading-5 tracking-[0.25px] text-[#64748B]">
							Buat voucher jurnal manual untuk adjustment dan koreksi - Project
							PRJ-2024-001
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex items-center gap-[30px] self-stretch">
				{/* Left Side - Form */}
				<div className="flex h-[958.438px] flex-1 flex-col items-start gap-[21px]">
					<JournalForm />
				</div>

				{/* Right Side - Balance & Actions */}
				<div className="flex w-[495.6px] flex-col items-start gap-[21px]">
					<BalanceCheck />
					<ActionButtons />
					<QuickTips />
				</div>
			</div>
		</div>
	);
}
