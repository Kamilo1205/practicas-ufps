import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { Input } from "../ui/input"
import { DatosRepresentanteLegalSchema } from "@/schemas/DatosRepresentanteLegalScheme"
import { FileInputComponent } from "../ui/FileInputComponent"


export const DatosRepresentanteLegal = () => { 

  const form = useForm<z.infer<typeof DatosRepresentanteLegalSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(DatosRepresentanteLegalSchema)
  })
    return (
        <div>
        <h1>Datos del representante legal</h1>

        <div className="p-2">
          <Form {...form}>
            <form className="flex flex-col flex-wrap">
              <div className="flex flex-wrap mb-2">
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
              {/* Documento de identidad PDF */}
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
            </form>
          </Form>
          </div>
    </div>
    )
}

/**
 *  <div className="flex flex-wrap mb-2">
                
              </div>
 */