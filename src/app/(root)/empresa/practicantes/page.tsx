
import { ListaSolicitudesComponent } from "@/components/empresa/ListaSolicitudesComponent"
import { SideBarLayout } from "../SidebarLayout"
import { CardComponent } from "@/components"

export const metadata = {
  title: "Solicitudes de practicantes",
  description: "Revisa las solicitudes de practicantes."

}

const Solicitudes = async () => { 
  return Promise.resolve([
    {
      id: 1,
      perfil: "Desarrollador de software",
      conocimientos: ["Frontend", "Backend"],
      herramientas: ["React", "NodeJS", "MongoDB", "ExpressJS", "Firebase", "AWS"],
      numeroPracticantes: 1,
      fechaSolicitud: "2021-09-01",
      semestre: "2022-1",
      estado: "Aceptada"
    },
    {
      id: 2,
      perfil: "Desarrollador de software",
      conocimientos: ["Frontend", "Backend"],
      herramientas: ["React", "NodeJS", "MongoDB", "ExpressJS", "Firebase", "AWS"],
      numeroPracticantes: 1,
      fechaSolicitud: "2021-09-01",
      semestre: "2023-1",
      estado: "Aceptada"
    },
    {
      id: 3,
      perfil: "Desarrollador de software",
      conocimientos: ["Frontend", "Backend"],
      herramientas: ["React", "NodeJS", "MongoDB", "ExpressJS", "Firebase", "AWS"],
      numeroPracticantes: 1,
      fechaSolicitud: "2021-09-01",
      semestre: "2024-1",
      estado: "Rechazada"
    },
    {
      id: 4,
      perfil: "Desarrollador de software",
      conocimientos: ["Frontend", "Backend"],
      herramientas: ["React", "NodeJS", "MongoDB", "ExpressJS", "Firebase", "AWS"],
      numeroPracticantes: 1,
      fechaSolicitud: "2021-09-01",
      semestre: "2024-2",
      estado: "Pendiente"
    }
  ])
}

export const SolicitudesPracticantes = async () => { 

  const solicitudes = await Solicitudes()

  return <SideBarLayout>
    <ListaSolicitudesComponent solicitudes={ solicitudes} />
  </SideBarLayout>
}

export default SolicitudesPracticantes