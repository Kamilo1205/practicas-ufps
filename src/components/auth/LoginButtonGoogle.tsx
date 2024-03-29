'use client';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export const LoginButtonGoogle = () => {
  return (
    <button 
        onClick={ () => signIn('google') }
        className="flex justify-center items-center
            rounded-md border-2 border-inherit h-9 w-full 
            mt-2 px-3 text-sm font-medium"
    >
        <FcGoogle className="h-5 w-5 mr-2"/>    
        Continuar con Google
    </button>
  );
}
