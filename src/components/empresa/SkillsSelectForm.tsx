'use client'

import { useState } from "react"
import { Autocomplete } from "../ui/Autocomplete"
import { PerfilSolicitudComponent } from "./PerfilSolicitudComponent"
import { sk } from "date-fns/locale"
import { TagComponent } from "../ui/Tag"


interface Skill {
  id: number
  name: string
}

interface Props {
  skills: Skill[]
}

export const SkillsSelectForm = ({skills}:Props) => { 

  const [skillsSeleccionados, setSkillsSeleccionados] = useState<Skill[]>([])

  const agregarSkill = (skill: Skill) => {
    setSkillsSeleccionados([...skillsSeleccionados, skill])
  }

  const quitarSkill = (skill: Skill) => { 
    setSkillsSeleccionados(skillsSeleccionados.filter((s) => s.id !== skill.id))
  }

  return (<>
    <div className="mt-5">
      <PerfilSolicitudComponent />

      
      <Autocomplete choices={skills} setValue={agregarSkill} />
      <h2 className="text-lg font-semibold text-gray-800 mt-5">Skills seleccionados</h2>
      <div className="flex">

        {
          skillsSeleccionados.map(
            (skill) => <TagComponent key={skill.id} item={skill} onDelete={quitarSkill} />
          )
        }
      </div>

    </div>
  </>)
}