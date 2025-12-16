"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KK20Tab } from "./kk-2-0";
import { KK10Tab } from "./kk-1-0";
import { KK30Tab } from "./kk-3-0";
import { KK40Tab } from "./kk-4-0";
import { DocumentComplianceTab } from "./document-compliance";
import { KK50Tab } from "./kk-5-0";
import { Card } from "@/components/ui/card";

export default function ReportPage() {
	return (
		<Card className="flex flex-col gap-[20px] p-4">
			{/* Page Header */}
			<div className="flex flex-col px-2">
				<h1 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
					Laporan Project
				</h1>
				<p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
					Tinjau laporan di dalam project
				</p>
			</div>

			{/* Report Tabs */}
			<Tabs defaultValue="kk-2-0" className=" w-full">
				<TabsList className="grid bg-card w-full shadow-sm  grid-cols-6 ">
					<TabsTrigger value="document-compliance">
						Document Compliance
					</TabsTrigger>
					<TabsTrigger value="kk-1-0">KK 1.0</TabsTrigger>
					<TabsTrigger value="kk-2-0">KK 2.0 GL/TB/LR</TabsTrigger>
					<TabsTrigger value="kk-3-0">KK 3.0 Pajak</TabsTrigger>
					<TabsTrigger value="kk-4-0">KK 4.0 Temuan/QC</TabsTrigger>
					<TabsTrigger value="kk-5-0">KK 5.0 BAST/Invoice</TabsTrigger>
				</TabsList>

				<TabsContent value="document-compliance" className="mt-6">
					<DocumentComplianceTab />
				</TabsContent>

				<TabsContent value="kk-1-0" className="mt-6">
					<KK10Tab />
				</TabsContent>

				<TabsContent value="kk-2-0" className="mt-6">
					<KK20Tab />
				</TabsContent>

				<TabsContent value="kk-3-0" className="mt-6">
					<KK30Tab />
				</TabsContent>

				<TabsContent value="kk-4-0" className="mt-6">
					<KK40Tab />
				</TabsContent>

				<TabsContent value="kk-5-0" className="mt-6">
					<KK50Tab />
				</TabsContent>
			</Tabs>
		</Card>
	);
}
