'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FcGoogle } from 'react-icons/fc';
import { LuLoader2 } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { authenticate } from '@/actions';
import { LoginSchema } from '@/schemas';

export const LoginForm = () => {

  const { data: session, status } = useSession(); 
  
  const [ isLoading, setIsLoading ] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async(values: z.infer<typeof LoginSchema>) => {
    setIsLoading( true );
    const data = await authenticate(values);
    if ( data.ok ) router.push('/');
    if ( !data.ok ) {
      toast({
        variant: "destructive",
        description: data.message,
      });
    }
    setIsLoading( false );
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        disabled={ isLoading }
        onClick={ () => signIn("google", { redirect: false} ) }
      >
        { 
          isLoading
            ? <LuLoader2 className="mr-2 h-5 w-5 animate-spin"/>
            : <FcGoogle className="h-5 w-5 mr-2"/>
        }    
          Continuar con Google
      </Button>
    
      <hr className="w-full my-8 sm:bg-slate-500 bg-slate-950" />
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          // action={dispatch}
          className="w-full"
        >

          {/* Input Email/Correo */}
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="false" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Input Password/Contraseña */}
          <div className="mb-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="false" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link 
              href="#"
              className="mt-2 w-full text-end ml-auto inline-block text-sm underline"
            >Olvidaste tu contraseña?</Link>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={ isLoading }
          >
            { 
              isLoading
                ? <LuLoader2 className="mr-2 h-4 w-4 animate-spin"/>
                : <MdOutlineEmail className="mr-2 h-5 w-5"/>
            }
            Continuar con email
          </Button>
        </form>
      </Form>
    </>
  );
}
