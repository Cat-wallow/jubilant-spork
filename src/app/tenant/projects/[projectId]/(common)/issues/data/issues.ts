export interface Issue {
  id: string;
  taskId: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Medium" | "High" | "Low";
  module: string;
  date: string;
  isOverdue?: boolean;
  members: { id: string; color: string }[];
  checkboxes: number;
  checkboxTotal: number;
  comments: number;
  commentTotal: number;
  attachments: number;
  attachmentTotal: number;
  statusTag: "PENDING" | "DONE" | "IN_PROGRESS";
  actionButton?: "Open" | "Start" | "Update";
}

export const issues: Issue[] = [
  {
    id: "1",
    taskId: "T-001",
    title: "Client approval required for KK 2.0",
    description: "Deskripsi tentang tugas yang memiliki isu",
    status: "Open",
    priority: "Medium",
    module: "KK 1.0",
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    checkboxes: 1,
    checkboxTotal: 4,
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    statusTag: "PENDING",
    actionButton: "Open",
  },
  {
    id: "2",
    taskId: "T-001",
    title: "Missing bank statement for Dec 2024",
    description: "Deskripsi tentang tugas yang memiliki isu",
    status: "Open",
    priority: "High",
    module: "KK 1.0",
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    checkboxes: 1,
    checkboxTotal: 4,
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    statusTag: "PENDING",
    actionButton: "Start",
  },
  {
    id: "3",
    taskId: "T-001",
    title: "Client approval required for KK 2.0",
    description: "Deskripsi tentang tugas yang memiliki isu",
    status: "Open",
    priority: "Medium",
    module: "KK 1.0",
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    checkboxes: 1,
    checkboxTotal: 4,
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    statusTag: "PENDING",
    actionButton: "Start",
  },
  {
    id: "4",
    taskId: "T-001",
    title: "Missing bank statement for Dec 2024",
    description: "Deskripsi tugas yang menjelaskan tentang tugas.....",
    status: "In Progress",
    priority: "Medium",
    module: "KK 1.0",
    date: "2024-10-10",
    isOverdue: true,
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    checkboxes: 1,
    checkboxTotal: 4,
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    statusTag: "PENDING",
    actionButton: "Update",
  },
  {
    id: "5",
    taskId: "T-001",
    title: "Client approval required for KK 1.0",
    description: "Deskripsi tugas yang menjelaskan tentang tugas.....",
    status: "In Progress",
    priority: "High",
    module: "KK 1.0",
    date: "2024-10-10",
    isOverdue: true,
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    checkboxes: 1,
    checkboxTotal: 4,
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    statusTag: "PENDING",
    actionButton: "Update",
  },
  {
    id: "6",
    taskId: "T-001",
    title: "Client approval required for KK 3.0",
    description: "Deskripsi tugas yang menjelaskan tentang tugas.....",
    status: "Resolved",
    priority: "Medium",
    module: "",
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    checkboxes: 1,
    checkboxTotal: 4,
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    statusTag: "DONE",
  },
  {
    id: "7",
    taskId: "T-001",
    title: "Client approval required for KK 5.0",
    description: "Deskripsi tugas yang menjelaskan tentang tugas.....",
    status: "Resolved",
    priority: "Medium",
    module: "",
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    checkboxes: 1,
    checkboxTotal: 4,
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    statusTag: "DONE",
  },
];
