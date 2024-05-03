import { CardComponent } from "@/components"
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
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


export const CalendarioPage = () => { 
  return <div className="h-full">
    <h1 className="text-2xl font-light">Gestión de Calendario</h1>
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