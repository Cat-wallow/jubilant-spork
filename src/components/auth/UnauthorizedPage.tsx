'use client';

import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-4 pt-40 text-center dark:bg-navy-900">
      <div className="mb-4 text-red-500">
        <ShieldAlert className="h-16 w-16" />
      </div>
      <h1 className="text-3xl font-bold text-navy-700 dark:text-white">Akses Ditolak</h1>
      <p className="mt-2 max-w-md text-base text-gray-600 dark:text-gray-400">
        Maaf, Anda tidak memiliki izin yang diperlukan untuk mengakses halaman ini.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.back()}
          className="rounded-lg bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600"
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  );
}
