"use client";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { slaBaseline } from "../data/settingsData";

export function SlaBaselineTable() {
	return (
		<div className="flex flex-col gap-5">
			{/* Header */}
			<div className="flex flex-col">
				<h2 className="font-dm text-2xl font-bold leading-8 text-primary">
					SLA & Baseline per Modul
				</h2>
				<p className="text-xs leading-4 text-primary">
					SLA ini akan menjadi baseline untuk Timeline dan Kalkulasi status
					Overdue
				</p>
			</div>

			{/* Table */}
			<div className="flex flex-col gap-2.5">
				{/* Table Header */}
				<div className="flex items-center justify-between gap-4">
					<div className="w-[150px]">
						<span className="font-dm text-sm font-bold leading-6 ">Modul</span>
					</div>
					<div className="w-[150px]">
						<span className="font-dm text-sm font-bold leading-6 ">
							Start Offset (days)
						</span>
					</div>
					<div className="w-[150px]">
						<span className="font-dm text-sm font-bold leading-6 ">
							Due (days)
						</span>
					</div>
					<div className="w-[150px]">
						<span className="font-dm text-sm font-bold leading-6 ">
							Review (Days)
						</span>
					</div>
					<div className="w-[150px]">
						<span className="font-dm text-sm font-bold leading-6 ">
							Calendar
						</span>
					</div>
				</div>

				{/* Separator */}
				<div className="h-px w-full bg-[rgba(145,158,171,0.20)]" />

				{/* Table Rows */}
				{slaBaseline.map((row) => (
					<div key={row.id} className="flex items-center justify-between gap-4">
						<div className="w-[150px]">
							<span className="font-dm text-sm font-bold leading-6 ">
								{row.module}
							</span>
						</div>
						<div className="w-[150px]">
							<Input
								type="text"
								value={row.startOffset}
								className="h-[45px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
							/>
						</div>
						<div className="w-[150px]">
							<Input
								type="text"
								value={row.due}
								className="h-[45px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
							/>
						</div>
						<div className="w-[150px]">
							<Input
								type="text"
								value={row.review}
								className="h-[45px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]"
							/>
						</div>
						<div className="w-[150px]">
							<Select defaultValue={row.calendar}>
								<SelectTrigger className="h-[45px] rounded-lg border-none bg-[rgba(145,158,171,0.08)]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Default">Default</SelectItem>
									<SelectItem value="Calendar1">Calendar 1</SelectItem>
									<SelectItem value="Calendar2">Calendar 2</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
