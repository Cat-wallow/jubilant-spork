'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useInvitations,
  useInvitationCounts,
  useVerifyInvitationToken,
} from '@/hooks/useInvitations';
import InvitationCard from './components/InvitationCard';
import InvitationTabs from './components/InvitationTabs';
import { InvitationStatus } from '@/types/invitation';

export default function InvitationsPage() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams?.get('token');

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Verify token if present in URL
  const { data: tokenVerification } = useVerifyInvitationToken(tokenFromUrl);

  // Fetch invitations
  const { data, isLoading, error, refetch } = useInvitations({
    status: activeTab,
    page,
    limit,
  });

  // Fetch counts for tabs
  const { data: counts } = useInvitationCounts();

  // Auto-select pending tab if token is valid
  useEffect(() => {
    if (tokenVerification?.valid && activeTab === 'all') {
      setActiveTab('pending');
    }
  }, [tokenVerification, activeTab]);

  if (isLoading) {
    return (
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-brand-500"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading invitations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3 flex h-full w-full items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-500">Failed to load invitations</p>
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const invitations = data?.invitations || [];
  const pagination = data?.pagination;
  const tabCounts = counts || data?.counts || { all: 0, pending: 0, accepted: 0, rejected: 0 };

  return (
    <div className="mt-3 h-full w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-navy-700 dark:text-white"></h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          Kelola undangan untuk bergabung dengan tenant
        </p>
      </div>

      {/* Token Verification Alert */}
      {tokenFromUrl && tokenVerification && (
        <div
          className={`mb-6 rounded-lg p-4 ${
            tokenVerification.valid
              ? 'border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
              : 'border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
          }`}
        >
          <p
            className={`text-sm ${
              tokenVerification.valid
                ? 'text-green-800 dark:text-green-200'
                : 'text-red-800 dark:text-red-200'
            }`}
          >
            {tokenVerification.valid
              ? '✅ Undangan valid! Silakan terima atau tolak undangan di bawah.'
              : `❌ ${
                  tokenVerification.message || 'Token undangan tidak valid atau sudah kadaluarsa.'
                }`}
          </p>
        </div>
      )}

      {/* Tabs */}
      <InvitationTabs activeTab={activeTab} onTabChange={setActiveTab} counts={tabCounts} />

      {/* Invitations List */}
      <div className="mt-6">
        {invitations.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-card p-12 text-center dark:border-gray-700 dark:bg-navy-800">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-navy-700 dark:text-white">
              Tidak ada undangan
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {activeTab === 'all'
                ? 'Anda belum memiliki undangan'
                : `Tidak ada undangan dengan status "${activeTab}"`}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {invitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                onSuccess={() => refetch()}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, pagination.total)} of{' '}
            {pagination.total} invitations
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
