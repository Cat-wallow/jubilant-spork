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
    <div className="min-h-screen bg-white flex flex-col overflow-hidden max-h-screen">
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 flex items-center justify-end flex-col px-6 py-12 lg:px-12">
          <div className="w-full max-w-[410px] flex flex-col gap-[30px]">
            <div className="space-y-4">
              <h1 className="text-[36px] font-bold leading-[56px] tracking-[-0.72px] text-[#1E1E1E]">
                Login
              </h1>
              <p className="text-base leading-none tracking-[-0.32px] text-[#404040]">
                Masukan email dan password
              </p>
            </div>

            {loginMutation.error && (
              <p className="text-sm text-red-500 bg-red-100 p-3 rounded-lg">
                {loginMutation.error.message}
              </p>
            )}

            <form
              className="flex flex-col gap-[30px]"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="space-y-[27px]">
                <div>
                  <label className="block text-sm font-medium leading-none tracking-[-0.28px] text-[#1E1E1E] mb-2">
                    Email*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Email/Username/Phone Number"
                      {...register('email')}
                      className={`w-full h-[50px] px-6 border rounded-2xl text-sm focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-[#E0E5F2] focus:ring-[#332687]'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium leading-none tracking-[-0.28px] text-[#1E1E1E] mb-2">
                    Kata sandi*
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      {...register('password')}
                      className={`w-full h-[50px] px-6 pr-14 border rounded-2xl text-sm focus:outline-none focus:ring-2 ${
                        errors.password
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-[#E0E5F2] focus:ring-[#332687]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A3AED0] hover:text-[#332687] transition-colors"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-[11px] cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('keepLoggedIn')}
                    className="sr-only"
                  />
                  <div
                    className={`w-[18px] h-[18px] rounded-sm flex items-center justify-center transition-colors border cursor-pointer ${
                      keepLoggedIn ? 'bg-[#332687] border-[#332687]' : 'bg-white border-[#E0E5F2]'
                    }`}
                  >
                    {keepLoggedIn && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
                  href="/forgot-password"
                  className="text-sm font-medium leading-5 tracking-[-0.28px] text-[#1E1E1E] hover:text-[#332687] transition-colors"
                >
                  Lupa kata sandi?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full h-[54px] bg-[#332687] hover:bg-[#2a1f6f] text-white text-sm font-bold leading-none tracking-[-0.28px] rounded-2xl transition-colors disabled:bg-gray-400"
              >
                {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
          <footer className="py-20 mt-10 text-center">
            <p className="text-sm font-medium leading-6 tracking-[-0.28px] text-[#332687]">
              © 2025 EasyTax , Made by Surya Microsystems
            </p>
          </footer>
        </div>

        <div className="hidden lg:flex flex-1 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-[#6B5DD3] via-[#8B7AE6] to-[#4A3FA8] items-center justify-center relative overflow-hidden">
          <Image
            width={80}
            height={80}
            src="/img/auth/auth.png"
            alt="Tax illustration"
            className="relative z-10 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}