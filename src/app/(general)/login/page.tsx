import { LoginForm } from './ui/LoginForm';
import { LoginButtonGoogle } from '@/components/auth/LoginButtonGoogle';

export const metadata = {
 title: 'Login Practicas UFPS',
 description: 'SEO Title',
};

export default function LoginPage() {
  return (
    <main className="w-screen min-h-screen p-10">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold mt-14 mb-9">Iniciar sesión</h1>
        <div className="w-full max-w-xs flex flex-col items-center">
    
          <LoginButtonGoogle />
          <hr className="w-full my-6 bg-slate-950" />
          <LoginForm />  
        
        </div>
      </div>
    </main>
  );
}