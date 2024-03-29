'use server';
import { z } from 'zod';
import { signIn } from '@/auth.config';
import { LoginSchema } from '@/schemas';

export async function authenticated(
    prevState: string | undefined,
    formData: z.infer<typeof LoginSchema>
) {
    try {
        await signIn('credentials', {
            ...formData,
            redirect: false
        });
        return 'Success';
    } catch ( error ) {
        //if ((error as Error).message.includes('CredentialSignin')) {       
            return 'CredentialsSignin';
        //}
        return 'UnknowError';
        // throw error;
    }
}