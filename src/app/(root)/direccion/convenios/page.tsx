import { CardComponent, } from "@/components"
import { RegistroConveniosComponent, RegistroNuevoConvenio } from "@/components/direccion"


export const metadata = {
  title: 'Convenios',
  description: '',
}

const RegistroConvenios = () => { 
  return (
    <div >
      <p className="font-light mb-5">
        El archivo debe estár de acuerdo al formato X. Puede dar clik <span className="font-medium cursor-pointer">aquí</span> para descargar un ejemplo del formato aceptado.</p>
      
      <RegistroConveniosComponent />
    </div>
  )
}

const RegistroIndividual = () => { 
  return (
    <div>
      <p className="font-light mb-5">
      Los convenios con las empresas tienen una vigencia de 3 años, plazo tras el cual será renovado automaticamente a menos que alguna de las partes notifique lo contrario.   
      </p>
      
      < RegistroNuevoConvenio/>
    </div>
  )

}

export const Page = () => { 
  return (
    <div className="w-full mb-5">
      <div >
        <h1 className="font-semibold text-2xl">Convenios</h1>
        <span className="font-light">Administre los convenios del programa de ingenieria de sistemas.</span>

        
        <CardComponent
          title="Registrar un nuevo convenio"
          description="Ingrese los datos del convenio en el siguiente formulario y adjunte los documentos necesarios."
          cardContent={<RegistroIndividual />}
          cardFooter={<></>}
        />

        <CardComponent
          title="Registrar convenios"
          description="A continuación puede adjuntar el archivo con los datos de los convenios."
          cardContent={<RegistroConvenios />}
          cardFooter={<></>}
        />

        

      </div>
      
    </div>
  ) 
}

export default Page