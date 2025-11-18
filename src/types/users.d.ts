
export type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  isCurrentUser?: boolean;
};

export interface PaginatedUsersResponse {
  items: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
