'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2, Mail, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const acceptInvitation = async () => {
    try {
      setStatus('loading');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invitations/accept-by-token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setMessage(result.data.message);

        // Check if it's a new user (message contains "Kredensial")
        setIsNewUser(result.data.message.includes('Kredensial'));

        // Redirect to login after 7 seconds
        setTimeout(() => {
          router.push('/auth/sign-in');
        }, 7000);
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

  const title =
    status === 'success'
      ? 'Undangan Diterima'
      : status === 'error'
        ? 'Gagal Menerima Undangan'
        : 'Memproses Undangan';

  const subtitle =
    status === 'loading'
      ? 'Kami sedang memproses undangan kamu. Mohon tunggu sebentar.'
      : 'Hasil penerimaan undangan ke EasyTax.';

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-8 dark:bg-navy-900">
      <Card className="w-full max-w-[450px] space-y-[30px] rounded-[20px] p-8 shadow-xl sm:p-[50px]">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-bold leading-[56px] tracking-[-0.48px] text-navy-700 dark:text-white">
            {title}
          </h1>
          <p className="text-sm font-normal leading-[150%] tracking-[-0.32px] text-gray-700 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Content */}
        {status === 'loading' && (
          <div className="flex flex-col items-center text-center">
            <Loader2 className="h-12 w-12 animate-spin text-brand-500" />
            <h2 className="mt-4 text-lg font-semibold text-navy-700 dark:text-white">
              Memproses undangan...
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Mohon tunggu sebentar, kami sedang memvalidasi token undangan kamu.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-navy-700 dark:text-white">
              🎉 Berhasil!
            </h2>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{message}</p>

            {isNewUser && (
              <div className="mt-6 w-full rounded-lg bg-blue-50 p-4 text-left">
                <div className="flex items-start space-x-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">Cek email kamu</p>
                    <p className="mt-1 text-xs text-blue-700">
                      Kami sudah mengirimkan kredensial login ke email kamu. Periksa inbox atau
                      folder spam.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 w-full space-y-3">
              <Button
                type="button"
                onClick={() => router.push('/auth/sign-in')}
                className="h-[54px] w-full rounded-2xl text-sm font-bold leading-[100%] tracking-[-0.28px]"
              >
                Login Sekarang
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Kamu akan diarahkan otomatis dalam 7 detik...
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{message}</p>

            <div className="mt-6 flex w-full flex-col gap-3">
              <Button
                type="button"
                onClick={() => window.location.reload()}
                className="h-[50px] w-full rounded-2xl text-sm font-bold leading-[100%] tracking-[-0.28px]"
              >
                Coba Lagi
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/auth/sign-in')}
                className="h-[50px] w-full rounded-2xl text-sm font-bold leading-[100%] tracking-[-0.28px]"
              >
                Kembali ke Login
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Footer */}
      <div className="absolute bottom-8 text-center text-sm font-medium leading-6 tracking-[-0.28px] text-brand-500 dark:text-brand-400">
        © {new Date().getFullYear()} EasyTax , Made by Surya Microsystems
      </div>
    </div>
  );
}
