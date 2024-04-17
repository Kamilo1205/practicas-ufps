import { SideBar } from "@/components/empresa/SideBar"

const valores = [
  { nombre: 'Empresa', url: '/empresa' },
  { nombre: 'Solicitud de practicantes', url: '/empresa/practicantes' },
  { nombre: 'Registro de tutores', url: '/empresa/tutores' },
  { nombre: 'Contact', url: '#' }

]

export const SideBarLayout = ({children}:any) => { 

  return (
    <div className="flex flex-row w-full">
      <div className="flex-shrink-0">
        <SideBar valores={valores} /> 
      </div>
      <div className="px-3 pt-5">
        {children}

      </div>
    </div>
  )

}