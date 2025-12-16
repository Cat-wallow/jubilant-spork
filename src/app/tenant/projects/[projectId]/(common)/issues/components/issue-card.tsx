import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare, Edit, MessageSquare, Paperclip, Trash2 } from "lucide-react";
import { Issue } from "../data/issues";

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-[#BF6A02]";
      case "Medium":
        return "text-[#BF6A02]";
      default:
        return "text-[#8C8C8C]";
    }
  };

  const getActionButtonColor = (action?: string) => {
    switch (action) {
      case "Update":
        return "bg-[#08F] hover:bg-[#08F]/90";
      case "Start":
        return "bg-[#8C8C8C] hover:bg-[#8C8C8C]/90";
      default:
        return "bg-[#8C8C8C] hover:bg-[#8C8C8C]/90";
    }
  };

  const getStatusTagColor = (tag: string) => {
    switch (tag) {
      case "DONE":
        return "bg-[#01B574]";
      default:
        return "bg-[#332687]";
    }
  };

  return (
    <div className="flex w-full flex-col gap-2.5 rounded-[20px]">
      <div className="flex flex-col gap-2.5 self-stretch rounded-[10px]">
        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center gap-2.5">
            <span className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#2B3674]">
              {issue.taskId}
            </span>
            {issue.module && (
              <div className="flex items-center justify-center gap-2.5 rounded-[5px] border border-[rgba(145,158,171,0.20)] px-2.5 py-1">
                <span className="font-inter text-xs text-[#8C8C8C]">{issue.module}</span>
              </div>
            )}
            <span className={`font-inter text-[10px] ${getPriorityColor(issue.priority)}`}>
              {issue.priority}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2.5">
            <Button variant="ghost" size="icon" className="h-[18px] w-[18px] p-0">
              <Edit className="h-[18px] w-[18px] text-[#8C8C8C]" />
            </Button>
            <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
              <Trash2 className="h-5 w-5 text-[#8C8C8C]" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="font-roboto text-base font-medium leading-6 tracking-[0.15px] text-[#404040]">
            {issue.title}
          </h3>
          <p className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#8C8C8C]">
            {issue.description}
          </p>
          <div className="flex items-center gap-1.5">
            <Calendar
              className={`h-5 w-5 ${issue.isOverdue ? "text-[#BF6A02]" : "text-[#8C8C8C]"}`}
            />
            <span
              className={`font-roboto text-xs leading-4 tracking-[0.4px] ${
                issue.isOverdue ? "text-[#BF6A02]" : "text-[#8C8C8C]"
              }`}
            >
              {issue.date}
            </span>
            {issue.isOverdue && (
              <Badge className="min-w-[48px] rounded-full bg-[#EC221F] px-2 py-0.5 text-[10px] font-medium text-white">
                Overdue
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between self-stretch">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-[25px] w-[51px] items-center">
              {issue.members.map((member, index) => (
                <div
                  key={member.id}
                  className="absolute h-[21px] w-[21px] rounded-full border-2 border-white"
                  style={{
                    backgroundColor: member.color,
                    left: `${index * 14}px`,
                    zIndex: issue.members.length - index,
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5">
                <CheckSquare className="h-5 w-5 text-[#8C8C8C]" />
                <span className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#8C8C8C]">
                  {issue.checkboxes}/{issue.checkboxTotal}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-[18px] w-[18px] text-[#8C8C8C]" />
                <span className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#8C8C8C]">
                  {issue.comments}/{issue.commentTotal}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Paperclip className="h-[18px] w-[18px] text-[#8C8C8C]" />
                <span className="font-roboto text-xs leading-4 tracking-[0.4px] text-[#8C8C8C]">
                  {issue.attachments}/{issue.attachmentTotal}
                </span>
              </div>
            </div>
          </div>
          {issue.actionButton ? (
            <Button
              className={`flex h-9 items-center gap-1 rounded-[10px] px-4 py-2 ${getActionButtonColor(
                issue.actionButton
              )}`}
            >
              <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-white">
                {issue.actionButton}
              </span>
            </Button>
          ) : (
            <div
              className={`flex h-7 min-w-[80px] items-center justify-center rounded-[10px] ${getStatusTagColor(
                issue.statusTag
              )}`}
            >
              <span className="font-dm-sans text-center text-[10px] font-bold leading-[150%] text-white">
                {issue.statusTag}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
