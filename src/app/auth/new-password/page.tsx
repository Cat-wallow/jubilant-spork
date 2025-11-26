'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordValidator, NewPasswordFormInputs } from '@/validators/auth.validator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NewPasswordPage() {
  const router = useRouter();
  const form = useForm<NewPasswordFormInputs>({
    resolver: zodResolver(NewPasswordValidator),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (data: NewPasswordFormInputs) => {
    // TODO: Implement new password API call
    console.log('Password update:', data);
    router.push('/auth/sign-in');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8 dark:bg-navy-900">
      <Card className="w-full max-w-[510px] space-y-[30px] rounded-[20px] p-6 sm:p-[50px]">
        {/* Lock Icon */}
        <div className="flex justify-center">
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
              className="fill-brand-500 dark:fill-brand-400"
            />
          </svg>
        </div>

        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold leading-[56px] tracking-[-0.48px] text-navy-700 dark:text-white">
            Buat kata sandi baru
          </h1>
          <p className="text-base font-normal leading-[150%] tracking-[-0.32px] text-gray-700 dark:text-gray-400">
            Buat kata sandi yang kuat untuk melindungi akun anda
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-[100%] tracking-[-0.28px]">
                    Kata sandi baru*
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Min. 8 characters"
                      {...field}
                      className="h-[50px] rounded-2xl border border-gray-300 px-6 text-sm dark:border-white/30 dark:bg-navy-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-[100%] tracking-[-0.28px]">
                    Konfirmasi kata sandi*
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Min. 8 characters"
                      {...field}
                      className="h-[50px] rounded-2xl border border-gray-300 px-6 text-sm dark:border-white/30 dark:bg-navy-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-[54px] w-full rounded-2xl text-sm font-bold leading-[100%] tracking-[-0.28px]"
            >
              Simpan kata sandi
            </Button>
          </form>
        </Form>

        {/* Back to Login */}
        <button
          onClick={() => router.push('/auth/sign-in')}
          className="flex items-center justify-center gap-1 text-sm font-semibold leading-[22px] text-navy-700 transition-colors hover:text-brand-500 dark:text-gray-300 dark:hover:text-brand-400"
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
