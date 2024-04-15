import { CheckboxReactHookFormMultiple } from "./CheckboxReactHookFormMultiple"

const items = [
  {
    id: "mantenimiento",
    label: "Mantenimiento de hardware y software.",
  },
  {
    id: "redes",
    label: "Administración de redes de computadoras.",
  },
  {
    id: "capacitaciones",
    label: "Capacitaciones",
  },
  {
    id: "desarrollo",
    label: "Desarrollo de software (escritorio, móvil y web).",
  },
  {
    id: "servidores-cloud",
    label: "Servidores y computación en la nube.",
  },
  {
    id: "proyectos",
    label: "Dirección y evaluación de proyectos.",
  },
  {
    id: "ia",
    label: "Inteligencia Artificial.",
  }
] 

export const PerfilSolicitudComponent = () => { 

  return (
    <CheckboxReactHookFormMultiple items={items}
      title="Perfil del practicante"
      description="Seleccione entre las siguientes habilidades, aquellas que se acoplen al perfil de practicante que está solicitando." />
  )
}