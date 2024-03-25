'use server';

import { signIn } from '@/auth.config';

export async function authenticated(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials', Object.fromEntries(formData));
    } catch ( error ) {
        // if ((error as Error).message.includes('CredentialSignin')) {       
            return 'CredentialsSignin';
        // }
        // throw error;
    }
}