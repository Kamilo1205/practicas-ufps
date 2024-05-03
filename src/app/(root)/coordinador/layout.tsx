import { SideBar } from "@/components/ui/SideBar"

const valores = [
  {
    nombre: 'Inicio',
    url: '/coordinador'
  },
  {
    nombre: 'Calendario',
    url: '/coordinador/calendario'
},
  {
    nombre: 'Convenios',
    url: '/coordinador/convenios'
  },
  {
    nombre: 'Practicantes',
    url: '/coordinador/practicantes'
  }
]

export const Layout = ({children}:any) => { 
  return (
    <div className="flex flex-row w-full">
      <div className="flex-shrink-0 fixed">
        <SideBar valores={valores} titulo="Cordinación" />
      </div>
      <div className="px-3 pt-5 bg-gray-100 ml-1 md:ml-64 w-full h-full">
        {children}

      </div>
    </div>
)
}

export default Layout