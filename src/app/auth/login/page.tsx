'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login API call
    console.log('Login:', { email, password });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8">
      <div className="flex w-full max-w-[510px] flex-col items-center justify-center gap-[30px] rounded-[20px] bg-white px-6 py-12 shadow-[0_4px_8.3px_0_rgba(0,0,0,0.25)] sm:px-[50px] sm:py-[50px]">
        {/* Logo/Icon */}
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#332687]">
          <span className="font-dm text-3xl font-bold text-white">ET</span>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-dm text-2xl font-bold leading-[56px] tracking-[-0.48px] text-[rgba(30,30,30,1)]">
            Masuk ke EasyTax
          </h1>
          <p className="text-center font-dm text-base font-normal leading-[150%] tracking-[-0.32px] text-[#404040]">
            Selamat datang kembali! Silakan masukkan detail Anda
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

          {/* Password Field */}
          <div className="relative w-full">
            <label
              htmlFor="password"
              className="mb-[13px] block font-dm text-sm font-medium leading-[100%] tracking-[-0.28px] text-[rgba(30,30,30,1)]"
            >
              Kata Sandi*
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="h-[50px] w-full rounded-2xl border border-[#E0E5F2] px-6 pr-12 font-dm text-sm font-normal leading-[100%] tracking-[-0.28px] text-[#404040] placeholder:text-[#404040] focus:border-[#332687] focus:outline-none"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A3AED0] hover:text-[#332687]"
              >
                <svg
                  className="h-5 w-5"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0002 5.41667C13.1585 5.41667 15.9752 7.19167 17.3502 10C15.9752 12.8083 13.1668 14.5833 10.0002 14.5833C6.8335 14.5833 4.02516 12.8083 2.65016 10C4.02516 7.19167 6.84183 5.41667 10.0002 5.41667ZM10.0002 3.75C5.8335 3.75 2.27516 6.34167 0.833496 10C2.27516 13.6583 5.8335 16.25 10.0002 16.25C14.1668 16.25 17.7252 13.6583 19.1668 10C17.7252 6.34167 14.1668 3.75 10.0002 3.75ZM10.0002 7.91667C11.1502 7.91667 12.0835 8.85 12.0835 10C12.0835 11.15 11.1502 12.0833 10.0002 12.0833C8.85016 12.0833 7.91683 11.15 7.91683 10C7.91683 8.85 8.85016 7.91667 10.0002 7.91667ZM10.0002 6.25C7.9335 6.25 6.25016 7.93333 6.25016 10C6.25016 12.0667 7.9335 13.75 10.0002 13.75C12.0668 13.75 13.7502 12.0667 13.7502 10C13.7502 7.93333 12.0668 6.25 10.0002 6.25Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <button
            type="button"
            onClick={() => router.push('/auth/forgot-password')}
            className="self-end font-dm text-sm font-semibold text-[#332687] transition-colors hover:text-[#422AFB]"
          >
            Lupa kata sandi?
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#332687] px-2 py-2.5 font-dm text-sm font-bold leading-[100%] tracking-[-0.28px] text-white transition-colors hover:bg-[#422AFB]"
          >
            Masuk
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 font-dm text-sm font-medium leading-6 tracking-[-0.28px] text-[#332687]">
        © 2025 EasyTax , Made by Surya Microsystems
      </div>
    </div>
  );
}
