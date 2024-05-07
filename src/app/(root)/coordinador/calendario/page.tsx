import { CardComponent, TimelineComponent } from "@/components"


import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { Separator } from "@radix-ui/react-separator";
dayjs().format()
dayjs.locale('es')

export const metadata = {
  title: "Calendario",
  description: "Calendario",
}

const daysjsInstance = dayjs()

const getSemester = () => { 
  let semester = daysjsInstance.year().toString()
  if (daysjsInstance.month() >= 6) {
    semester += '-2'
  } else {
    semester += '-1'
  }
  return semester
}


const prueba = ({ nombre = 'JJ' }: any) => {
  return <h1>{`Hola ${nombre}!`}</h1>
}

const timelineItems = [
  {
    date: '2022-08-01',
    title: 'Inicio de clases del semestre',
    content: 'Esta fecha marca el inicio de las clases del semestre 2022-2, ',
  },
  {
    date: '2022-08-05',
    title: 'Fecha límite de inscripción de datos por parte del estudiante',
    content: 'Plazo máximo para que los estudiantes diligencien el formulario de inscripción de de sus datos para las practicas profesionales',
  },
  {
    date: '2022-08-10',
    title: 'Entrega del plan de trabajo',
    content: prueba({nombre: 'Juan'}),
  },
  {
    date: '2022-11-01',
    title: 'Entrega del primer informe',
    content: 'Se finalizan las clases del semestre 2022-2',
  },
  {
    date: '2022-11-10',
    title: 'Entrega del informe final',
    content: 'Se finaliza el semestre 2022-2',
  },

]


export const CalendarioPage = () => { 
  return <div className="h-full">
    <h1 className="text-2xl font-light">Gestión de Calendario</h1>
    <CardComponent
      title=""
      description=""
      cardContent={
        <>
          
          <TimelineComponent items={timelineItems} />
        </>
      }
      cardFooter={<></>}
    />
    <CardComponent
      title={`Fecha de inicio del semestre ${getSemester()}`}
      description="Este apartado define las fecha para el inicio del semestre actual"
      cardContent={

    <div>
          <div>
            <label className="font-semibold"></label>
            <input type="date" className="w-full border border-gray-300 rounded p-1" />
          </div>
      
        </div>
      }
      cardFooter={<></>}
    
    /> 
  </div>
}

export default CalendarioPage