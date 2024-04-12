
import { redirect } from 'next/navigation';
import { auth } from '../auth.config';
import Link from 'next/link';

export default async function Home() {

  const session = await auth();

  if ( session?.user ) {
    switch (session.user.role) {
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

  return (
    <>
      <h1>
        Pagina Principal
      </h1>
      <div>
        <Link href="/login">
          Inicio de Sesion
        </Link>
        <Link href="/estudiante">
          Estudiante
        </Link>
        <Link href="/empresa">
          Empresa
        </Link>
        <Link href="/empresa">
          Empresa
        </Link>
      </div>
    </>
  );
}
