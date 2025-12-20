import React from "react";
import { StatsCards } from "./components/StatsCards";
import { CoAMappingTable } from "./components/CoAMappingTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function KK3MappingPage() {
	return (
		<div className="flex flex-col gap-[30px] p-[30px]">
			{/* Stats Cards */}
			<StatsCards />

			{/* Table */}
			<CoAMappingTable />
		</div>
	);
}
