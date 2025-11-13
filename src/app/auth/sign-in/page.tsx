'use client';

import { useState, useEffect } from 'react';
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
    setError,
    clearErrors,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      keepLoggedIn: true,
    },
  });

  const keepLoggedIn = watch('keepLoggedIn');

  // Set server error when login fails
  useEffect(() => {
    if (loginMutation.error) {
      // Extract error message from the response
      const errorMessage =
        (loginMutation.error as any)?.response?.data?.message ||
        'Login gagal. Silakan coba lagi.';

      // Set a form-level error that will appear below password field
      setError('root', {
        type: 'server',
        message: errorMessage,
      });
    } else {
      // Clear the error when there's no error or on component mount
      clearErrors('root');
    }
  }, [loginMutation.error, setError, clearErrors]);

  const handleLogin = (data: LoginFormInputs) => {
    // Clear any existing server errors before submitting
    clearErrors('root');

    loginMutation.mutate({
      email: data.email,
      password: data.password,
      rememberMe: data.keepLoggedIn,
    });
  };

  return (
    <div className="flex max-h-screen min-h-screen flex-col overflow-hidden  dark:bg-navy-900">
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex flex-1 flex-col items-center justify-end px-6 py-12 lg:px-12">
          <div className="flex w-full max-w-[410px] flex-col gap-[30px]">
            <div className="space-y-4">
              <h1 className="text-[36px] font-bold leading-[56px] tracking-[-0.72px] text-navy-700 dark:text-white">
                Login
              </h1>
              <p className="text-base leading-none tracking-[-0.32px] text-gray-700 dark:text-gray-400">
                Masukan email dan password
              </p>
            </div>

            <form
              className="flex flex-col gap-[30px]"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div className="space-y-[27px]">
                <div>
                  <label className="mb-2 block text-sm font-medium leading-none tracking-[-0.28px] text-navy-700 dark:text-white">
                    Email*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Email/Username/Phone Number"
                      {...register('email')}
                      className={`h-[50px] w-full rounded-2xl border px-6 text-sm text-navy-700 focus:outline-none focus:ring-2 dark:bg-navy-800 dark:text-white ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500 dark:border-red-400'
                          : 'border-gray-300 focus:ring-brand-500 dark:border-white/30 dark:focus:ring-brand-400'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium leading-none tracking-[-0.28px] text-navy-700 dark:text-white">
                    Kata sandi*
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      {...register('password')}
                      className={`h-[50px] w-full rounded-2xl border px-6 pr-14 text-sm text-navy-700 focus:outline-none focus:ring-2 dark:bg-navy-800 dark:text-white ${
                        errors.password
                          ? 'border-red-500 focus:ring-red-500 dark:border-red-400'
                          : 'border-gray-300 focus:ring-brand-500 dark:border-white/30 dark:focus:ring-brand-400'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 transition-colors hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Server-side error display */}
              {errors.root && (
                <div className="-mt-5 rounded-lg bg-red-100 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                  {errors.root.message}
                </div>
              )}

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
                        ? 'border-brand-500 bg-brand-500 dark:border-brand-400 dark:bg-brand-400'
                        : 'border-gray-300 bg-white dark:border-white/30 dark:bg-navy-800'
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
                  <span className="text-sm leading-5 tracking-[-0.28px] text-navy-700 dark:text-gray-300">
                    Buat saya tetap login
                  </span>
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium leading-5 tracking-[-0.28px] text-navy-700 transition-colors hover:text-brand-500 dark:text-gray-300 dark:hover:text-brand-400"
                >
                  Lupa kata sandi?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="h-[54px] w-full rounded-2xl bg-brand-500 text-sm font-bold leading-none tracking-[-0.28px] text-white transition-colors hover:bg-brand-600 disabled:bg-gray-400 dark:bg-brand-400 dark:hover:bg-brand-500"
              >
                {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
          <footer className="mt-10 py-20 text-center">
            <p className="text-sm font-medium leading-6 tracking-[-0.28px] text-brand-500 dark:text-brand-400">
              © 2025 EasyTax , Made by Surya Microsystems
            </p>
          </footer>
        </div>

        <div className="relative hidden flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-[#6B5DD3] via-[#8B7AE6] to-[#4A3FA8] bg-cover bg-center bg-no-repeat dark:from-brand-700 dark:via-brand-600 dark:to-brand-800 lg:flex">
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
