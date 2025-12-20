import { StatsCards } from './components/StatsCards';
import { EntriesTable } from './components/EntriesTable';

export default function PPNPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Stats Cards */}
      <StatsCards />

      {/* Entries Table */}
      <EntriesTable />
    </div>
  );
}
