import { SideBar } from "@/components/ui/SideBar"

const valores = [
  { nombre: 'Empresa', url: '#' },
  {
    nombre: 'Solicitud de practicantes', url: '/empresa/practicantes',
    itemOpen: false,
    subitems: [
      {
        nombre: 'Solicitudes realizadas ',
        url: '/empresa/practicantes'
      },
      {
        nombre: 'Realizar una nueva solicitud',
        url: '/empresa/practicantes/registro'
      }
    ]
  },
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
    <div className="flex h-full">
      <div className="flex-shrink-0 fixed left-0 top-0 md:top-14 h-screen flex flex-col z-50">
        <SideBar valores={valores} titulo="Empresa" />
      </div>
      <div className="h-screen flex-1 w-full md:ml-64 md:w-4/5 px-3 pt-4 md:pt-4 bg-gray-100">
        {children}
      </div>
    </div>
  )

}