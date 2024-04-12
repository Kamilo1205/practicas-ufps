import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function EstudianteLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();
    
    if ( session?.user?.role !== 'ESTUDIANTE' ) {
        redirect('/login');
    }

    return (
        <>
            { JSON.stringify(session) }
            { children }
        </>
    );
}