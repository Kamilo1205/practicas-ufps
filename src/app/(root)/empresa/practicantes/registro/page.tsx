import { PracticantesActivosComponent } from "@/components/empresa/PracticantesActivosComponent"
import { SideBarLayout } from "../../SidebarLayout"
import { PerfilSolicitudComponent } from "@/components/empresa/PerfilSolicitudComponent"
import { Input } from "@/components/ui/input"
import { Autocomplete } from "@/components/ui/Autocomplete"
import { getSkills } from "@/helpers/consultaSkillsTest"
import { SkillsSelectForm } from "@/components/empresa/SkillsSelectForm"



export const metadata = {
  title: "Practicantes",
  description: "Realiza la solicitud de practicantes.",

}


export const SoliciutudPracticantes = async() => { 

  const skills = await getSkills()
  
  return (
    <SideBarLayout>
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-semibold text-gray-800">Solicitud de practicantes</h1> 
        <SkillsSelectForm skills={skills} />
      </div>
    </SideBarLayout>
  )
}

export default SoliciutudPracticantes