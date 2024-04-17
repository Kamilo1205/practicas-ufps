'use client'

import { useState } from "react"
import { Autocomplete } from "../ui/Autocomplete"
import { PerfilSolicitudComponent } from "./PerfilSolicitudComponent"
import { TagComponent } from "../ui/Tag"
import { Checkbox } from "@/components/ui/checkbox"


interface Skill {
  id: number
  name: string
}

interface Props {
  skills: Skill[]
}

interface Perfil { 
  id: string
  label: string

}

export const SkillsSelectForm = ({skills}:Props) => { 

  const [skillsSeleccionados, setSkillsSeleccionados] = useState<Skill[]>([])
  const [incentivo,setIncentivo] = useState(false)
  const [perfil, setPerfil] = useState<Perfil[]>([])

  const agregarSkill = (skill: Skill) => {
    if(skillsSeleccionados.find((s) => s.id === skill.id)) return
    setSkillsSeleccionados([...skillsSeleccionados, skill])
  }

  const quitarSkill = (skill: Skill) => { 
    setSkillsSeleccionados(skillsSeleccionados.filter((s) => s.id !== skill.id))
  }

  
  const onSubmit = () => {
    console.log('skills',skillsSeleccionados) 
    console.log('incentivo', incentivo)
    console.log('perfil', perfil) 
  }

  return (<>
    <div className="mt-5">
      { /*//TODO: Adaptar el componente para recivir un valor y modificiarlo. */ }
      <PerfilSolicitudComponent perfil={ perfil} setPerfil = {setPerfil} />

      <h2 className="mt-5">Puede especificar que habilidad o herramienta está buscando en el practicante.</h2>

      <Autocomplete choices={skills} setValue={agregarSkill} />
      <div className="flex max-w-2xl flex-wrap">

        {
          skillsSeleccionados.map(
            (skill) => <TagComponent key={skill.id} item={skill} onDelete={quitarSkill} />
          )
        }
      </div>

      <div className="flex items-center space-x-2 mb-4 mt-5">
        <Checkbox />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          ¿El practicante recibirá algún tipo de incentivo economico (auxilio de trasporte, comisión u otros)?
        </label>
      </div>
      <button className="bg-black text-white px-4 py-2 rounded mt-5" onClick={onSubmit}>Enviar solicitud</button>
    </div>
  </>)
}