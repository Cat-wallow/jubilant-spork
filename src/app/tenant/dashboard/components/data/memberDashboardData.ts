export interface MemberProject {
  code: string;
  projectName: string;
  clientName: string;
  period: string;
  progress: number;
  status: string;
  lastUpdate: string;
}

export interface MemberStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

export const memberStats: MemberStats = {
  totalProjects: 3,
  totalTasks: 30,
  completedTasks: 25,
  overdueTasks: 25,
};

export const memberProjects: MemberProject[] = [
  {
    code: "PRJ-25-MS.001",
    projectName: "PT. MAJU SUKSES",
    clientName: "PT. Maju Mundur",
    period: "September 2025",
    progress: 75.5,
    status: "Tim Solo",
    lastUpdate: "12 September 2025 13.20",
  },
  {
    code: "PRJ-25-MS.001",
    projectName: "PT. MAJU SUKSES",
    clientName: "PT. Maju Mundur",
    period: "September 2025",
    progress: 75.5,
    status: "Tim Solo",
    lastUpdate: "12 September 2025 13.20",
  },
  {
    code: "PRJ-25-MS.001",
    projectName: "PT. MAJU SUKSES",
    clientName: "PT. Maju Mundur",
    period: "September 2025",
    progress: 75.5,
    status: "Tim Solo",
    lastUpdate: "12 September 2025 13.20",
  },
  {
    code: "PRJ-25-MS.001",
    projectName: "PT. MAJU SUKSES",
    clientName: "PT. Maju Mundur",
    period: "September 2025",
    progress: 75.5,
    status: "Tim Solo",
    lastUpdate: "12 September 2025 13.20",
  },
  {
    code: "PRJ-25-MS.001",
    projectName: "PT. MAJU SUKSES",
    clientName: "PT. Maju Mundur",
    period: "September 2025",
    progress: 75.5,
    status: "Tim Solo",
    lastUpdate: "12 September 2025 13.20",
  },
];
