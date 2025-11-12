import React from 'react';

interface InvitationTabsProps {
  activeTab: 'all' | 'pending' | 'accepted' | 'rejected';
  onTabChange: (tab: 'all' | 'pending' | 'accepted' | 'rejected') => void;
  counts: {
    all: number;
    pending: number;
    accepted: number;
    rejected: number;
  };
}

export default function InvitationTabs({ activeTab, onTabChange, counts }: InvitationTabsProps) {
  const tabs = [
    { key: 'all' as const, label: 'Semua', count: counts.all },
    { key: 'pending' as const, label: 'Pending', count: counts.pending },
    { key: 'accepted' as const, label: 'Diterima', count: counts.accepted },
    { key: 'rejected' as const, label: 'Ditolak', count: counts.rejected },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
              ${
                activeTab === tab.key
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }
            `}
          >
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`
                  ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${
                    activeTab === tab.key
                      ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }
                `}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
