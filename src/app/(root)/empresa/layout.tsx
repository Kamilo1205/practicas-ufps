'use client'
import { useUsuariosStorage } from "@/storage/UsuariosStorage";
import { redirect, useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";



export default function EmpresaLayout({
  children
}: {
  children: React.ReactNode;
  }) {
  //TODO: Usar una session real cuando esté.
  //const session = await auth();
  
  const router = useRouter();

  const {usuario,accessToken, cerrarSeccion} = useUsuariosStorage();
  const session = usuario
  
  if ( !accessToken || accessToken === '' || session.roles.find(rol => rol.nombre.toUpperCase() === 'EMPRESA') === undefined){
    redirect('/');
  }
  if (!usuario.estaRegistrado) {
    router.push('/empresa/registro');
  }
  return (

    <div className="h-full">
      <div className="w-full bg-red-500 flex justify-end z-50" onClick={cerrarSeccion}>
        <LuLogOut className="w-5 h-5 mx-8 my-4 text-white font-bold cursor-pointer" />
      </div>
      {children}
    </div>
  );
}