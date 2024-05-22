'use client'

import { useState } from "react"
import { CardComponent } from "../ui/CardComponent"
import { QuestionMarkIcon } from "@radix-ui/react-icons"

interface Solicitud {
  id: string
  semestre: string
  perfil: string
  conocimientos: string[]
  herramientas: string[]
  numeroPracticantes: number
  fechaSolicitud: string
  estado: string
}

const HelperText = ({ text }: {text:string}) => { 
  const [show, setShow] = useState(false)
  return <div className="flex items-center space-x-2 relative">
    <span className="flex items-center">{ text}</span>
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

const ordenarSolicitudesPorSemestre = (solicitudes: Solicitud[]) => { 
  return solicitudes.sort((a: Solicitud, b: Solicitud) => {
      const [anio, semestre] = a.semestre.split('-')
      const [anio2, semestre2] = b.semestre.split('-')
      if (anio < anio2) return 1
      if (semestre < semestre2) return 1
      return -1

  })
}

const TablaSolicitudes = ({ solicitudes }: {solicitudes:Solicitud[]}) => {
  const [solicitudesList, setSolicitudesList] = useState(ordenarSolicitudesPorSemestre(solicitudes))
  return <div className="w-full h-full overflow-scroll">
    <table className="w-full divide-y divide-gray-200 ">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="flex justify-center content-center">
            <HelperText text="Estado" />
           </div>
          </th>
          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Semestre
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fecha de solicitud
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Perfil
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Conocimientos
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Herramientas
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Número de practicantes
          </th>
          
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {solicitudesList.map((solicitud: any) => (
          <tr key={solicitud.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900 flex justify-center content-center">
                <div className={` border rounded-full text-white h-5 w-5
                ${solicitud.estado === 'Aceptada' ? 'bg-green-700' : 
                  solicitud.estado === 'Rechazada' ? 'bg-red-700' :
                  solicitud.estado === 'Pendiente' ? 'bg-orange-500' : 'bg-gray-700'
                }`}>
                 

                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{solicitud.semestre}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{solicitud.fechaSolicitud}</div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{solicitud.perfil}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{solicitud.conocimientos.join(', ')}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{solicitud.herramientas.join(', ')}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{solicitud.numeroPracticantes}</div>
            </td>
            
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

export const ListaSolicitudesComponent = ({solicitudes}:any) => { 
  return <CardComponent
    title="Solicitudes de practicantes"
    description="Tabla con todas las solicitudes de practicantes enviandas ordenadas por semestre."
    cardContent={<TablaSolicitudes solicitudes={solicitudes} />}
    cardFooter={<></>}
    />
}