"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaxCutsPage() {
	return (
		<Card className="rounded-[14px] border-[0.8px] ">
			<CardHeader>
				<CardTitle className=" text-base ">Pemotongan Pajak</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					Halaman pemotongan pajak akan ditampilkan di sini.
				</p>
			</CardContent>
		</Card>
	);
}
