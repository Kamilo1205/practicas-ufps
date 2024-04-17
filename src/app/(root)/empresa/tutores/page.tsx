import Link from "next/link"
import { SideBarLayout } from "../SidebarLayout"
import { TablaTutores } from "@/components/empresa/TablaTutores"

export const metadata = {
  title: 'Tutores',
  description: 'Registra un tutor en el sistema.',
}

const getTutores = async () => {
  return Promise.resolve([
    {
      id: 1,
      nombre: "Juan Perez",
      email: "juanp@gmail.com",
      telefono: "3221020343",
      documento: 10,
      estado: "Activo"
    },
    {
      id: 2,
      nombre: "Pedro Perez",
      email: "pedrop@hotmail.com",
      telefono: "3142203454",
      documento: 12,
      estado: "Activo"
    }
  ]
  )
}
export const Page = async() => { 

  const tutores = await getTutores()

  return (
    <SideBarLayout>
      <h1 className="text-2xl font-semibold text-gray-800">Gestión de tutores</h1>   
      <Link href={"/empresa/tutores/registro"}>      
        <button className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
          Registrar tutor
        </button>
      </Link>  
      <h3 className="text-lg font-semibold text-gray-800 mt-5">Tutores registrados</h3>

      <TablaTutores tutores={tutores}/>
    </SideBarLayout>
  )

}

export default Page