import { RegistroEmpresaComponent } from "@/components/empresa/RegistroEmpresaComponent";
import { getSectoresConSubsectores } from "@/helpers/Indutrias";


export const metadata = {
    title: "Registro de empresa",
    description: "Formulario para el registro de una empresa",
}

export default async function Page() { 
  const sectores = await getSectoresConSubsectores()
    return (
      <RegistroEmpresaComponent sectores={ sectores} />
    )
}