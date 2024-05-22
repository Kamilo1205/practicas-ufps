import { auth } from "@/auth.config";
import { obtenerEmpresa } from "@/storage/empresaStorage";
import { redirect } from "next/navigation";



export default async function EmpresaLayout({
  children
}: {
  children: React.ReactNode;
  }) {
  //TODO: Usar una session real cuando esté. 
  //const session = await auth();
  const session = { user: { role:'EMPRESA',id:'1' } }
  
      if ( !session || session?.user?.role !== 'EMPRESA' ) {
          redirect('/');
      }
  return (

    <div className="h-full">
      {children}
    </div>
  );
}