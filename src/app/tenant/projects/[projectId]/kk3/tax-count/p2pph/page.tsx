import { StatsCards } from './components/StatsCards';
import { EntriesTable } from './components/EntriesTable';

export default function P2PPhPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Stats Cards */}
      <StatsCards />

      {/* Entries Table */}
      <EntriesTable />
    </div>
  );
}
