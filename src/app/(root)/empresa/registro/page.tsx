import { RegistroEmpresaComponent } from "@/components/empresa/RegistroEmpresaComponent";
import { obtenerEmpresa } from "@/storage/empresaStorage";
import { redirect } from "next/navigation";


export const metadata = {
    title: "Registro de empresa",
    description: "Formulario para el registro de una empresa",
}


const datosEmpresa = async (empresaId: string) => {
  //const empresa = await obtenerEmpresa(empresaId)
  return Promise.resolve({
    id: '1',
    nit: '12345678',
    nombre: 'Empresa 1',
    direccion: 'Direccion 1',
    sector: 'Sector 1',
    telefono: '12345678',
    email: '',
    camaraComercio: null,
    rut: null,
    industria: 'Industria 1',
    representanteLegal: {
      nombre: 'Nombre 1',
      apellido: 'Apellido 1',
      telefono: '12345678',
      email: '',
      documento: 'a'
    },
    convenio: {
      estado: 'pendiente',
      fechaInicio: new Date(),
      documento: null
    }
  })
}



export default function Page() { 

  
    return (
      <RegistroEmpresaComponent  />
    )
}