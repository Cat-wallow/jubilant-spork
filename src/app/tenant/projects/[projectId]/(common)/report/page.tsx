"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentComplianceTab } from "./document-compliance";
import { KK10Tab } from "./kk-1-0";

export default function ReportPage() {
	return (
		<div className="flex flex-col gap-[20px] p-4">
			{/* Page Header */}
			<div className="flex flex-col">
				<h1 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
					Laporan Project
				</h1>
				<p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
					Tinjau laporan di dalam project
				</p>
			</div>

			{/* Report Tabs */}
			<Tabs defaultValue="document-compliance" className="w-full">
				<TabsList className="grid h-auto w-full grid-cols-6 gap-2 bg-transparent p-0">
					<TabsTrigger
						value="document-compliance"
						className="rounded-[5px] border-0 bg-transparent px-3 py-2 font-public-sans text-sm font-semibold leading-[22px] text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
					>
						Document Compliance
					</TabsTrigger>
					<TabsTrigger
						value="kk-1-0"
						className="rounded-[5px] border-0 bg-transparent px-3 py-2 font-public-sans text-sm font-semibold leading-[22px] text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
					>
						KK 1.0
					</TabsTrigger>
					<TabsTrigger
						value="kk-2-0"
						className="rounded-[5px] border-0 bg-transparent px-3 py-2 font-public-sans text-sm font-semibold leading-[22px] text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
					>
						KK 2.0 GL/TB/LR
					</TabsTrigger>
					<TabsTrigger
						value="kk-3-0"
						className="rounded-[5px] border-0 bg-transparent px-3 py-2 font-public-sans text-sm font-semibold leading-[22px] text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
					>
						KK 3.0 Pajak
					</TabsTrigger>
					<TabsTrigger
						value="kk-4-0"
						className="rounded-[5px] border-0 bg-transparent px-3 py-2 font-public-sans text-sm font-semibold leading-[22px] text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
					>
						KK 4.0 Temuan/QC
					</TabsTrigger>
					<TabsTrigger
						value="kk-5-0"
						className="rounded-[5px] border-0 bg-transparent px-3 py-2 font-public-sans text-sm font-semibold leading-[22px] text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
					>
						KK 5.0 BAST/Invoice
					</TabsTrigger>
				</TabsList>

				<TabsContent value="document-compliance" className="mt-6">
					<DocumentComplianceTab />
				</TabsContent>

				<TabsContent value="kk-1-0" className="mt-6">
					<KK10Tab />
				</TabsContent>

				<TabsContent value="kk-2-0" className="mt-6">
					<div className="text-center text-muted-foreground">
						KK 2.0 GL/TB/LR - Coming Soon
					</div>
				</TabsContent>

				<TabsContent value="kk-3-0" className="mt-6">
					<div className="text-center text-muted-foreground">
						KK 3.0 Pajak - Coming Soon
					</div>
				</TabsContent>

				<TabsContent value="kk-4-0" className="mt-6">
					<div className="text-center text-muted-foreground">
						KK 4.0 Temuan/QC - Coming Soon
					</div>
				</TabsContent>

				<TabsContent value="kk-5-0" className="mt-6">
					<div className="text-center text-muted-foreground">
						KK 5.0 BAST/Invoice - Coming Soon
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
