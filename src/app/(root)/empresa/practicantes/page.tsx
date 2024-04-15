import { PracticantesActivosComponent } from "@/components/empresa/PracticantesActivosComponent"
import { SideBarLayout } from "../SidebarLayout"
import { PerfilSolicitudComponent } from "@/components/empresa/PerfilSolicitudComponent"



export const metadata = {
  title: "Practicantes",
  description: "Realiza la solicitud de practicantes.",

}


export const SoliciutudPracticantes = async() => { 

  

  return (
    <SideBarLayout>
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-semibold text-gray-800">Solicitud de practicantes</h1> 

        <div className="mt-5">
         
          <PerfilSolicitudComponent />
        </div>
      </div>
      



    </SideBarLayout>
  )
}

export default SoliciutudPracticantes