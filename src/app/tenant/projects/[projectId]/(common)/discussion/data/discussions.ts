export interface Discussion {
  id: string;
  title: string;
  description: string;
  status: "Ditutup" | "Aktif";
  priority: "Urgent" | "High" | "Medium" | "Low";
  visibility: "Internal" | "External";
  tags: string[];
  date: string;
  members: { id: string; color: string }[];
  comments: number;
  commentTotal: number;
  attachments: number;
  attachmentTotal: number;
  isPinned: boolean;
  isUnread: boolean;
  statusTag: "PENDING" | "DONE" | "IN_PROGRESS";
}

export const discussions: Discussion[] = [
  {
    id: "1",
    title: "Klarifikasi Dokumen Perpajakan Q4 2024",
    description: "Deskripsi tentang forum diskusi",
    status: "Ditutup",
    priority: "Urgent",
    visibility: "Internal",
    tags: ["Transaksi", "KK 1.0"],
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    isPinned: false,
    isUnread: false,
    statusTag: "PENDING",
  },
  {
    id: "2",
    title: "Klarifikasi Dokumen Perpajakan Q4 2024",
    description: "Deskripsi tentang forum diskusi",
    status: "Aktif",
    priority: "Urgent",
    visibility: "Internal",
    tags: ["Transaksi", "KK 1.0"],
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    isPinned: false,
    isUnread: true,
    statusTag: "PENDING",
  },
  {
    id: "3",
    title: "Klarifikasi Dokumen Perpajakan Q4 2024",
    description: "Deskripsi tentang forum diskusi",
    status: "Ditutup",
    priority: "Urgent",
    visibility: "Internal",
    tags: ["Transaksi", "KK 1.0"],
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    isPinned: true,
    isUnread: false,
    statusTag: "PENDING",
  },
  {
    id: "4",
    title: "Klarifikasi Dokumen Perpajakan Q4 2024",
    description: "Deskripsi tentang forum diskusi",
    status: "Aktif",
    priority: "Urgent",
    visibility: "Internal",
    tags: ["Transaksi", "KK 1.0"],
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    isPinned: false,
    isUnread: false,
    statusTag: "PENDING",
  },
  {
    id: "5",
    title: "Klarifikasi Dokumen Perpajakan Q4 2024",
    description: "Deskripsi tentang forum diskusi",
    status: "Aktif",
    priority: "Urgent",
    visibility: "Internal",
    tags: ["Transaksi", "KK 1.0"],
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    isPinned: false,
    isUnread: false,
    statusTag: "PENDING",
  },
  {
    id: "6",
    title: "Klarifikasi Dokumen Perpajakan Q4 2024",
    description: "Deskripsi tentang forum diskusi",
    status: "Ditutup",
    priority: "Urgent",
    visibility: "Internal",
    tags: ["Transaksi", "KK 1.0"],
    date: "2024-10-10",
    members: [
      { id: "1", color: "#332687" },
      { id: "2", color: "#C9C9C9" },
      { id: "3", color: "#FF9B05" },
    ],
    comments: 1,
    commentTotal: 4,
    attachments: 1,
    attachmentTotal: 4,
    isPinned: false,
    isUnread: false,
    statusTag: "PENDING",
  },
];
