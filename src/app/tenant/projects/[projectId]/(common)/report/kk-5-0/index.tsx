import { StatsCards } from "./StatsCards";
import { BASTTable } from "./BASTTable";
import { InvoiceTable } from "./InvoiceTable";

export function KK50Tab() {
	return (
		<div className="flex w-full flex-col gap-5">
			{/* Stats Cards */}
			<StatsCards />

			{/* BAST Table */}
			<BASTTable />

			{/* Invoice Table */}
			<InvoiceTable />
		</div>
	);
}
