import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { Input } from "../ui/input"
import { DatosRepresentanteLegalSchema } from "@/schemas/DatosRepresentanteLegalScheme"
import { LabelConInfo } from "../ui/LabelConInfo"
import { Button } from "../ui/button"
import { CardComponent } from "../ui/CardComponent"
import { FileInputComponent } from "../ui/FileInputComponent"

const Formulario = ({form}:any) => { 
  return (
    <>
      <div className="flex flex-wrap">
        { /** Nombre del representante legal. */}
        <div className="m-1">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="false" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        { /** Documento del representante legal */}
        <div className="m-1">
          <FormField
            control={form.control}
            name="documento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento</FormLabel>
                <FormControl>
                  <Input type="number" autoComplete="false" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      { /** Correo del representante legal */}
      <div className="m-1">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="false" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* Input Telefono */}
      <div className="flex-1 m-1">
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <LabelConInfo label="Telefono" info="Tenga en cuenta que si el telefono no es de Colombia, debe agregar el código de país. Ejemplo: +1 para Estados Unidos" />
              </FormLabel>
              <FormControl>
                <Input type="text" autoComplete="false" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* Input Camara de comercio */}
      <div className="m-1">
        <FormField
          control={form.control}
          name="documentoFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Copia del documento del representante</FormLabel>
              <FormControl>
                <FileInputComponent field={field} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

    </> 
  )
}


interface Props {
  nextStage: () => void
  backStage: () => void
}

export const DatosRepresentanteLegal = ({nextStage,backStage}:Props) => { 
  const loading = false
  
  const form = useForm<z.infer<typeof DatosRepresentanteLegalSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(DatosRepresentanteLegalSchema)
  })
  const onSubmit = (e: any) => {
    'use client'
    console.log('submit')
    e.preventDefault()
    console.log(e.target.value)
    console.log(form.getValues())
    nextStage()
  }

    return (
        <div>
       
        <div className="">
          <Form {...form}>
            <form className="flex flex-col flex-wrap">

              <CardComponent
                title="Datos del representante legal"
                description="Complete los datos del representante legal de la empresa."
                cardContent={<Formulario form={form} />}
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
          </Form>
          </div>
    </div>
    )
}

/**
 *  <div className="flex flex-wrap mb-2">
                
              </div>





             
<div className="col-span-3">
  <FormField
    control={form.control}
    name="documentoFile"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Camara de comercio</FormLabel>
        <FormControl>
          <FileInputComponent field={field} onChange={field.onChange} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>
 */