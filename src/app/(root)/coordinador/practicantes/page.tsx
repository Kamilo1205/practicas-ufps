import { CardComponent } from "@/components"
import { CargarPracticanteComponent, FormularioCargaPracticantesComponent } from "@/components/coordinacion"



export const metadata = {
  title: 'Practicantes',
  description: '',
}

const CargarPracticantesComponent = () => {
  return (
    <div>
      { /** //TODO: Linkear la descarga del formato de ejemplo. */}
      <p className="font-light mb-5">
        El archivo debe estár de acuerdo al formato X. Puede dar clik <span className="font-medium cursor-pointer">aquí</span> para descargar un ejemplo del formato aceptado.
      </p>

      <FormularioCargaPracticantesComponent />
    </div>
  )
}




export const CoodinadorPracticantesPage = () => {

  return (
    <div className="w-full">
      <div className="mb-5">
        <h1 className="font-semibold text-2xl">Convenios</h1>
        <span className="font-light">Administre los convenios del programa de ingenieria de sistemas.</span>
        <CardComponent
          title="Registrar un conjunto de estudiantes"
          description="Carga un archivo con los datos de los estudiantes habilitados."
          cardContent={<CargarPracticantesComponent />}
          cardFooter={<></>}
        />
        <CardComponent
          title="Registrar un nuevo practicante"
          description="A continuación podrá registrar manualmente un estudiante. Una vez registrado el correo del estudiante será notificado y habilitado para su ingreso al sistema."
          cardContent={<CargarPracticanteComponent />}
          cardFooter={<></>}
        />
      </div>
    </div>
  )
 }

export default CoodinadorPracticantesPage