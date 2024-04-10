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
import { useEffect } from "react"
import { DigitosInputComponent } from "../ui/DigitosInputComponent"
import { guardarArchivo, guardarDatosEmpresa } from "@/actions/empresa/registro-empresa-actions"
import { Button } from "../ui/button"


interface Props{
  setStage: () => void

}

export const DatosEmpresaForm = ({setStage}:Props) => { 
  
  const EMPRESA_ID = "1"
  
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
      console.log("ERRORES",form.formState.errors)
      if (JSON.stringify(form.formState.errors) !== '{}') return;
      console.log('onSubmit',form.getValues())
      const formData = form.getValues()
      const empresa = {
        id: EMPRESA_ID,
        nombre: formData.nombre,
        direccion: formData.direccion,
        NIT: formData.nit,
        telefono: formData.telefono,
        pais: formData.pais,
        departamento: formData.departamento,
        municipio: formData.municipio,

      }
      const result = await guardarDatosEmpresa(empresa)
      if (result) {
        console.log('Datos de la empresa guardados correctamente')
        console.log('Guardando camara de comercio', formData.camaraComercio)
        const guardarCamaraComercio = await guardarArchivo(formData.camaraComercio, 'camaraComercio.pdf', formData.nombre)
        setStage()
      }
    } catch (error) { 
      console.log('Error al guardar los datos de la empresa') 
      console.log(error)
    }
  }

  useEffect(() => { },
    [watcher])
  return (
      <div className="p-2">
   
      
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
          <Button onClick={onSubmit} className="self-end">Siguiente</Button>
        </form>
      </Form>
      </div>
  )
}