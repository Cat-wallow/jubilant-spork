'use client';

interface PageHeaderProps {
  sptId: string;
  title: string;
  period: string;
}

export function PageHeader({ sptId, title, period }: PageHeaderProps) {
  return (
    <div className="border-b bg-white pb-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">SPT ID: {sptId}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-600">{period}</p>
        </div>
      </div>
    </div>
  );
}
