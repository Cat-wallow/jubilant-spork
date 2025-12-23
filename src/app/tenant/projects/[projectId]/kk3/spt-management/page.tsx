import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import mockData from './mockData.json';
import { StatsCards } from './components/StatsCards';
import { SPTTable } from './components/SPTTable';
import { TableToolbar } from './components/TableToolbar';

export default function SPTManagementPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <StatsCards stats={mockData.stats} />

      {/* Daftar SPT Section */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Daftar SPT</h2>
            <p className="mt-1 text-sm text-gray-600">Daftar SPT di dalam Project</p>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Buat SPT Manual
          </Button>
        </div>

        {/* Toolbar with Search and Filters */}
        <div className="mb-6">
          <TableToolbar />
        </div>

        {/* SPT Table */}
        <SPTTable data={mockData.sptList} />
      </Card>
    </div>
  );
}
