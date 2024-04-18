import { auth } from "@/auth.config";
import { SideBar } from "@/components/ui/SideBar";
import { redirect } from "next/navigation";


export default async function EmpresaLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  /*
      if ( session?.user?.role !== 'EMPRESA' ) {
          redirect('/');
      }
  */
  return (

    <div>
      {children}
    </div>
  );
}