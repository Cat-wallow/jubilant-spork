import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, MessageSquare, Paperclip, Trash2 } from "lucide-react";
import { Discussion } from "../data/discussions";
import { Card } from "@/components/ui/card";

interface DiscussionCardProps {
	discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
	return (
		<Card className="flex w-full max-w-[400px] flex-col justify-center gap-2.5 rounded-[20px] border border-transparent p-4 hover:border-border hover:shadow-sm">
			<div className="flex items-center gap-2.5">
				<div
					className={`flex items-center justify-center gap-2.5 rounded-[5px] px-3 py-1.5 ${
						discussion.status === "Aktif"
							? "bg-primary text-white"
							: "bg-transparent "
					}`}
				>
					<span className="font-inter text-sm font-bold">
						{discussion.status}
					</span>
				</div>
				{discussion.priority === "Urgent" && (
					<Badge className="min-w-[48px] rounded-full bg-[#EC221F] px-3 py-1 text-[10px] font-medium leading-4 text-white hover:bg-[#EC221F]">
						Urgent
					</Badge>
				)}
			</div>

			<div className="flex flex-col gap-2.5 self-stretch rounded-[10px]">
				<div className="flex items-center justify-between self-stretch">
					<div className="flex items-center justify-center gap-2.5 rounded-[5px] border  px-2.5 py-1.5">
						<span className="font-inter text-xs text-[#8C8C8C]">
							{discussion.visibility}
						</span>
					</div>
					<div className="flex items-center justify-end gap-2.5">
						<Button
							variant="ghost"
							size="icon"
							className="h-[18px] w-[18px] p-0 hover:bg-transparent"
						>
							<Edit className="h-[18px] w-[18px] text-[#8C8C8C]" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 p-0 hover:bg-transparent"
						>
							<Trash2 className="h-5 w-5 text-[#8C8C8C]" />
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-1.5">
					<h3 className=" text-base font-medium leading-6 tracking-[0.15px] ">
						{discussion.title}
					</h3>
					<p className=" text-xs leading-4 tracking-[0.4px] text-[#8C8C8C]">
						{discussion.description}
					</p>
					<div className="flex flex-wrap items-start gap-1.5">
						{discussion.tags.map((tag, index) => (
							<div
								key={index}
								className="flex items-center justify-center gap-2.5 rounded-[5px] border  px-2.5 py-1.5"
							>
								<span className="font-inter text-xs text-[#8C8C8C]">{tag}</span>
							</div>
						))}
					</div>
					<div className="flex items-center gap-1.5">
						<Calendar className="h-5 w-5 text-[#8C8C8C]" strokeWidth={2.5} />
						<span className=" text-xs leading-4 tracking-[0.4px] text-[#8C8C8C]">
							{discussion.date}
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between self-stretch">
					<div className="flex items-center gap-2.5">
						<div className="relative flex h-[25px] w-[51px] items-center">
							{discussion.members.map((member, index) => (
								<div
									key={member.id}
									className="absolute h-[21px] w-[21px] rounded-full border-2 border-white"
									style={{
										backgroundColor: member.color,
										left: `${index * 14}px`,
										zIndex: discussion.members.length - index,
									}}
								/>
							))}
						</div>
						<div className="flex items-center gap-1.5">
							<div className="flex items-center gap-1.5">
								<MessageSquare className="h-[18px] w-[18px] text-[#8C8C8C]" />
								<span className=" text-xs leading-4 tracking-[0.4px] text-[#8C8C8C]">
									{discussion.comments}/{discussion.commentTotal}
								</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Paperclip className="h-[18px] w-[18px] text-[#8C8C8C]" />
								<span className=" text-xs leading-4 tracking-[0.4px] text-[#8C8C8C]">
									{discussion.attachments}/{discussion.attachmentTotal}
								</span>
							</div>
						</div>
					</div>
					<div className="flex h-7 w-[94px] items-center justify-center rounded-[10px] bg-primary">
						<span className="font-dm-sans text-center text-[10px] font-bold leading-[150%] text-white">
							{discussion.statusTag}
						</span>
					</div>
				</div>
			</div>
		</Card>
	);
}
