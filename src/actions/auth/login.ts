'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth.config';
import { LoginSchema } from '@/schemas';

export async function authenticate(
    prevState: string | undefined,
    formData: z.infer<typeof LoginSchema>
) {
    try {
        await signIn('credentials', {
            ...formData,
            redirect: false
        });
        return 'Success';
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
