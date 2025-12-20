"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCards from "./components/StatsCards";
import ReportFilters from "./components/ReportFilters";
import GeneralLedger from "./components/GeneralLedger";
import TrialBalance from "./components/TrialBalance";
import Neraca from "./components/Neraca";
import LabaRugi from "./components/LabaRugi";
import CashFlow from "./components/CashFlow";
import { statsCards } from "./data/mockData";

export default function KK2ReportsPage() {
	return (
		<div className="space-y-8">
			<StatsCards stats={statsCards} />

			<Tabs defaultValue="general-ledger" className="w-full ">
				<TabsList>
					<TabsTrigger value="general-ledger">General Ledger</TabsTrigger>
					<TabsTrigger value="trial-balance">Trial Balance</TabsTrigger>
					<TabsTrigger value="neraca">Neraca</TabsTrigger>
					<TabsTrigger value="laba-rugi">Laba-Rugi</TabsTrigger>
					<TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
				</TabsList>

				<TabsContent
					value="general-ledger"
					className="mt-8 bg-card rounded-xl  space-y-5"
				>
					<ReportFilters
						showAddButton
						addButtonText="Tambah Akun"
						onAdd={() => console.log("Add account")}
					/>
					<GeneralLedger />
				</TabsContent>

				<TabsContent value="trial-balance" className="mt-8 space-y-5">
					<TrialBalance />
				</TabsContent>

				<TabsContent value="neraca" className="mt-8">
					<Neraca />
				</TabsContent>

				<TabsContent value="laba-rugi" className="mt-8">
					<LabaRugi />
				</TabsContent>

				<TabsContent value="cash-flow" className="mt-8">
					<CashFlow />
				</TabsContent>
			</Tabs>
		</div>
	);
}
