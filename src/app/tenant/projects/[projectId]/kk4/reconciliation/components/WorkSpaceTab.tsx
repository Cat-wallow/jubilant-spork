"use client"

import React from "react";
import { StatsCards } from "./StatsCards";
import { ReconciliationTable } from "./ReconciliationTable";
import mockData from "../mockData.json";
import { SuggestionCard } from "./SuggestionCard";
import { StagedAdjustmentCard } from "./StagedAdjustmentCard";
import { SourceLinesTable } from "./SourceLinesTable";
import { sourceLines, stagedAdjustments, suggestions, summaryData } from "./data";
import { SummaryCards } from "./SummaryCards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function WorkSpaceTab(){

	return (
		<div className="flex flex-col gap-[21px]">
		<SummaryCards totalSuggestions={summaryData.totalSuggestions} stagedAdjustments={summaryData.stagedAdjustments} positiveCorrection={summaryData.positiveCorrection} negativeCorrection={summaryData.negativeCorrection}/>
		<div className="grid gap-4 grid-cols-2 ">
		<Card className="grid ">
		<CardHeader>
		<CardTitle>Auto Generated Suggestions</CardTitle>
		<CardDescription>
			Based on fiscal rules and policy
		</CardDescription>
		</CardHeader>
		<CardContent className="grid gap-4">
			{suggestions.map((suggestion) => (<SuggestionCard onAccept={()=> {}} onReject={()=> {}} suggestion={suggestion} key={suggestion.id}/>))}
		</CardContent>
		</Card>
		<Card className="">
		<CardHeader>
		<div className="flex flex-row justify-between">
		<div>
		<CardTitle>Staged Adjustments</CardTitle>
		<CardDescription>
			Approved for reconciliation
		</CardDescription>
		</div>
		<Button variant="outline" className="gap-2"><Plus className="h-4 w-4"/> Add Manual</Button>
		</div>
		</CardHeader>
		<CardContent className="grid gap-4">
			{stagedAdjustments.map((adjustment) => (<StagedAdjustmentCard adjustment={adjustment} key={adjustment.id}/>))}
		</CardContent>
		</Card>
		</div>
		<Card>
		<CardHeader>
		<CardTitle>Source Lines Explorer</CardTitle>
		<CardDescription>
		Journal entries from KK 2.0 requiring fiscal analysis
		</CardDescription>
		</CardHeader>
		<CardContent className="grid gap-4">
			<SourceLinesTable sourceLines={sourceLines}/>
		</CardContent>
		</Card>
		</div>
	);
}
