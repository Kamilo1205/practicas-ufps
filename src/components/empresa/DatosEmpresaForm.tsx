'use client'

import { DatosEmpresaSchema } from "@/schemas/datosEmpresaSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { FileInputComponent, TooltipComponent } from ".."
import Image from "next/image"

import InfoIcon from '/public/info.svg'
import { SelectComponent } from "../ui/SelectComponent"
import { PaisEstadoCiudadFormHook } from "@/helpers/PaisEstadoCiudadFormHook"
import { useEffect } from "react"




export const DatosEmpresaForm = () => { 
  
  
  const form = useForm<z.infer<typeof DatosEmpresaSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(DatosEmpresaSchema)
  })
  const { paises,estados,ciudades } = PaisEstadoCiudadFormHook({
    paisSeleccionado: form.getValues().pais || "",
    estadoSeleccionado: form.getValues().departamento || "",
  }); 
 console.log(form.getValues())
  useEffect(() => { },
    [form.watch(['pais', 'departamento', 'municipio'])])
  return (
      <div className="p-2">
      <h1>Datos de la empresa</h1>
      
      <Form {...form}>
        <form className="grid grid-cols-6 col-span-2 gap-x-6 gap-y-8">
          {/* Input Nombre */}
          <div className="col-span-3">
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
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel asChild>
                    <div className="flex text-center">
                      <span className="mr-1">Telefono</span>

                      <TooltipComponent
                        content="Tenga en cuenta que si el telefono no es de Colombia, debe agregar el código de país. Ejemplo: +1 para Estados Unidos"
                        hoverText={
                          <Image src={InfoIcon}
                            width={16}
                            height={16}
                            alt="info icon"
                          />
                        }
                      />
                    </div>
                    
                  </FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete="false" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*Selección del Pais*/}
          <div className="col-span-3">
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
          <div className="col-span-3">
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

          {/* Input Camara de comercio */}
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="camaraComercio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Camara de comercio o Registro mercantil</FormLabel>
                  <FormControl>
                    <FileInputComponent field={field} onChange={ field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      </div>
  )
}