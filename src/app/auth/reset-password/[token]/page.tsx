'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { resetPassword } from '../../../../lib/api';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Password tidak cocok.');
      return;
    }
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const response = await resetPassword({
        token,
        password,
        confirmPassword,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8 dark:bg-navy-900">
      <div className="flex w-full max-w-[450px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white px-8 py-12 shadow-[0_4px_8.3px_0_rgba(0,0,0,0.25)] dark:bg-navy-800 dark:shadow-[0_4px_8.3px_0_rgba(0,0,0,0.5)] sm:px-[50px] sm:py-[50px]">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-dm text-xl font-bold leading-[56px] tracking-[-0.48px] text-navy-700 dark:text-white">
            Reset Kata Sandi
          </h1>
          <p className="text-center font-dm text-sm font-normal leading-[150%] tracking-[-0.32px] text-gray-700 dark:text-gray-400">
            Masukkan kata sandi baru Anda di bawah ini.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col items-start gap-[15px]">
          {/* Password Field */}
          <div className="relative w-full">
            <label
              htmlFor="password"
              className="mb-[13px] block font-dm text-sm font-medium leading-[100%] tracking-[-0.28px] text-navy-700 dark:text-white"
            >
              Kata Sandi Baru*
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="h-[50px] w-full rounded-2xl border border-gray-300 px-6 font-dm text-sm font-normal leading-[100%] tracking-[-0.28px] text-gray-700 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none dark:border-white/30 dark:bg-navy-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-brand-400"
              required
              disabled={loading || !!message}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="relative w-full">
            <label
              htmlFor="confirmPassword"
              className="mb-[13px] block font-dm text-sm font-medium leading-[100%] tracking-[-0.28px] text-navy-700 dark:text-white"
            >
              Konfirmasi Kata Sandi Baru*
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="h-[50px] w-full rounded-2xl border border-gray-300 px-6 font-dm text-sm font-normal leading-[100%] tracking-[-0.28px] text-gray-700 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none dark:border-white/30 dark:bg-navy-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-brand-400"
              required
              disabled={loading || !!message}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-500 px-2 py-2.5 font-dm text-sm font-bold leading-[100%] tracking-[-0.28px] text-white transition-colors hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-500"
            disabled={loading || !!message}
          >
            {loading ? 'Menyimpan...' : 'Reset Kata Sandi'}
          </button>
        </form>

        {/* Messages */}
        {message && <div className="text-center font-dm text-sm text-green-500">{message}</div>}
        {error && <div className="text-center font-dm text-sm text-red-500">{error}</div>}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-brand-500 dark:text-brand-400">
        © 2025 EasyTax , Made by Surya Microsystems
      </div>
    </div>
  );
}
