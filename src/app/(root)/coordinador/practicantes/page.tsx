import { CardComponent } from "@/components"



export const metadata = {
  title: 'Practicantes',
  description: '',
}

const CargarPracticantesComponent = () => { 
  return (
    <div>
      <h1>Practicantes</h1>
    </div>
  )
}

export const CoodinadorPracticantesPage = () => {

  return (
    <div className="w-full">
      <div>
        <h1 className="font-semibold text-2xl">Convenios</h1>
        <span className="font-light">Administre los convenios del programa de ingenieria de sistemas.</span>
        <CardComponent
          title="Registrar un nuevo convenio"
          description="Ingrese los datos del convenio en el siguiente formulario y adjunte los documentos necesarios."
          cardContent={<CargarPracticantesComponent />}
          cardFooter={<></>}
        />
      </div>
    </div>
  )
 }

export default CoodinadorPracticantesPage