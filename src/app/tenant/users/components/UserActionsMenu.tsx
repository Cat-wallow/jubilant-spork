'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, UserX, UserCheck } from 'lucide-react';
import { useUpdateUserRole, useDeactivateUser, useReactivateUser } from 'hooks/useTenantUsers';
import { useAuth } from 'contexts/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

interface UserActionsMenuProps {
  tenantId: string;
  user: User;
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

export default function UserActionsMenu({ tenantId, user, onSuccess }: UserActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { permissions } = useAuth();
  const updateRoleMutation = useUpdateUserRole(tenantId);
  const deactivateMutation = useDeactivateUser(tenantId);
  const reactivateMutation = useReactivateUser(tenantId);

  const canManage = permissions.includes('tenant:user_manage');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleStatus = async () => {
    try {
      if (user.status === 'active') {
        setShowDeactivateModal(true);
      } else {
        await reactivateMutation.mutateAsync(user.id);
        onSuccess();
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-navy-700"
      >
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-navy-800">
          <div className="py-1">
            {canManage && (
              <button
                onClick={() => {
                  setShowRoleModal(true);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-navy-700"
              >
                <Edit className="h-4 w-4" />
                Ubah Role
              </button>
            )}
            {canManage && (
              <button
                onClick={handleToggleStatus}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-navy-700"
              >
                {user.status === 'active' ? (
                  <>
                    <UserX className="h-4 w-4" />
                    Nonaktifkan
                  </>
                ) : (
                  <>
                    <UserCheck className="h-4 w-4" />
                    Aktifkan
                  </>
                )}
              </button>
            )}
            {!canManage && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No actions available
              </div>
            )}
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {showRoleModal && (
        <ChangeRoleModal
          tenantId={tenantId}
          user={user}
          onClose={() => setShowRoleModal(false)}
          onSuccess={() => {
            setShowRoleModal(false);
            onSuccess();
          }}
        />
      )}

      {/* Deactivate Confirmation Modal */}
      {showDeactivateModal && (
        <DeactivateModal
          tenantId={tenantId}
          user={user}
          onClose={() => setShowDeactivateModal(false)}
          onSuccess={() => {
            setShowDeactivateModal(false);
            onSuccess();
          }}
        />
      )}
    </div>
  );
}

// Change Role Modal Component
function ChangeRoleModal({ tenantId, user, onClose, onSuccess }: { tenantId: string; user: User; onClose: () => void; onSuccess: () => void }) {
  const [roleId, setRoleId] = useState('');
  const updateRoleMutation = useUpdateUserRole(tenantId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateRoleMutation.mutateAsync({ userId: user.id, roleId });
      onSuccess();
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-navy-800">
        <h3 className="mb-4 text-lg font-bold text-navy-700 dark:text-white">
          Ubah Role User
        </h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Mengubah role untuk: <strong>{user.name || user.email}</strong>
        </p>

        {updateRoleMutation.error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            Gagal mengubah role. Silakan coba lagi.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-navy-700 dark:text-white">
              Role Baru*
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

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-navy-700"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={updateRoleMutation.isPending}
              className="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
            >
              {updateRoleMutation.isPending ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Deactivate Confirmation Modal Component
function DeactivateModal({ tenantId, user, onClose, onSuccess }: { tenantId: string; user: User; onClose: () => void; onSuccess: () => void }) {
  const [reason, setReason] = useState('');
  const deactivateMutation = useDeactivateUser(tenantId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await deactivateMutation.mutateAsync({ userId: user.id, reason });
      onSuccess();
    } catch (error) {
      console.error('Failed to deactivate user:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-navy-800">
        <h3 className="mb-4 text-lg font-bold text-navy-700 dark:text-white">
          Nonaktifkan User
        </h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Apakah Anda yakin ingin menonaktifkan: <strong>{user.name || user.email}</strong>?
        </p>

        {deactivateMutation.error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            Gagal menonaktifkan user. Silakan coba lagi.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-navy-700 dark:text-white">
              Alasan (opsional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Masukkan alasan menonaktifkan user..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-navy-900 dark:text-white"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-navy-700"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={deactivateMutation.isPending}
              className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
            >
              {deactivateMutation.isPending ? 'Menonaktifkan...' : 'Nonaktifkan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
