'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { LuLoader2 } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { RegistroSchema } from '@/schemas';
import { useUsuariosStorage } from '@/storage/UsuariosStorage';

export const RegistroForm = () => {

  //const { data: session, status } = useSession(); 

  const {registarEmpresa,accessToken,error} = useUsuariosStorage()

  const [ isLoading, setIsLoading ] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  console.log('accessToken',accessToken)

  useEffect(() => {
    if (error != undefined && error !== '') {
      toast({
        variant: "destructive" as const,
        description: error,
      });
    }
  }, [error]);

  const form = useForm<z.infer<typeof RegistroSchema>>({
    mode: "onBlur",
    resolver: zodResolver(RegistroSchema),
  });

  const onSubmit = async(values: z.infer<typeof RegistroSchema>) => {
    setIsLoading(true);
    const { email, password } = values
    console.log('email',email)
    await registarEmpresa(email, password)
    setIsLoading( false );
  }

  if(accessToken && accessToken !== '') router.push('/')

  return (
    <>
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
          <div className="mb-4">
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

            
            </div>
          {/* Input Password/Contraseña */}
          <div className="mb-2">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repita la contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="false" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <Link
              href="/login"
              className="mt-2 w-full text-end ml-auto inline-block text-sm underline mb-3"
            >Regresar al login</Link>

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
            Registar empresa
          </Button>
        </form>
      </Form>
    </>
  );
}
