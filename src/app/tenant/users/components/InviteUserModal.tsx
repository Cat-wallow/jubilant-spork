'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useInviteUser } from 'hooks/useTenantUsers';

interface InviteUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ROLES = [
  { id: 'admin_tenant', name: 'Admin Tenant' },
  { id: 'wajib_pajak', name: 'Wajib Pajak / WP' },
  { id: 'anggota_tim', name: 'Anggota Tim' },
  { id: 'ketua_tim', name: 'Ketua Tim' },
  { id: 'pmo', name: 'PMO (Project Manager)' },
  { id: 'direktur', name: 'Direktur' },
];

export default function InviteUserModal({ onClose, onSuccess }: InviteUserModalProps) {
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');
  const inviteMutation = useInviteUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await inviteMutation.mutateAsync({ email, role_id: roleId });
      onSuccess();
    } catch (error) {
      console.error('Failed to invite user:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-navy-800">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy-700 dark:text-white">
            Undang User Baru
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-navy-700"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Error Message */}
        {inviteMutation.error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {(inviteMutation.error as any)?.response?.data?.message ||
              'Gagal mengirim undangan. Silakan coba lagi.'}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-navy-700 dark:text-white">
              Email*
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="user@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-navy-700 dark:text-white">
              Role*
            </label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            >
              <option value="">Pilih role...</option>
              {ROLES.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-navy-700"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={inviteMutation.isPending}
              className="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
            >
              {inviteMutation.isPending ? 'Mengirim...' : 'Kirim Undangan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
