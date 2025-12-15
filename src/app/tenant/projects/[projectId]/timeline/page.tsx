'use client';

import { useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { GanttChart } from './components/GanttChart';
import { BoardChart } from './components/BoardChart';
import { TimelineFilters } from './components/TimelineFilters';
import { mockTimelineTasks, mockBoardCards, modules, milestoneTypes } from './data';
import { exportToPNG, exportToPDF } from './utils/export';

const tabs = [
  { label: 'Ringkasan', path: 'summary' },
  { label: 'Tasks', path: 'tasks' },
  { label: 'Timeline', path: 'timeline' },
  { label: 'Team', path: 'team' },
  { label: 'Diskusi', path: 'discussion' },
  { label: 'Issues', path: 'issues' },
  { label: 'Activity', path: 'activity' },
  { label: 'Documents', path: 'documents' },
  { label: 'File', path: 'file' },
  { label: 'Billing', path: 'billing' },
  { label: 'Report', path: 'report' },
  { label: 'Settings', path: 'settings' },
];

export default function TimelinePage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const projectId = params.projectId as string;

  const currentTab = pathname?.split('/').pop() || 'summary';

  const [selectedModule, setSelectedModule] = useState('All Module');
  const [selectedMilestone, setSelectedMilestone] = useState('Milestone Type');
  const [selectedZoom, setSelectedZoom] = useState('Zoom By');
  const [viewMode, setViewMode] = useState<'gantt' | 'board'>('gantt');

  const handleTabClick = (tabPath: string) => {
    router.push(`/tenant/projects/${projectId}/${tabPath}`);
  };

  const handleExportPNG = () => {
    const elementId = viewMode === 'gantt' ? 'gantt-chart-export' : 'board-chart-export';
    exportToPNG(elementId, `project-timeline-${viewMode}-${Date.now()}`);
  };

  const handleExportPDF = () => {
    const elementId = viewMode === 'gantt' ? 'gantt-chart-export' : 'board-chart-export';
    exportToPDF(elementId, `project-timeline-${viewMode}-${Date.now()}`);
  };

  return (
    <div className="flex w-full flex-col gap-[30px] bg-[#F4F7FE] p-[30px]">
      <div className="flex items-center justify-center gap-2.5">
        <div className="flex flex-1 flex-col gap-[5px]">
          <p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">
            Project &gt; Add Project
          </p>
          <h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
            Konsultasi Pajak PT Maju Bersama
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#404040]">Publish</span>
          <div className="relative h-6 w-11 rounded-[50px] bg-[#E2E8F0]">
            <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
          </div>
        </div>
      </div>

      <div className="flex h-[42px] items-center gap-2 overflow-x-auto rounded-[5px] bg-muted/60 p-[4px]">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => handleTabClick(tab.path)}
            className={cn(
              'flex shrink-0 items-center justify-center gap-2.5 rounded-[5px] px-[14px] py-[6px] font-public-sans text-sm font-semibold leading-[22px] transition-colors',
              currentTab === tab.path
                ? 'bg-white text-[#332687]'
                : 'bg-transparent text-muted-foreground hover:bg-white/50',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-start gap-[50px] rounded-[20px]">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col items-start">
            <h2 className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
              Project Timeline
            </h2>
            <p className="font-roboto text-xs font-normal leading-4 tracking-[0.4px] text-[#2B3674]">
              Tinjau dan kelola timeline project
            </p>
          </div>
          <Button className="h-12 rounded-[10px] bg-[#332687] hover:bg-[#241963]">
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px] text-white">
              Tambah Tugas
            </span>
          </Button>
        </div>

        <TimelineFilters
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          selectedMilestone={selectedMilestone}
          setSelectedMilestone={setSelectedMilestone}
          selectedZoom={selectedZoom}
          setSelectedZoom={setSelectedZoom}
          onExportPNG={handleExportPNG}
          onExportPDF={handleExportPDF}
          modules={modules}
          milestones={milestoneTypes}
        />

        <div className="w-full">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'gantt' | 'board')} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="gantt" className="font-medium">
                Gantt Chart
              </TabsTrigger>
              <TabsTrigger value="board" className="font-medium">
                Board
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gantt" className="mt-0">
              <GanttChart tasks={mockTimelineTasks} />
            </TabsContent>

            <TabsContent value="board" className="mt-0">
              <BoardChart cards={mockBoardCards} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
