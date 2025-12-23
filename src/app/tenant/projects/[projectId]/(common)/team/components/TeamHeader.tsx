"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function TeamHeader() {
	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
			<div className="flex flex-col">
				<h2 className="font-dm text-2xl font-bold leading-8 text-primary">
					Daftar Anggota Tim
				</h2>
				<p className=" text-xs leading-4 text-primary">
					Kelola anggota tim yang terlibat di dalam project
				</p>
			</div>

			<Button className="flex h-12 w-full items-center gap-1 rounded-[10px] bg-primary hover:bg-[#241963] md:w-auto">
				<Plus className="h-6 w-6" />
				<span className=" text-sm font-medium leading-5">Invite User</span>
			</Button>
		</div>
	);
}
