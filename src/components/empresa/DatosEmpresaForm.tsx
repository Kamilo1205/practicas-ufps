'use client'

import { DatosEmpresaSchema } from "@/schemas/DatosEmpresaSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { TooltipComponent } from ".."
import Image from "next/image"

import InfoIcon from '/public/info.svg'

export const DatosEmpresaForm = () => { 
  const form = useForm<z.infer<typeof DatosEmpresaSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(DatosEmpresaSchema)
  })
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
                        content="Tenga en cuenta que si el telefono no es Colombia, debe agregar el código de país. Ejemplo: +1 para Estados Unidos"
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
        </form>
      </Form>
      </div>
  )
}