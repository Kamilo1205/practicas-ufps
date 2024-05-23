'use client'
import { redirect } from 'next/navigation';
import { useUsuariosStorage } from '@/storage/UsuariosStorage';

export default function Home() {

  const {usuario,accessToken,loggingIn} = useUsuariosStorage();

  if (accessToken && accessToken !== '') {
    switch (usuario.roles[0].nombre.toUpperCase()) {
      case 'ESTUDIANTE':
        redirect('/estudiante');
      case 'TUTOR_PRACTICAS':
        redirect('/tutor-practicas');
      case 'COORDINADOR':
        redirect('/coordinador');
      case 'EMPRESA':
        redirect('/empresa');
      case 'DIRECTOR_PROGRAMA':
        redirect('/director-programa');
      default:
        break;
    }
  }
  else {
    redirect('/login');
  }
  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <div className="w-8 h-8 border-4 border-red-200 rounded-full animate-spin border-t-transparent"></div>
        <p className="ml-2">cargando...</p>
      </div>
      

      
    </>
  );
}
