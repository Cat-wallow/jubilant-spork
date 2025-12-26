"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  FolderKanban,
  ClipboardList,
  CheckCircle2,
  CalendarX,
  ChevronDown,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { memberStats, memberProjects } from "./data/memberDashboardData";

export function MemberDashboard() {
  const statCards = [
    {
      icon: FolderKanban,
      label: "Total Proyek",
      value: memberStats.totalProjects,
      bgColor: "bg-[#F4F7FE]",
      iconColor: "text-[#332687]",
    },
    {
      icon: ClipboardList,
      label: "Total Tugas",
      value: memberStats.totalTasks,
      bgColor: "bg-[#F4F7FE]",
      iconColor: "text-[#332687]",
    },
    {
      icon: CheckCircle2,
      label: "Tugas Selesai",
      value: memberStats.completedTasks,
      bgColor: "bg-[#F4F7FE]",
      iconColor: "text-[#332687]",
    },
    {
      icon: CalendarX,
      label: "Tugas Overdue",
      value: memberStats.overdueTasks,
      bgColor: "bg-[#F4F7FE]",
      iconColor: "text-[#332687]",
    },
  ];

  const tableHeaders = [
    "Kode Project",
    "Nama Proyek",
    "Nama Klien (WP)",
    "Period",
    "Progress",
    "Status",
    "Last Update",
    "Action",
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-[#707EAE]">Dashboard</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0B1437] tracking-tight">
          Dashboard Anggota Tim
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-5 bg-white rounded-3xl border-0 shadow-sm">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-full ${stat.bgColor} flex items-center justify-center`}
              >
                <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#A3AED0] mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-[#0B1437]">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Projects Table */}
      <Card className="p-6 md:p-8 bg-white rounded-3xl border-0 shadow-sm">
        <div className="space-y-8">
          {/* Table Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[#2B3674]">Proyek Saya</h2>
              <p className="text-xs text-[#2B3674]">
                Daftar proyek yang ditugaskan kepada Anda
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <Button
                variant="outline"
                className="rounded-lg border-[#CAC4D0] bg-white hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-[#49454F]">
                  All Status
                </span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>

              <Button
                variant="outline"
                className="rounded-lg border-[#CAC4D0] bg-[#F9FAFB] hover:bg-gray-100"
              >
                <Filter className="w-4 h-4 mr-2 text-[#332687]" />
                <span className="text-sm font-medium text-[#49454F]">
                  Filter
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-lg bg-[#F4F7FE] hover:bg-[#EFF4FB]"
              >
                <MoreHorizontal className="w-5 h-5 text-[#4318FF]" />
              </Button>
            </div>
          </div>

          {/* Table Content */}
          <div className="space-y-4">
            {/* Table Headers */}
            <div className="hidden lg:flex items-center justify-between text-sm font-medium text-[#A3AED0]">
              {tableHeaders.map((header, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 ${
                    header === "Action" ? "w-48" : "w-32"
                  }`}
                >
                  <span>{header}</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
              ))}
            </div>

            <Separator className="bg-[#E9EDF7]" />

            {/* Table Rows */}
            <div className="space-y-4">
              {memberProjects.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-2">
                    {/* Project Code */}
                    <div className="w-full lg:w-32">
                      <p className="text-sm font-bold text-[#2B3674]">
                        {project.code}
                      </p>
                    </div>

                    {/* Project Name */}
                    <div className="w-full lg:w-32">
                      <p className="text-sm font-bold text-[#2B3674]">
                        {project.projectName}
                      </p>
                    </div>

                    {/* Client Name */}
                    <div className="w-full lg:w-32">
                      <p className="text-sm font-bold text-[#2B3674]">
                        {project.clientName}
                      </p>
                    </div>

                    {/* Period */}
                    <div className="w-full lg:w-32">
                      <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-[rgba(103,80,164,0.08)]">
                        <span className="text-sm font-bold text-[#2B3674]">
                          {project.period}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="w-full lg:w-32">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#2B3674]">
                          {project.progress}%
                        </span>
                        <Progress
                          value={project.progress}
                          className="h-2 flex-1 bg-[#EFF4FB]"
                          indicatorClassName="bg-[#4318FF]"
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="w-full lg:w-32">
                      <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-[rgba(103,80,164,0.08)]">
                        <span className="text-sm font-bold text-[#2B3674]">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Last Update */}
                    <div className="w-full lg:w-32">
                      <p className="text-xs text-[#2B3674]">
                        {project.lastUpdate}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="w-full lg:w-48">
                      <Button className="w-full lg:w-auto bg-[#6750A4] hover:bg-[#5840A0] text-white rounded-md px-4 py-2 text-sm font-medium">
                        View My Task
                      </Button>
                    </div>
                  </div>

                  {index < memberProjects.length - 1 && (
                    <Separator className="bg-[#E9EDF7] mt-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
