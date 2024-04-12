import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export default function EmpresaLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = auth();

    if ( session?.user?.role !== 'EMPRESA' ) {
        redirect('/');
    }

    return (
        <div>
            <h1>Hello Root Layout Empresa</h1>
        </div>
    );
}