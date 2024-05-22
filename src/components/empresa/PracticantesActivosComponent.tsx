'use client'
import { QuestionMarkIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { CardComponent } from "../ui/CardComponent"

const HelperText = ({ text }: { text: string }) => {
  const [show, setShow] = useState(false)
  return <div className="flex items-center space-x-2 relative">
    <span className="flex items-center">{text}</span>
    <div
      className="flex justify-center content-center rounded-full border"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <QuestionMarkIcon className="h-4 w-4 text-gray-500" />
    </div>

    {show &&
      <div className="absolute top-6 bg-gray-100 p-1 rounded-lg text-gray-700 w-56">
        <p className="text-xs text-green-600">Verde para Aprovada</p>
        <p className="text-xs text-red-600">Roja para Rechazada</p>
        <p className="text-xs text-orange-500">Naranja para Pendiente</p>
      </div>}

  </div>
}

interface Practicante {
  
  id: string | number
  nombre: string
  apellido: string
  correo: string
  semestre: string
  telefono: string
  activo: boolean
    
}

const ordenarSolicitudesPorSemestre = (practicantes: Practicante[]) => {
  return practicantes.sort((a: Practicante, b: Practicante) => {
    const [yearA, semesterA] = a.semestre.split('-').map(Number);
    const [yearB, semesterB] = b.semestre.split('-').map(Number);

    if (yearA !== yearB) {
      return yearB - yearA; // Orden descendente por año
    } else {
      return semesterB - semesterA; // Orden descendente por semestre
    }

  })
}


const TablaPracticantes = ({ practicantes }: { practicantes: Practicante[] }) => { 

  const [practicantesList, setPracticantesList] = useState(ordenarSolicitudesPorSemestre(practicantes))
  console.log(ordenarSolicitudesPorSemestre(practicantes))
  return <>
    {
      practicantesList.length === 0 ?
        <>
          <p>No hay practicantes activos</p>
        </>
        :
        <div className="w-full h-full overflow-scroll">

          <table className="w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semestre
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apellido
                </th>

                
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefono
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo
                </th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {practicantesList.map((practicante: Practicante) => (
                <tr key={practicante.id}>
                  <td className="px-1 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex justify-center content-center">
                      <div className={` border rounded-full text-white h-5 w-5
                      ${practicante.activo ? 'bg-green-700' : 'bg-red-700'}`}>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">{practicante.semestre}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{practicante.nombre}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{practicante.apellido}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{practicante.telefono}</td>
                  <td className="px-3 py-3 whitespace-nowrap">{practicante.correo}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
    }

  </>
}

export const PracticantesActivosComponent = ({ practicantes }: { practicantes: Practicante[] }) => { 
  
  return (
    <CardComponent
      title="Historial de practicantes"
      description="Lista de todos los practicantes que la empresa ha tenido."
      cardContent={<TablaPracticantes practicantes={practicantes} />}
      cardFooter={<></>}
    />   
  )
}