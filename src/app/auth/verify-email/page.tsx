'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { forgotPassword } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown === 0 && email) {
      setIsResending(true);
      setResendMessage('');
      try {
        await forgotPassword(email);
        setResendMessage('Tautan baru telah berhasil dikirim.');
      } catch (error) {
        setResendMessage('Gagal mengirim ulang tautan. Coba lagi nanti.');
      } finally {
        setIsResending(false);
        setCountdown(60);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <Card className="flex w-full max-w-[450px] flex-col items-center justify-center gap-5 rounded-[20px] p-6 shadow-xl sm:p-[50px]">
        {/* Mail Icon */}
        <svg
          className="h-[72px] w-[72px]"
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 60C10.35 60 8.938 59.413 7.764 58.239C6.59 57.065 6.002 55.652 6 54V18C6 16.35 6.588 14.938 7.764 13.764C8.94 12.59 10.352 12.002 12 12H60C61.65 12 63.063 12.588 64.239 13.764C65.415 14.94 66.002 16.352 66 18V54C66 55.65 65.413 57.063 64.239 58.239C63.065 59.415 61.652 60.002 60 60H12ZM36 38.475C36.25 38.475 36.513 38.437 36.789 38.361C37.065 38.285 37.327 38.173 37.575 38.025L58.8 24.75C59.2 24.5 59.5 24.188 59.7 23.814C59.9 23.44 60 23.027 60 22.575C60 21.575 59.575 20.825 58.725 20.325C57.875 19.825 57 19.85 56.1 20.4L36 33L15.9 20.4C15 19.85 14.125 19.838 13.275 20.364C12.425 20.89 12 21.627 12 22.575C12 23.075 12.1 23.513 12.3 23.889C12.5 24.265 12.8 24.552 13.2 24.75L34.425 38.025C34.675 38.175 34.938 38.288 35.214 38.364C35.49 38.44 35.752 38.477 36 38.475Z"
            className="fill-brand-500 dark:fill-brand-400"
          />
        </svg>

        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-xl leading-[56px] tracking-[-0.48px] text-navy-700 dark:text-white">
            Periksa email masuk!
          </h1>
          <p className="text-sm leading-[150%] tracking-[-0.32px] text-gray-700 dark:text-gray-400">
            Tautan verifikasi telah dikirim ke{' '}
            <span className="font-medium text-navy-700 dark:text-white">
              {email || 'email Anda'}
            </span>
          </p>
        </div>

        {/* Instructions Box */}
        <div className="w-full rounded-[15px] border border-gray-300 p-[15px] dark:border-white/30">
          <p className="text-sm leading-[150%] text-gray-600 dark:text-gray-400">
            Periksa kotak masuk Anda dan klik tautan untuk mengatur ulang kata sandi. Jika tidak
            menerima email dalam 60 detik, kirim ulang email verifikasi.
          </p>
        </div>

        {/* Resend Button */}
        <Button
          onClick={handleResend}
          disabled={countdown > 0 || isResending}
          variant={countdown > 0 ? 'outline' : 'default'}
          className="h-[54px] w-full rounded-2xl text-sm font-bold leading-[100%] tracking-[-0.28px]"
        >
          {isResending
            ? 'Mengirim ulang...'
            : countdown > 0
              ? `Kirim ulang (${countdown}s)`
              : 'Kirim ulang'}
        </Button>

        {/* Resend Message */}
        {resendMessage && (
          <p
            className={`text-center text-sm ${
              resendMessage.includes('berhasil') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {resendMessage}
          </p>
        )}

        {/* Back to Login */}
        <button
          onClick={() => router.push('/auth/sign-in')}
          className="flex items-center gap-1 text-sm font-semibold leading-[22px] text-navy-700 transition-colors hover:text-brand-500 dark:text-gray-300 dark:hover:text-brand-400"
        >
          <svg
            className="h-4 w-4"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.21978 12.6662C9.01806 12.6669 8.82687 12.5762 8.69978 12.4195L5.47978 8.41955C5.27757 8.17355 5.27757 7.81888 5.47978 7.57288L8.81312 3.57288C9.04876 3.28938 9.46961 3.25057 9.75312 3.48621C10.0366 3.72186 10.0754 4.14271 9.83978 4.42621L6.85978 7.99955L9.73978 11.5729C9.90625 11.7727 9.94132 12.0511 9.82961 12.2859C9.71791 12.5208 9.47983 12.6693 9.21978 12.6662Z"
              fill="currentColor"
            />
          </svg>
          Kembali ke halaman masuk
        </button>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-8 text-center text-sm font-medium leading-6 tracking-[-0.28px] text-brand-500 dark:text-brand-400">
        © 2025 EasyTax , Made by Surya Microsystems
      </div>
    </div>
  );
}
