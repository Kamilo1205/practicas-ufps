import { RegistroEmpresaComponent } from "@/components/empresa/RegistroEmpresaComponent";
import { obtenerEmpresa } from "@/storage/empresaStorage";


export const metadata = {
    title: "Registro de empresa",
    description: "Formulario para el registro de una empresa",
}

const getUsuario = async () => {
  const empresa = await obtenerEmpresa('1')
  return Promise.resolve({
    id: '1',
    nombre: 'Empresa 1',
    direccion: 'Direccion 1',
    sector: 'Sector 1',
    telefono: '12345678',
    email: '',
    camaraComercio: null,
    rut: null,
    industria: 'Industria 1',
  })
}

export default async function Page() { 

    return (
      <RegistroEmpresaComponent  />
    )
}