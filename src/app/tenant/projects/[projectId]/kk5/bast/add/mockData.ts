export const bastFormData = {
  projectInfo: {
    name: "Implementation Sistem Manajemen Terintegrasi",
    projectId: "PRJ-2024-001",
    contractValue: 850000000,
    activeModules: ["Form 1.0", "KK 1.0", "KK 2.0", "KK 3.0"],
    servicePackage: "FULL_SERVICE",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
  },

  clientInfo: {
    companyName: "PT. Maju Bersama Indonesia",
    representative: "Budi Santoso",
    position: "Direktur Utama",
    email: "budi.santoso@majubersama.co.id",
    phone: "+62 21 5551234",
  },

  consultantInfo: {
    representative: "Dr. Ahmad Wijaya",
    position: "Project Manager",
    team: [
      { role: "Project Manager", name: "Dr. Ahmad Wijaya" },
      { role: "Technical Lead", name: "Ir. Siti Nurhaliza" },
      { role: "Quality Assurance", name: "Budi Santoso, CPA" },
      { role: "Tax Specialist", name: "Maria Claudia, MSc" },
    ],
  },

  services: [
    {
      id: "SIM",
      code: "SIM",
      name: "Sistem Informasi Manajemen",
      description: "Layanan dokumen manajemen sistem",
      price: 15000000,
    },
    {
      id: "SIA",
      code: "SIA",
      name: "Sistem Informasi Akuntansi",
      description: "Layanan akuntansi manajemen sistem",
      price: 25000000,
    },
    {
      id: "SIP",
      code: "SIP",
      name: "Sistem Informasi Perpajakan",
      description: "Layanan pajak manajemen sistem",
      price: 35000000,
    },
    {
      id: "FULL_SERVICE",
      code: "FULL_SERVICE",
      name: "Full Service Package",
      description: "Paket lengkap semua layanan",
      price: 85000000,
    },
  ],

  deliverables: [
    "Dokumentasi Form 1.0 - Compliance System",
    "Sistem KK 1.0 - Transaction Management",
    "Template dan formulir standar",
    "Workflow approval dan audit trail",
    "Sistem KK 2.0 - General Ledger & Financial Statements",
    "Chart of Accounts (COA) yang disesuaikan",
    "Auto-journaling engine",
    "Laporan keuangan lengkap (Neraca, L/R, Arus Kas)",
    "Paket lengkap semua modul (Form 1.0 - KK 4.0)",
    "Sistem terintegrasi end-to-end",
    "Training dan knowledge transfer",
    "Support dan maintenance documentation",
    "Sistem KK 3.0 - Tax Management & SPT Generation",
    "Auto-filled SPT (PPh 21/22/26, PPN 1111)",
    "Tax reconciliation engine",
    "Export PDF & XML CoreTax untuk DJP",
  ],
};
