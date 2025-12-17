import { StatsCards } from './components/StatsCards';
import { VoucherTable } from './components/VoucherTable';

export default function KK2VoucherPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      <StatsCards />
      <VoucherTable />
    </div>
  );
}
