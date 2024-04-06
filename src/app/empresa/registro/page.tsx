import { RegistroEmpresaComponent } from "@/components/empresa/RegistroEmpresaComponent";


export const metadata = {
    title: "Registro de empresa",
    description: "Formulario para el registro de una empresa",
}

export default function Page() { 
    return (
        <RegistroEmpresaComponent />
    )
}