# Timeline Feature

This timeline feature provides interactive Gantt chart and Board view for project management.

## Folder Structure (Vertical Architecture)

```
timeline/
├── components/          # Sub-components
│   ├── GanttChart.tsx
│   ├── BoardChart.tsx
│   └── TimelineFilters.tsx
├── utils/              # Utilities
│   └── export.ts       # PNG/PDF export functions
├── types.ts            # TypeScript interfaces
├── data.ts             # Mock data
├── page.tsx            # Main timeline page
└── README.md           # This file
```

## Features

### 1. Gantt Chart View
- Interactive timeline visualization
- Month navigation (Previous/Next/Today)
- Color-coded tasks by module
- Progress indicators
- Responsive design

### 2. Board View
- Kanban-style board with 3 columns: Pending, In Progress, Completed
- Card-based task management
- Priority and status badges
- Assignee information
- Due date tracking

### 3. Export Functionality
- **PNG Export**: Download chart as PNG image
- **PDF Export**: Download chart as PDF document
- Works for both Gantt and Board views

### 4. Filters
- Module filter (All Module, Form 1.0, KK 1.0-5.0)
- Milestone Type filter
- Zoom options (Day, Week, Month views)
- Custom filter button

## Data Structure

### TimelineTask
```typescript
{
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
```

### BoardCard
```typescript
{
  id: string;
  title: string;
  module: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  assignee?: string;
}
```

## Technologies Used

- **Next.js 15** - React framework
- **Shadcn UI** - Component library
- **Tailwind CSS** - Styling
- **date-fns** - Date manipulation
- **html2canvas** - PNG export
- **jsPDF** - PDF export
- **Radix UI** - Headless UI components

## Usage

1. Navigate to `/tenant/projects/[projectId]/timeline`
2. Switch between Gantt Chart and Board view using tabs
3. Use filters to refine the view
4. Click PNG or PDF buttons to export the current view
5. Click "Tambah Tugas" to add new tasks (to be implemented)

## Future Enhancements

- [ ] Add task creation modal
- [ ] Edit task functionality
- [ ] Drag and drop in Board view
- [ ] Real-time collaboration
- [ ] Task dependencies in Gantt chart
- [ ] Custom date ranges
- [ ] Save filter preferences
- [ ] Task notifications
