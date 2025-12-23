'use client';

import { FileText, CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';

interface StatCard {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: string;
  bgColor: string;
}

interface StatsData {
  totalInvoice: StatCard;
  paid: StatCard;
  paidAmount: StatCard;
  unpaidAmount: StatCard;
  overdue: StatCard;
}

interface StatsCardsProps {
  stats: StatsData;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'invoice':
        return <FileText className="h-7 w-7 text-purple-700" />;
      case 'fileDone':
        return <CheckCircle className="h-7 w-7 text-purple-700" />;
      case 'check':
        return <Circle className="h-7 w-7 text-purple-700" />;
      case 'progress':
        return <Clock className="h-7 w-7 text-purple-700" />;
      case 'warning':
        return <AlertCircle className="h-7 w-7 text-purple-700" />;
      default:
        return <FileText className="h-7 w-7 text-purple-700" />;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
      {/* Total Invoice */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className={`rounded-full ${stats.totalInvoice.bgColor} p-4`}>
          {getIcon(stats.totalInvoice.icon)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-500">{stats.totalInvoice.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalInvoice.value}</p>
          <p className="text-xs text-gray-500">{stats.totalInvoice.sublabel}</p>
        </div>
      </div>

      {/* Paid */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className={`rounded-full ${stats.paid.bgColor} p-4`}>
          {getIcon(stats.paid.icon)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-500">{stats.paid.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.paid.value}</p>
          <p className="text-xs text-gray-500">
            <span className="font-bold text-green-600">{stats.paid.sublabel}</span>
          </p>
        </div>
      </div>

      {/* Paid Amount */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className={`rounded-full ${stats.paidAmount.bgColor} p-4`}>
          {getIcon(stats.paidAmount.icon)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-500">{stats.paidAmount.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.paidAmount.value}</p>
        </div>
      </div>

      {/* Unpaid Amount */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className={`rounded-full ${stats.unpaidAmount.bgColor} p-4`}>
          {getIcon(stats.unpaidAmount.icon)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-500">{stats.unpaidAmount.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.unpaidAmount.value}</p>
        </div>
      </div>

      {/* Overdue */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className={`rounded-full ${stats.overdue.bgColor} p-4`}>
          {getIcon(stats.overdue.icon)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-500">{stats.overdue.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.overdue.value}</p>
        </div>
      </div>
    </div>
  );
}
