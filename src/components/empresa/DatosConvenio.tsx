//'use client'
import { z } from "zod"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { DatosRepresentanteLegalSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { FileInputComponent } from "../ui/FileInputComponent"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {  MdOutlineWarning, MdWarning } from "react-icons/md"


interface Props { 
  backStage: () => void
}

export const DatosConvenio = ({ backStage }: Props) => { 
  
  const loading = false

  const [convenioActivo, setConvenioActivo] = useState(false)

  const form = useForm<z.infer<typeof DatosRepresentanteLegalSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(DatosRepresentanteLegalSchema)
  })

  const onSubmit = (e: any) => { 
    
    e.preventDefault()
    console.log(e.target.value)
    console.log(form.getValues())
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Datos del convenio</h1>

      <p className="text-gray-800 text-sm mt-1 mb-2 leading-6">
       A continuación, debe indicar si la empresa tiene un convenio activo con la universidad. De lo contrario simplemente omita este paso.
      </p>
      <Form {...form}>
        <form>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="terms"
              checked={convenioActivo}
              onCheckedChange={() => setConvenioActivo(!convenioActivo)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              ¿Tiene actualmente su empresa un convenio activo con la universidad?
            </label>
          </div>

          {
            convenioActivo && <div className="mb-4">
              <FileInputComponent />
            </div>
          }
          
          <div
            className="flex flex-row justify-between"
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
      </Form>
      <div className="mt-5">
        <Alert>
          <MdOutlineWarning className="h-4 w-4" />
          <AlertTitle className="font-bold">¡Importante!</AlertTitle>
          <AlertDescription>
            Si su empresa no cuenta con un convenio activo, debe enviar una solicitud al correo <span className="font-bold">correo@gmail.com</span> .
          </AlertDescription>
        </Alert>

      </div> 

      
    </div>
  )
}