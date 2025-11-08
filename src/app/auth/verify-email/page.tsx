'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(50);
      // TODO: Implement resend email API call
    }
  };

  const handleDemoClick = () => {
    // Demo: Simulate clicking the email link
    router.push('/auth/new-password');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8">
      <div className="flex w-full max-w-[510px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white px-6 py-12 shadow-[0_4px_8.3px_0_rgba(0,0,0,0.25)] sm:px-[50px] sm:py-[50px]">
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
            fill="#332687"
          />
        </svg>

        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-dm text-2xl font-normal leading-[56px] tracking-[-0.48px] text-[rgba(30,30,30,1)]">
            Periksa email masuk!
          </h1>
          <p className="text-center font-dm text-base font-normal leading-[150%] tracking-[-0.32px] text-[#404040]">
            Tautan verifikasi telah dikirim
          </p>
        </div>

        {/* Instructions & Demo Section */}
        <div className="flex w-full flex-col items-start gap-[15px]">
          {/* Instructions Box */}
          <div className="flex w-full items-center justify-center gap-2.5 rounded-[15px] border border-[#D9D9D9] p-[15px]">
            <p className="flex-1 font-dm text-sm font-normal leading-[150%] tracking-[-0.28px] text-[#8C8C8C]">
              Periksa kotak masuk Anda dan klik tautan untuk mengatur ulang kata sandi. Jika tidak
              menerima email dalam 60 detik, kirim ulang email verifikasi.
            </p>
          </div>

          {/* Demo Box */}
          <div className="flex w-full flex-col items-center justify-center gap-2.5 rounded-[15px] border border-[#D9D9D9] bg-[#EFF6FF] p-[15px]">
            <p className="w-full font-dm text-sm font-bold leading-[150%] tracking-[-0.28px] text-[#8C8C8C]">
              Demo: simulasi email reset password
            </p>
            <button
              onClick={handleDemoClick}
              className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl border border-[#D9D9D9] bg-[#F8FAFC] px-2 py-2.5 font-dm text-sm font-bold leading-[100%] tracking-[-0.28px] text-[#1578FC] transition-colors hover:bg-[#EFF6FF]"
            >
              Klik tautan reset kata sandi (Demo)
            </button>
          </div>

          {/* Resend Button */}
          <div className="relative h-[54px] w-full">
            <button
              onClick={handleResend}
              disabled={countdown > 0}
              className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#D9D9D9] px-2 py-2.5 font-dm text-sm font-bold leading-[100%] tracking-[-0.28px] text-[#8C8C8C] transition-colors disabled:cursor-not-allowed enabled:bg-[#332687] enabled:text-white enabled:hover:bg-[#422AFB]"
            >
              {countdown > 0 ? `Kirim ulang (${countdown}s)` : 'Kirim ulang'}
            </button>
          </div>
        </div>

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
              d="M9.21978 12.6662C9.01806 12.6669 8.82687 12.5762 8.69978 12.4195L5.47978 8.41955C5.27757 8.17355 5.27757 7.81888 5.47978 7.57288L8.81312 3.57288C9.04876 3.28938 9.46961 3.25057 9.75312 3.48621C10.0366 3.72186 10.0754 4.14271 9.83978 4.42621L6.85978 7.99955L9.73978 11.5729C9.90625 11.7727 9.94132 12.0511 9.82961 12.2859C9.71791 12.5208 9.47983 12.6693 9.21978 12.6662Z"
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
