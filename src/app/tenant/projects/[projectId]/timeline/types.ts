export interface TimelineTask {
  id: string;
  name: string;
  module: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  color: string;
  status: 'completed' | 'in-progress' | 'pending';
  assignee?: string;
}

export interface BoardCard {
  id: string;
  title: string;
  module: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  assignee?: string;
}

export interface FilterOptions {
  module: string[];
  milestoneType: string[];
  zoom: 'day' | 'week' | 'month';
}
