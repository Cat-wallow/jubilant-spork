'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Image from 'next/image';
import { useLogin } from 'hooks/useAuth';
import { SignInValidator, SignInFormInputs } from 'validators/auth.validator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { PasswordInput } from 'components/ui/password-input';
import { Button } from 'components/ui/button';
import { Checkbox } from 'components/ui/checkbox';

export default function SignInPage() {
  const loginMutation = useLogin();

  const form = useForm<SignInFormInputs>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      emailOrUsername: '',
      password: '',
      keepLoggedIn: true,
    },
  });

  // Set server error when login fails
  useEffect(() => {
    if (loginMutation.error) {
      const errorMessage =
        (loginMutation.error as any)?.message ||
        'Login gagal, silakan coba lagi';

      form.setError('root', {
        type: 'server',
        message: errorMessage,
      });
    } else {
      form.clearErrors('root');
    }
  }, [loginMutation.error, form]);

  const handleLogin = (data: SignInFormInputs) => {
    form.clearErrors('root');

    loginMutation.mutate({
      emailOrUsername: data.emailOrUsername,
      password: data.password,
      rememberMe: data.keepLoggedIn,
    });
  };

  return (
    <div className="flex max-h-screen min-h-screen flex-col overflow-hidden bg-white dark:bg-navy-900">
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="flex flex-1 flex-col items-center justify-end px-6 py-12 lg:px-12">
          <div className="flex w-full max-w-[410px] flex-col gap-[30px]">
            <div className="space-y-4">
              <h1 className="text-[36px] font-bold leading-[56px] tracking-[-0.72px] text-navy-700 dark:text-white">
                Login
              </h1>
              <p className="text-base leading-none tracking-[-0.32px] text-gray-700 dark:text-gray-400">
                Masukan email/username dan password
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="emailOrUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium leading-none tracking-[-0.28px]">
                        Email atau Username*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan email atau username"
                          {...field}
                          className="h-[50px] rounded-2xl border border-gray-300 px-6 text-sm dark:border-white/30 dark:bg-navy-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium leading-none tracking-[-0.28px]">
                        Kata sandi*
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Min. 8 characters"
                          {...field}
                          className="h-[50px] rounded-2xl border border-gray-300 px-6 text-sm dark:border-white/30 dark:bg-navy-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Server-side error display */}
                {form.formState.errors.root && (
                  <div className="-mt-2 rounded-lg bg-red-100 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                    {form.formState.errors.root.message}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <FormField
                    control={form.control}
                    name="keepLoggedIn"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-[11px] space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-[18px] w-[18px] rounded-sm border-brand-500 dark:border-brand-400"
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer text-sm font-normal leading-5 tracking-[-0.28px]">
                          Buat saya tetap login
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium leading-5 tracking-[-0.28px] text-navy-700 transition-colors hover:text-brand-500 dark:text-gray-300 dark:hover:text-brand-400"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="h-[54px] w-full rounded-2xl text-sm font-bold leading-none tracking-[-0.28px]"
                >
                  {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </Form>
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
