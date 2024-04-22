import { SideBar } from "@/components/ui/SideBar"

const valores = [
  { nombre: 'Empresa', url: '/empresa' },
  { nombre: 'Solicitud de practicantes', url: '/empresa/practicantes' },
  {
    nombre: 'Registro de tutores',
    url: '/empresa/tutores',
    itemOpen: false,
    subitems: [
      {
        nombre: 'Tutores registrados',
        url: '/empresa/tutores'
      },
      {
        nombre: 'Registrar un nuevo tutor',
        url: '/empresa/tutores/registro'
      }
    ]
  }

]

export const SideBarLayout = ({ children }: any) => {

  return (
    <div className="flex flex-row w-full">
      <div className="flex-shrink-0">
        <SideBar valores={valores} titulo="Empresa" />
      </div>
      <div className="px-3 pt-5 bg-gray-100 w-full">
        {children}

      </div>
    </div>
  )

}