"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCards } from "./components/stat-cards";
import { GeneralLedgerTab } from "./general-ledger";
import { TrialBalanceTab } from "./trial-balance";
import { LabaRugiTab } from "./laba-rugi";
import { kk2Stats } from "./data";

export function KK20Tab() {
	return (
		<div className="flex flex-col gap-5">
			<StatCards stats={kk2Stats} />

			<Tabs defaultValue="general-ledger" className="w-full">
				<TabsList className="grid bg-card w-full grid-cols-3 ">
					<TabsTrigger value="general-ledger">General Ledger</TabsTrigger>
					<TabsTrigger value="trial-balance">Trial Balance</TabsTrigger>
					<TabsTrigger value="laba-rugi">Laba Rugi</TabsTrigger>
				</TabsList>

				<TabsContent value="general-ledger" className="mt-6">
					<GeneralLedgerTab />
				</TabsContent>

				<TabsContent value="trial-balance" className="mt-6">
					<TrialBalanceTab />
				</TabsContent>

				<TabsContent value="laba-rugi" className="mt-6">
					<LabaRugiTab />
				</TabsContent>
			</Tabs>
		</div>
	);
}
