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
        <TabsList className="grid h-[42px] w-full grid-cols-3 gap-0 rounded-[5px] bg-transparent p-0">
          <TabsTrigger
            value="general-ledger"
            className="rounded-[5px] border-0 bg-transparent font-public-sans text-sm font-semibold leading-[22px] text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            General Ledger
          </TabsTrigger>
          <TabsTrigger
            value="trial-balance"
            className="rounded-[5px] border-0 bg-transparent font-public-sans text-sm font-semibold leading-[22px] text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Trial Balance
          </TabsTrigger>
          <TabsTrigger
            value="laba-rugi"
            className="rounded-[5px] border-0 bg-transparent font-public-sans text-sm font-semibold leading-[22px] text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Laba Rugi
          </TabsTrigger>
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
