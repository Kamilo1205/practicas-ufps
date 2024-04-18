import { CardComponent, } from "@/components"
import { RegistroConvenioComponent } from "@/components/direccion"


export const metadata = {
  title: 'Convenios',
  description: '',
}

const RegistroConvenios = () => { 
  return (
    <div>
      <p className="font-light mb-5">
        El archivo debe estár de acuerdo al formato X. Puede dar clik <span className="font-medium cursor-pointer">aquí</span> para descargar un ejemplo del formato aceptado.</p>
      
      <RegistroConvenioComponent />
    </div>
  )
}

export const Page = () => { 
  return (
    <div className="w-full">
      <div >
        <h1 className="font-semibold text-2xl">Convenios</h1>
        <span className="font-light">Administre los convenios del programa de ingenieria de sistemas.</span>

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