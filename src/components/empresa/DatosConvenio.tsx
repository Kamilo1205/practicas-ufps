'use client'

import { Button } from "../ui/button"

import { useForm } from "react-hook-form"

import { useState } from "react"
import { FileInputComponent } from "../ui/FileInputComponent"

import { CardComponent } from "../ui/CardComponent"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"


interface Props { 
  backStage: () => void
}

export const DatosConvenio = ({ backStage }: Props) => { 
  
  const loading = false

  const [convenioActivo, setConvenioActivo] = useState(false)
  console.log(convenioActivo)
  const form = useForm({
    defaultValues: {
      convenio: false
    }
  })

  const onSubmit = (e: any) => { 
    
    e.preventDefault()
    console.log(e.target.value)
    console.log(form.getValues())
  }

  return (
    <div >
      <h1 className="text-2xl font-semibold">Datos del convenio</h1>

      <p className="text-gray-800 text-sm mt-1 mb-2 leading-6">
       A continuación, debe indicar si la empresa tiene un convenio activo con la universidad. De lo contrario simplemente omita este paso.
      </p>
     
      <form>
        
          <CardComponent
            title="Convenio activo"
            description="¿Su empresa cuenta con un convenio activo con la universidad?"
            cardContent={
              <div className="flex flex-col">
                
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              ¿Tiene actualmente su empresa un convenio activo con la universidad?
                </label>
                <RadioGroup className="mt-5" defaultValue="option-no" onValueChange={()=>setConvenioActivo(!convenioActivo)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-si" id="option-si"
                      />
                    <Label htmlFor="Si">Si</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-no" id="option-no"
                      
                    />
                    <Label htmlFor="No">No</Label>
                  </div>
                </RadioGroup>
              {
                  !convenioActivo && <div className="mt-5 mb-4">
                    <p className="text-sm text-gray-800 mb-3">Si ya cuenta con la solicitud de convenio adjuntela acontinuación. De lo contrario de click <a href="/PPS02. modelo de convenio.docx" download={'PPS02. modelo de convenio.docx'}><span className="font-bold cursor-pointer" >aquí</span></a> para descargar el formato de solicitud y al terminar adjuntelo acontinuación. </p> 
                  <FileInputComponent />
                </div>
              }
          </div>}
            cardFooter={<></>}
          />

          
          
          <div
            className="flex flex-row justify-between mt-5"
          >
            <Button
              onClick={backStage}
              className="self-end"
            >Atras</Button>
            <Button onClick={onSubmit} className={`self-end`} disabled={loading}>
              {
                loading ? <div className="flex items-center justify-center w-full h-full">
                  <div className="flex justify-center items-center space-x-1 text-sm text-white-700">

                    <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                      <path clipRule='evenodd'
                        d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                        fill='currentColor' fillRule='evenodd' />
                    </svg>


                    <div>Enviando...</div>
                  </div>
                </div>
                  : 'Enviar'
              }</Button>
          </div>
        </form> 
     
      

      
    </div>
  )
}

/**
 * <div className="mb-5">
                  <Alert>
                    <MdOutlineWarning className="h-4 w-4" />
                    <AlertTitle className="font-bold">¡Importante!</AlertTitle>
                    <AlertDescription>
                      Si su empresa no cuenta con un convenio activo<span className="font-bold">correo@gmail.com</span> .
                    </AlertDescription>
                  </Alert>

                </div> 
 */