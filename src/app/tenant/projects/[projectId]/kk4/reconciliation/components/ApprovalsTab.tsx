"use client"

import { useState } from "react"
import { MessageSquare, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data
const approvalData = {
  stagedAdjustments: 1,
  netImpact: "Rp 202.713.123",
  checklistItems: [
    "Semua adjustment memiliki justifikasi yang tepat",
    "Dokumen pendukung telah dilampirkan",
    "Threshold materialitas terpenuhi",
    "Tidak ada adjustment duplikat",
    "Aturan perpajakan diterapkan dengan benar",
    "Kalkulasi jumlah telah diverifikasi"
  ],
  comments: [
    {
      id: 1,
      author: "John Doe",
      role: "Staff",
      timestamp: "2 hours ago",
      message: "Semua koreksi entertainment sudah sesuai dengan PMK terbaru"
    },
    {
      id: 2,
      author: "Jane Smith",
      role: "Ketua Tim",
      timestamp: "1 hour ago",
      message: "Please verify the depreciation adjustment - need to double check the fiscal rates"
    }
  ]
}

export default function ApprovalsTab() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(approvalData.checklistItems.length).fill(false)
  )

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = !newCheckedItems[index]
    setCheckedItems(newCheckedItems)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-normal text-[#1A1A2E]">Approval Workflow</h3>
          <p className="text-xs text-slate-500">
            Review and approve fiscal reconciliation adjustments
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 shadow-sm"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Add Comment
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-sm"
          >
            <Check className="h-3.5 w-3.5" />
            Approve & Lock
          </Button>
        </div>
      </div>

      {/* Warning Alert */}
      <Alert className="border-yellow-400 bg-white shadow-sm">
        <AlertTriangle className="h-5 w-5 text-yellow-400" />
        <div className="ml-2">
          <AlertTitle className="text-sm font-normal text-[#1A1A2E] mb-1">
            Approval Required
          </AlertTitle>
          <AlertDescription className="text-xs text-slate-500">
            This reconciliation run has {approvalData.stagedAdjustments} staged adjustments totaling{" "}
            {approvalData.netImpact} net impact. Please review all adjustments before approval.
          </AlertDescription>
        </div>
      </Alert>

      {/* Review Checklist Card */}
      <Card className="border-slate-200/50 shadow-sm">
        <CardHeader className="space-y-1.5 pb-5">
          <CardTitle className="text-sm font-normal text-[#1A1A2E]">
            Review Checklist
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Verify all items before final approval
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {approvalData.checklistItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg"
            >
              <Checkbox
                id={`checklist-${index}`}
                checked={checkedItems[index]}
                onCheckedChange={() => handleCheckboxChange(index)}
                className="border-slate-400"
              />
              <label
                htmlFor={`checklist-${index}`}
                className="text-xs text-[#1A1A2E] cursor-pointer flex-1"
              >
                {item}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Comments & History Card */}
      <Card className="border-slate-200/50 shadow-sm">
        <CardHeader className="space-y-1.5 pb-5">
          <CardTitle className="text-sm font-normal text-[#1A1A2E]">
            Comments & History
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Discussion and audit trail
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3.5">
          {approvalData.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-3 p-3 border border-slate-200 rounded-lg"
            >
              <Avatar className="h-7 w-7 bg-blue-50">
                <AvatarFallback className="text-xs text-blue-500 bg-blue-50">
                  {getInitials(comment.author)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-[#1A1A2E] font-normal">
                    {comment.author}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[11px] font-normal h-auto py-0.5 px-2"
                  >
                    {comment.role}
                  </Badge>
                  <span className="text-[11px] text-slate-500">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-500 break-words">
                  {comment.message}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
