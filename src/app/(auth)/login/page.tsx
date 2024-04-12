import { LoginForm } from "./ui/LoginForm";

export const metadata = {
  title: 'Login Practicas UFPS',
  description: 'SEO Title',
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold mt-14 mb-10">Iniciar sesión</h1>
      <div className="w-full max-w-[350px] flex flex-col items-center">
        <LoginForm />
      </div>
    </div>
  );
}