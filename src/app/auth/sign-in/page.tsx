'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLogin } from 'hooks/useAuth';
import { LoginValidator, LoginFormInputs } from 'validators/login.validator';

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      keepLoggedIn: true,
    },
  });

  const keepLoggedIn = watch('keepLoggedIn');

  const handleLogin = (data: LoginFormInputs) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
      rememberMe: data.keepLoggedIn,
    });
  };

  return (
    <div className="flex max-h-screen min-h-screen flex-col overflow-hidden bg-white">
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex flex-1 flex-col items-center justify-end px-6 py-12 lg:px-12">
          <div className="flex w-full max-w-[410px] flex-col gap-[30px]">
            <div className="space-y-4">
              <h1 className="text-[36px] font-bold leading-[56px] tracking-[-0.72px] text-[#1E1E1E]">
                Login
              </h1>
              <p className="text-base leading-none tracking-[-0.32px] text-[#404040]">
                Masukan email dan password
              </p>
            </div>

            {loginMutation.error && (
              <p className="rounded-lg bg-red-100 p-3 text-sm text-red-500">
                {loginMutation.error.message}
              </p>
            )}

            <form
              className="flex flex-col gap-[30px]"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="space-y-[27px]">
                <div>
                  <label className="mb-2 block text-sm font-medium leading-none tracking-[-0.28px] text-[#1E1E1E]">
                    Email*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Email/Username/Phone Number"
                      {...register('email')}
                      className={`h-[50px] w-full rounded-2xl border px-6 text-sm focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-[#E0E5F2] focus:ring-[#332687]'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium leading-none tracking-[-0.28px] text-[#1E1E1E]">
                    Kata sandi*
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      {...register('password')}
                      className={`h-[50px] w-full rounded-2xl border px-6 pr-14 text-sm focus:outline-none focus:ring-2 ${
                        errors.password
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-[#E0E5F2] focus:ring-[#332687]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A3AED0] transition-colors hover:text-[#332687]"
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-[11px]">
                  <input
                    type="checkbox"
                    {...register('keepLoggedIn')}
                    className="sr-only"
                  />
                  <div
                    className={`flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-sm border transition-colors ${
                      keepLoggedIn
                        ? 'border-[#332687] bg-[#332687]'
                        : 'border-[#E0E5F2] bg-white'
                    }`}
                  >
                    {keepLoggedIn && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6.66662 10.1145L12.7946 3.98584L13.738 4.92851L6.66662 11.9998L2.42395 7.75717L3.36662 6.81451L6.66662 10.1145Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm leading-5 tracking-[-0.28px] text-[#1E1E1E]">
                    Buat saya tetap login
                  </span>
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium leading-5 tracking-[-0.28px] text-[#1E1E1E] transition-colors hover:text-[#332687]"
                >
                  Lupa kata sandi?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="h-[54px] w-full rounded-2xl bg-[#332687] text-sm font-bold leading-none tracking-[-0.28px] text-white transition-colors hover:bg-[#2a1f6f] disabled:bg-gray-400"
              >
                {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
          <footer className="mt-10 py-20 text-center">
            <p className="text-sm font-medium leading-6 tracking-[-0.28px] text-[#332687]">
              © 2025 EasyTax , Made by Surya Microsystems
            </p>
          </footer>
        </div>

        <div className="relative hidden flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-[#6B5DD3] via-[#8B7AE6] to-[#4A3FA8] bg-cover bg-center bg-no-repeat lg:flex">
          <Image
            width={80}
            height={80}
            src="/img/auth/auth.png"
            alt="Tax illustration"
            className="relative z-10 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
