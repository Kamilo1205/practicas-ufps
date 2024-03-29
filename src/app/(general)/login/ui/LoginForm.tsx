'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { authenticated } from '@/actions';
import { LoginSchema } from '@/schemas';

export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticated, undefined);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema)
  });

  const onSubmit = async (formData: z.infer<typeof LoginSchema>) => {
    try {
      await authenticated(undefined, formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      {
        state === 'CredentialsSignin' && (
          <div className="text-red-500 text-sm text-center mb-3">
            El correo electrónico y la contraseña que ingresó no
            coinciden con nuestros registros.
          </div>
        )
      }

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        
        <div className="mb-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-500 mb-1.5">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:outline-none  focus:border-1 focus:ring-2 focus:ring-inset 
                    focus:ring-blue-300 sm:text-sm sm:leading-6"
            placeholder="Escribe tu dirección de electrónico"
            {...register('email')}
          />
          { errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-500 mb-1.5">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:outline-none  focus:border-1 focus:ring-2 focus:ring-inset 
                    focus:ring-blue-300 sm:text-sm sm:leading-6"
            placeholder="Introduce la contraseña..."
            {...register('password')}
          />
          { errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
          <Link href="" className="text-sm font-medium text-blue-600 mt-1">
            ¿No recuerdas tu contraseña?
          </Link>
        </div>

        <LoginButton />
      </form>
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="rounded-md border-2 border-blue-600 border-inherit h-9 w-full mt-2 px-3 bg-blue-600 text-white text-sm font-medium"
      disabled={pending}
      type="submit"
    >
      Continuar con contraseña
    </button>
  );
}