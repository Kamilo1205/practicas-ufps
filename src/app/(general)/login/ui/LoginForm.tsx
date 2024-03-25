'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import clsx from 'clsx';
import { authenticated } from '@/actions';


export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticated, undefined);

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

      <form action={dispatch} className="w-full">
        <div className="mb-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-500 mb-1.5">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:outline-none  focus:border-1 focus:ring-2 focus:ring-inset 
                    focus:ring-blue-300 sm:text-sm sm:leading-6"
            placeholder="Escribe tu dirección de electrónico"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-500 mb-1.5">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:outline-none  focus:border-1 focus:ring-2 focus:ring-inset 
                    focus:ring-blue-300 sm:text-sm sm:leading-6"
            placeholder="Introduce la contraseña..."
          />
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
      className={ clsx({
        "rounded-md border-2 border-blue-600 border-inherit h-9 w-full mt-2 px-3 bg-blue-600 text-white text-sm font-medium": !pending,
        "bg-red-500": pending
      })}
      disabled={ pending }
      type="submit"
    >
      Continuar con contraseña
    </button>
  );
}