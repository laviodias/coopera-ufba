import React from 'react';
import Link from 'next/link';
import {
  loginFormSchema,
  LoginUserFormData,
} from '@/app/login/login.form.schema';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { authStore } from '@/context/loginContext';
import loginStore from '@/context/loginContext/login.context';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function loginUser(data: LoginUserFormData) {
    await loginStore.login(data.email, data.password, router); // Pass router to login method
  }
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <section className="w-full max-w-sm bg-white px-8 py-8 rounded-lg shadow-lg">
        <Image
          style={{ display: 'block', margin: '0 auto' }}
          src={'/header-logo.png'}
          alt="Logo Nexus"
          width={233}
          height={90}
        />
        <form
          onSubmit={handleSubmit(loginUser)}
          className="flex flex-col gap-2 w-full max-w-sm mt-8"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              className="border border-zinc-200 shadow-sm rounded-lg p-2"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className="border border-zinc-200 shadow-sm rounded-lg p-2"
              {...register('password')}
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>
          <a href="" className="text-right text-xs underline">
            Esqueci minha senha
          </a>

          <button
            type="submit"
            className="rounded-full h-10 mt-8"
            style={{
              backgroundColor: '#6D5BD0',
              fontWeight: 'bold',
              color: 'white',
            }}
            disabled={authStore.isLoading}
          >
            {authStore.isLoading ? 'Carregando...' : 'Acessar'}
          </button>

          {authStore.errorMessage && (
            <span className="text-red-600 text-sm text-center mt-2">
              {authStore.errorMessage}
            </span>
          )}
        </form>

        <p className="text-xs text-center mt-12">
          Ainda não possui uma conta?{' '}
          <Link href="/user-register" className="text-center underline">
            Cadastre-se
          </Link>
        </p>
      </section>
    </main>
  );
}
