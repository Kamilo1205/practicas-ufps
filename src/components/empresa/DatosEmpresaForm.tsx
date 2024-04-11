'use client'

import { DatosEmpresaSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { FileInputComponent, LabelConInfo } from ".."

import { SelectComponent } from "../ui/SelectComponent"
import { PaisEstadoCiudadFormHook } from "@/helpers/PaisEstadoCiudadFormHook"
import { useEffect, useState } from "react"
import { DigitosInputComponent } from "../ui/DigitosInputComponent"
import { guardarArchivoEmpresa, guardarDatosEmpresa } from "@/actions/empresa/registro-empresa-actions"
import { Button } from "../ui/button"
import { Toaster, toast } from "sonner"


interface Props{
  setStage: () => void

}

const verificarValoresJSON = (obj: any) => { 
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      return false
    }
  }
  return true

}

export const DatosEmpresaForm = ({setStage}:Props) => { 
  
  const EMPRESA_ID = "1"
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof DatosEmpresaSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(DatosEmpresaSchema)
  })
  const { paises,estados,ciudades } = PaisEstadoCiudadFormHook({
    paisSeleccionado: form.getValues().pais || "",
    estadoSeleccionado: form.getValues().departamento || "",
  }); 
  //console.log(form.getValues())
  const watcher = form.watch(['pais', 'departamento', 'municipio'])

  const onSubmit = async() => { 
    try {
      setLoading(true)
      const formData = form.getValues()
      
      if (JSON.stringify(form.formState.errors) !== '{}' || !verificarValoresJSON(formData)) {
        return setLoading(false);
      }
      //console.log('onSubmit',form.getValues())
      const nombreCarpeta = `${formData.nit}-${formData.nombre}`
 
      //Guardamos primero los archivos.
      const camaraDeComercioUrl = await guardarArchivoEmpresa(formData.camaraComercio, `${formData.nit}-camaraComercio.pdf`, nombreCarpeta)
      const RUTUrl = await guardarArchivoEmpresa(formData.rut,`${formData.nit}-rut.pdf`,nombreCarpeta)
      
      const empresa = {
        id: EMPRESA_ID,
        nombre: formData.nombre,
        direccion: formData.direccion,
        NIT: formData.nit,
        telefono: formData.telefono,
        pais: formData.pais,
        departamento: formData.departamento,
        municipio: formData.municipio,
        email: formData.email,
        camaraComercio: camaraDeComercioUrl,
        RUTUrl

      }

      await guardarDatosEmpresa(empresa) 
      setStage()
      console.log('Datos de la empresa guardados correctamente')

    } catch (error) { 
      console.log(error)
      toast.error('¡Ha ocurrido un error!')
      setLoading(false)
    }
  }

  useEffect(() => { },
    [watcher])
  return (
      <div className="p-2">
   
      <Toaster position="top-right" />
      <Form {...form} >
        <form className="flex flex-col flex-wrap" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-wrap mb-2">
            {/* Input Nombre */}
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
            { /** Correo de la empresa */}
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
            {/* Input NIT */}
            <div className="flex-1 m-1">
              <FormField
                control={form.control}
                name="nit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asChild>
                      <LabelConInfo label="NIT" info="Tenga en cuenta que si el telefono no es de Colombia, debe agregar el código de país. Ejemplo: +1 para Estados Unidos" />
                    </FormLabel>
                    <FormControl>
                      <DigitosInputComponent maxLength={10} value={field.value} setValue={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap mb-2">
            {/*Selección del Pais*/}
            <div className="mr-2">
              <FormField
                control={form.control}
                name="pais"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pais</FormLabel>
                    <FormControl>
                      <SelectComponent
                        placeholder="Seleccione un pais"
                        items={paises}
                        value={field.value}
                        onChange={field.onChange}

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/*Selección del Departamento/Estado*/}
            <div className="mr-2">
              <FormField
                control={form.control}
                name="departamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <FormControl>
                      <SelectComponent
                        placeholder="Seleccione un departamento"
                        items={estados}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/*Selección del Ciudad*/}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="municipio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <SelectComponent
                        placeholder="Seleccione una ciudad"
                        items={ciudades}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Input Direccion */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input type="text" autoComplete="false" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          

          {/* Input Camara de comercio */}
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="camaraComercio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camara de comercio</FormLabel>
                  <FormControl>
                    <FileInputComponent field={field} onChange={ field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Input RUT */}
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="rut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUT</FormLabel>
                  <FormControl>
                    <FileInputComponent field={field} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button onClick={onSubmit} className={`self-end`} disabled={loading}>
            {
              loading ? <div className="flex items-center justify-center w-full h-full">
                <div className="flex justify-center items-center space-x-1 text-sm text-white-700">

                  <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd'
                      d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                      fill='currentColor' fill-rule='evenodd' />
                  </svg>


                  <div>Enviando...</div>
                </div>
              </div>
                : 'Enviar'
          }</Button>
        </form>
      </Form>
      </div>
  )
}