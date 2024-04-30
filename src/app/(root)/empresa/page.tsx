import { PracticantesActivosComponent } from "@/components/empresa/PracticantesActivosComponent";
import { SideBarLayout } from "./SidebarLayout";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Empresa",
  description: "Empresa",
}
const getPracticantes = () => {
  return Promise.resolve([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      carrera: 'Ingenieria en Sistemas',
      semestre: '8',
      telefono: '12345678',
      correo: '',
    },
    {
      id: 2,
      nombre: 'Maria',
      apellido: 'Lopez',
      carrera: 'Ingenieria en Sistemas',
      semestre: '7',
      telefono: '12345678',
      correo: '',
    },
    {
      id: 3,
      nombre: 'Pedro',
      apellido: 'Ramirez',
      carrera: 'Ingenieria en Sistemas',
      semestre: '6',
      telefono: '12345678',
      correo: '',
    },
  ])
}
const datosEmpresa = async (empresaId: string) => {
  //const empresa = await obtenerEmpresa('1')
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
      documento: null
    },
    convenio: {
      estado: 'pendiente',
      fechaInicio: new Date(),
      documento: null
    }
  })
}

export default async function Page() {

  //TODO: Usar una session real cuando esté. 
  //const session = await auth();
  const session = { user: { role: 'EMPRESA', id: '1' } }

 const empresa = await datosEmpresa(session.user.id)
  if (!empresa.nit || !empresa.representanteLegal.documento || empresa.convenio.estado === 'pendiente') {
    redirect('/empresa/registro')
  }

  const practicantes = await getPracticantes()
  return (
    <SideBarLayout>
      <div className="mt-5">
        <PracticantesActivosComponent practicantes={practicantes} />
      </div>
   </SideBarLayout>
  );
}