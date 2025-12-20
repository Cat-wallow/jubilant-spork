"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Image as ImageIcon, Pin, Mail, Tag } from "lucide-react";
import { discussions } from "./data/discussions";
import { DiscussionCard } from "./components/discussion-card";
import RBAC from "@/components/rbac/RBAC";

function DiscussionPageContent() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilter, setActiveFilter] = useState<string>("all");

	const filteredDiscussions = discussions.filter((discussion) => {
		if (activeFilter === "my" && !discussion.isUnread) return false;
		if (activeFilter === "pinned" && !discussion.isPinned) return false;
		if (activeFilter === "unread" && !discussion.isUnread) return false;

		if (searchQuery) {
			const searchLower = searchQuery.toLowerCase();
			return (
				discussion.title.toLowerCase().includes(searchLower) ||
				discussion.description.toLowerCase().includes(searchLower)
			);
		}

		return true;
	});

	return (
		<div className="flex flex-col items-start gap-[30px] self-stretch">
			<div className="flex flex-col items-start gap-2.5 self-stretch">
				<div className="flex items-start gap-5 self-stretch">
					<div className="flex h-[54px] flex-1 bg-card items-center gap-[15px] rounded-[10px] border  px-4">
						<div className="relative h-5 w-5 ">
							<div className="absolute left-0 top-0 h-[18px] w-[18px] rounded-full border-[3px] border-[#332687]" />
						</div>
						<Input
							placeholder="Cari forum diskusi berdasarkan judul atau konten"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-5 flex-1 border-0 bg-transparent p-0 font-dm-sans text-base leading-5 text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
						/>
					</div>
					<div className="flex items-center justify-end gap-2.5 self-stretch">
						<Button className="flex items-center gap-1 rounded-[10px] bg-primary hover:bg-primary/90">
							<Plus className="h-6 w-6 text-white" />
							<span className="whitespace-nowrap  text-sm font-medium leading-5 tracking-[0.1px] text-white">
								Tambah Forum Disusi
							</span>
						</Button>
					</div>
				</div>

				<div className="flex items-center justify-between self-stretch">
					<div className="flex items-center gap-2.5">
						<Button
							variant="outline"
							onClick={() =>
								setActiveFilter(activeFilter === "my" ? "all" : "my")
							}
							className={`flex h-[26px] items-center gap-2 rounded-[5.5px] border px-3 py-1 ${
								activeFilter === "my"
									? "border-[#332687] bg-primary text-white hover:bg-primary/90"
									: "border-[#CCC9C2] bg-transparent hover:bg-accent"
							}`}
						>
							<ImageIcon className="h-2.5 w-2.5" />
							<span className="font-inter text-[9px]">Diskusi Saya</span>
						</Button>
						<Button
							variant="outline"
							onClick={() =>
								setActiveFilter(activeFilter === "pinned" ? "all" : "pinned")
							}
							className={`flex h-[26px] items-center gap-2 rounded-[6.5px] border px-3 py-1 ${
								activeFilter === "pinned"
									? "border-[#332687] bg-primary text-white hover:bg-primary/90"
									: "border-[#CFCAC4] bg-transparent hover:bg-accent"
							}`}
						>
							<Pin className="h-2.5 w-2.5" />
							<span className="font-inter text-[10px]">Dipinned</span>
						</Button>
						<Button
							variant="outline"
							onClick={() =>
								setActiveFilter(activeFilter === "unread" ? "all" : "unread")
							}
							className={`flex h-[26px] items-center gap-2 rounded border px-3 py-1 ${
								activeFilter === "unread"
									? "border-[#332687] bg-primary text-white hover:bg-primary/90"
									: "border-[#E5E5E5] bg-transparent hover:bg-accent"
							}`}
						>
							<Mail className="h-2.5 w-2.5" />
							<span className="font-inter text-[10px]">Belum Dibaca (1)</span>
						</Button>
						<Button
							variant="outline"
							onClick={() =>
								setActiveFilter(activeFilter === "tags" ? "all" : "tags")
							}
							className={`flex h-[26px] items-center gap-2 rounded-[6.25px] border px-3 py-1 ${
								activeFilter === "tags"
									? "border-[#332687] bg-primary text-white hover:bg-primary/90"
									: "border-[#D3D0CA] bg-transparent hover:bg-accent"
							}`}
						>
							<Tag className="h-2.5 w-2.5" />
							<span className="font-inter text-center text-[10px]">Tags</span>
						</Button>
					</div>
					<span className="font-inter text-xs text-[#A19FB0]">
						{filteredDiscussions.length} dari {discussions.length} diskusi
					</span>
				</div>
			</div>

			<div className="flex flex-col items-start gap-[30px] self-stretch">
				<div className="grid grid-cols-1 gap-[30px] self-stretch md:grid-cols-2 xl:grid-cols-3">
					{filteredDiscussions.map((discussion) => (
						<DiscussionCard key={discussion.id} discussion={discussion} />
					))}
				</div>
			</div>
		</div>
	);
}

export default function ProjectDiscussionPage() {
	return (
		<RBAC
			requiredPermission={["project:manage", "project:read"]}
			unauthorizedPage={true}
		>
			<DiscussionPageContent />
		</RBAC>
	);
}
