import { PracticantesActivosComponent } from "@/components/empresa/PracticantesActivosComponent";
import { SideBarLayout } from "./SidebarLayout";

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
export default async function Page() {
  const practicantes = await getPracticantes()
  return (
    <SideBarLayout>
      <div className="mt-5">
        <PracticantesActivosComponent practicantes={practicantes} />
      </div>
   </SideBarLayout>
  );
}