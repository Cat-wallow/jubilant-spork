'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token undangan tidak ditemukan. Silakan periksa link di email Anda.');
      return;
    }

    acceptInvitation();
  }, [token]);

  const acceptInvitation = async () => {
    try {
      setStatus('loading');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/invitations/accept-by-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setMessage(result.data.message);
        
        // Check if it's a new user (message contains "Kredensial")
        setIsNewUser(result.data.message.includes('Kredensial'));

        // Redirect to login after 5 seconds
        setTimeout(() => {
          router.push('/auth/sign-in');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(result.message || 'Gagal menerima undangan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error accepting invitation:', error);
      setStatus('error');
      setMessage('Terjadi kesalahan. Silakan coba lagi nanti.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          {/* Logo/Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-navy-700">EasyTax</h1>
            <p className="mt-2 text-sm text-gray-600">Tax Management Platform</p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {status === 'loading' && (
              <div className="text-center">
                <Loader2 className="mx-auto h-16 w-16 animate-spin text-brand-500" />
                <h2 className="mt-4 text-xl font-semibold text-navy-700">
                  Memproses Undangan...
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Mohon tunggu sebentar
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-navy-700">
                  🎉 Berhasil!
                </h2>
                <p className="mt-3 text-sm text-gray-700">
                  {message}
                </p>

                {isNewUser && (
                  <div className="mt-6 rounded-lg bg-blue-50 p-4 text-left">
                    <div className="flex items-start space-x-3">
                      <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900">
                          Cek Email Anda
                        </p>
                        <p className="mt-1 text-xs text-blue-700">
                          Kami telah mengirimkan kredensial login ke email Anda. 
                          Periksa inbox atau folder spam.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => router.push('/auth/sign-in')}
                    className="w-full rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
                  >
                    Login Sekarang
                  </button>
                  <p className="text-xs text-gray-500">
                    Anda akan diarahkan otomatis dalam 5 detik...
                  </p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <XCircle className="h-10 w-10 text-red-600" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-navy-700">
                  Gagal Menerima Undangan
                </h2>
                <p className="mt-3 text-sm text-gray-700">
                  {message}
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
                  >
                    Coba Lagi
                  </button>
                  <button
                    onClick={() => router.push('/auth/sign-in')}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Kembali ke Login
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-gray-200 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} EasyTax. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
