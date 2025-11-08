'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement forgot password API call
    router.push('/auth/verify-email');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8">
      <div className="flex w-full max-w-[510px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white px-6 py-12 shadow-[0_4px_8.3px_0_rgba(0,0,0,0.25)] sm:px-[50px] sm:py-[50px]">
        {/* Lock Icon */}
        <svg
          className="h-[72px] w-[72px]"
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36 6C39.9782 6 43.7936 7.58035 46.6066 10.3934C49.4196 13.2064 51 17.0218 51 21V30C53.3869 30 55.6761 30.9482 57.364 32.636C59.0518 34.3239 60 36.6131 60 39V57C60 59.3869 59.0518 61.6761 57.364 63.364C55.6761 65.0518 53.3869 66 51 66H21C18.6131 66 16.3239 65.0518 14.636 63.364C12.9482 61.6761 12 59.3869 12 57V39C12 36.6131 12.9482 34.3239 14.636 32.636C16.3239 30.9482 18.6131 30 21 30V21C21 17.0218 22.5804 13.2064 25.3934 10.3934C28.2064 7.58035 32.0218 6 36 6ZM36 42C34.4863 41.9995 33.0283 42.5712 31.9184 43.6005C30.8084 44.6298 30.1285 46.0405 30.015 47.55L30 48C30 49.1867 30.3519 50.3467 31.0112 51.3334C31.6705 52.3201 32.6075 53.0892 33.7039 53.5433C34.8003 53.9974 36.0067 54.1162 37.1705 53.8847C38.3344 53.6532 39.4035 53.0818 40.2426 52.2426C41.0818 51.4035 41.6532 50.3344 41.8847 49.1705C42.1162 48.0067 41.9974 46.8003 41.5433 45.7039C41.0892 44.6075 40.3201 43.6705 39.3334 43.0112C38.3467 42.3519 37.1867 42 36 42ZM36 12C33.6131 12 31.3239 12.9482 29.636 14.636C27.9482 16.3239 27 18.6131 27 21V30H45V21C45 18.6131 44.0518 16.3239 42.364 14.636C40.6761 12.9482 38.3869 12 36 12Z"
            fill="#332687"
          />
        </svg>

        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-dm text-2xl font-bold leading-[56px] tracking-[-0.48px] text-[rgba(30,30,30,1)]">
            Lupa kata sandi?
          </h1>
          <p className="text-center font-dm text-base font-normal leading-[150%] tracking-[-0.32px] text-[#404040]">
            Masukkan alamat email dan kami akan kirimkan link untuk mereset kata sandi
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col items-start gap-[15px]">
          {/* Email Field */}
          <div className="relative w-full">
            <label
              htmlFor="email"
              className="mb-[13px] block font-dm text-sm font-medium leading-[100%] tracking-[-0.28px] text-[rgba(30,30,30,1)]"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@simmmple.com"
              className="h-[50px] w-full rounded-2xl border border-[#E0E5F2] px-6 font-dm text-sm font-normal leading-[100%] tracking-[-0.28px] text-[#404040] placeholder:text-[#404040] focus:border-[#332687] focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#332687] px-2 py-2.5 font-dm text-sm font-bold leading-[100%] tracking-[-0.28px] text-white transition-colors hover:bg-[#422AFB]"
          >
            Kirim tautan reset
          </button>
        </form>

        {/* Back to Login */}
        <button
          onClick={() => router.push('/auth/login')}
          className="flex items-center gap-1 font-dm text-sm font-semibold leading-[22px] text-[#212B36] transition-colors hover:text-[#332687]"
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
              d="M9.21978 12.6667C9.01806 12.6674 8.82687 12.5767 8.69978 12.42L5.47978 8.42004C5.27757 8.17404 5.27757 7.81937 5.47978 7.57337L8.81312 3.57337C9.04876 3.28986 9.46961 3.25106 9.75312 3.4867C10.0366 3.72234 10.0754 4.1432 9.83978 4.4267L6.85978 8.00004L9.73978 11.5734C9.90625 11.7732 9.94132 12.0516 9.82961 12.2864C9.71791 12.5213 9.47983 12.6697 9.21978 12.6667Z"
              fill="currentColor"
            />
          </svg>
          Kembali ke halaman masuk
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#332687]">
        © 2025 EasyTax , Made by Surya Microsystems
      </div>
    </div>
  );
}
