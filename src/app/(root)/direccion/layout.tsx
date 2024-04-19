import { SideBar } from "@/components/ui/SideBar"

const valores = [
  {
    nombre: 'Inicio',
    url: '/direccion'
},
  {
    nombre: 'Convenios',
    url: '/direccion/convenios'
  },
  {
    nombre: 'Practicantes',
    url: '/direccion/practicantes'
  }
]

export const Layout = ({children}:any) => { 
  return (
    <div className="flex flex-row w-full">
      <div className="flex-shrink-0 fixed mr-12">
        <SideBar valores={valores} titulo="Dirección" />
      </div>
      <div className="px-3 pt-16 md:pt-10 bg-gray-100 md:ml-64">
        {children}

      </div>
    </div>
)
}

export default Layout