export const systemsHealthData = {
  overallHealth: 98.5,
  metrics: [
    { label: "CPU Usage", value: 45, status: "healthy" },
    { label: "Memory Usage", value: 72, status: "warning" },
    { label: "Database Load", value: 38, status: "healthy" },
    { label: "API Response Time", value: 125, unit: "ms", status: "healthy" },
  ],
};

export const systemMetricsData = [
  { label: "CPU Usage", value: 45, unit: "%", status: "healthy" },
  { label: "Memory Usage", value: 72, unit: "%", status: "warning" },
  { label: "Database Load", value: 38, unit: "%", status: "healthy" },
  { label: "API Response Time", value: 125, unit: "ms", status: "healthy" },
  { label: "Error Rate", value: 0.1, unit: "%", status: "healthy" },
  { label: "Active Sessions", value: 234, status: "healthy" },
];

export const recentActivityData = [
  {
    id: 1,
    type: "Tenant Created",
    title: "PT ABC Corp",
    timestamp: "2 hours ago",
    color: "blue",
  },
  {
    id: 2,
    type: "System Update",
    title: "Platform updated to v2.1.3",
    timestamp: "6 hours ago",
    color: "green",
  },
  {
    id: 3,
    type: "Security Alert",
    title: "Failed login attempts detected",
    timestamp: "1 day ago",
    color: "yellow",
  },
  {
    id: 4,
    type: "Storage Alert",
    title: "PT Teknologi Nusantara",
    timestamp: "2 days ago",
    color: "yellow",
  },
  {
    id: 5,
    type: "User Management",
    title: "New admin user created",
    timestamp: "3 days ago",
    color: "blue",
  },
];

export const securityData = {
  securityScore: 96,
  activeAlerts: 3,
  uptime: 99.9,
  recommendations: [
    {
      id: 1,
      title: "Enable 2FA for all admin accounts",
      severity: "medium",
    },
    {
      id: 2,
      title: "Update SSL certificates",
      severity: "low",
    },
    {
      id: 3,
      title: "Review user permissions",
      severity: "high",
    },
  ],
};

export const analyticsData = {
  growthRate: 15.2,
  activeUsers: 234,
  documents: 12500,
  apiCalls: 847000,
};

export const quickActionsData = [
  { id: 1, title: "Database Maintenance", icon: "database" },
  { id: 2, title: "System Configuration", icon: "settings" },
  { id: 3, title: "User Management", icon: "users" },
  { id: 4, title: "Global Settings", icon: "globe" },
  { id: 5, title: "COA Template Demo", icon: "document" },
];

export const tenantManagementData = [
  {
    id: 1,
    name: "PT Maju Bersama",
    plan: "Professional",
    users: 15,
    status: "Active",
    storage: { used: 45.2, total: 100 },
  },
  {
    id: 2,
    name: "CV Sukses Mandiri",
    plan: "Basic",
    users: 8,
    status: "Active",
    storage: { used: 12.8, total: 50 },
  },
  {
    id: 3,
    name: "PT Teknologi Nusantara",
    plan: "Enterprise",
    users: 45,
    status: "Active",
    storage: { used: 234.5, total: 500 },
  },
];

export const adminStatsData = {
  totalTenants: 8,
  activeTenants: 3,
  totalUsers: 83,
  totalProjects: 120,
  activeClients: 38,
  storageUsage: { used: 293.5, total: 650, percentage: 85 },
};
