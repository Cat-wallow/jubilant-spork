export type Tenant = {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  plan: 'Free' | 'Pro' | 'Enterprise';
  activeProjects: number;
  users: number;
  storage: {
    used: number;
    total: number;
  };
  lastUpdate: string;
};
