'use client'

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { DatosEmpresaSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CardComponent, FileInputComponent } from ".."

import { PaisEstadoCiudadFormHook } from "@/helpers/PaisEstadoCiudadFormHook"
import { Button } from "../ui/button"
import { Toaster, toast } from "sonner"
import { getSectoresConSubsectores } from "@/helpers/Indutrias"
import { DatosGeneralesEmpresa } from "./DatosGeneralesEmpresa"
import { DatosDireccionEmpresa } from "./DatosDireccionEmpresa"


import { Dialog } from 'primereact/dialog';
import { useEmpresaStorage } from "@/storage/empresaStorage"



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

const ArchivosEmpresa = ({ form }: any) => { 
  return (
    <div className="grid grid-cols-1">

      {/* Input Camara de comercio */}
      <div className="">
        <FormField
          control={form.control}
          name="camaraComercio"
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
      {/* Input RUT */}
      <div className="">
        <FormField
          control={form.control}
          name="rut"
          render={({ field }) => (
            <FormItem >
              <FormLabel>RUT</FormLabel>
              <FormControl>
                <FileInputComponent field={field} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>  
      )
}

export const DatosEmpresaForm = ({ setStage, }: Props) => {
  
  const [sectores,setSectores ] = useState<any>([])
  const EMPRESA_ID = "1"
  const [loading, setLoading] = useState(false)
  const {guardarFormulario} = useEmpresaStorage()


  const form = useForm<z.infer<typeof DatosEmpresaSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(DatosEmpresaSchema),
    defaultValues: {
      nit: '',
      nombre: '',
      telefono: '',
      sector: 'Privada',
      pais: 'Colombia',
      departamento: '',
      municipio: '',
      direccion: '',
      camaraComercio: null,
      rut: null,
      industria: ''
    }
  });

  const { paises, estados, ciudades } = PaisEstadoCiudadFormHook({
    paisSeleccionado: form.getValues().pais || "",
    estadoSeleccionado: form.getValues().departamento || "",
  });

  //console.log(form.getValues())
  const watcher = form.watch(['pais', 'departamento', 'municipio'])


  const onSubmit = async() => { 
    try {
      setLoading(true)
      const formData = form.getValues()
      console.log('Errores ', form.formState.errors)
      
      if (JSON.stringify(form.formState.errors) !== '{}' || !verificarValoresJSON(formData)) {
        return setLoading(false);
      }
      console.log('onSubmit',form.getValues())
      const nombreCarpeta = `${formData.nit}-${formData.nombre}`
 
      //Guardamos primero los archivos.
      //const camaraDeComercioUrl = await guardarArchivoEmpresa(formData.camaraComercio, `${formData.nit}-camaraComercio.pdf`, nombreCarpeta)
      //const RUTUrl = await guardarArchivoEmpresa(formData.rut,`${formData.nit}-rut.pdf`,nombreCarpeta)
      
      const empresa = {
        nombre: formData.nombre,
        direccion: formData.direccion,
        nit: formData.nit,
        telefono: formData.telefono,
        pais: formData.pais,
        departamento: formData.departamento,
        ciudad: formData.municipio,
        industria: formData.industria,
        rut: formData.rut ,
        camaraComercio: formData.camaraComercio,
        sector: formData.sector,
      }

      guardarFormulario(empresa) 
      setStage()
      console.log('Datos de la empresa guardados correctamente')

    } catch (error) { 
      console.log(error)
      toast.error('¡Ha ocurrido un error!')
      setLoading(false)
    }
  }
  useEffect(() => {
    getSectoresConSubsectores().then(resp => {

      const sectYSub = resp.map(sector => {
        return {
          key: sector.sector,
          value:sector.sector
        }
      })
      setSectores(sectYSub)
    })

    }
    , [])

  useEffect(() => { 
    console.log('Renderizando... 1')
  },
    [watcher])
  
    const [visible, setVisible] = useState(true)
  return (
      <div className="p-2">
      <div>
        <Dialog header="¡Bienvenido!" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
          <div>
            <p className="mb-2">
              A continuación deberá completar los siguientes formularios para poder llevar a cabo la solicitud de convenio. Como paso final deberá adjuntar el documento PDF de su solicitud. Antes de continuar, le recomendamos que lea atentamente el documento de solicitud de convenio y lo complete con sus respectivos datos.
            </p>
            <a href="/PPS02. modelo de convenio.docx" download={'PPS02. modelo de convenio.docx'}><span className="text-blue-400">Descargue aquí el documento de solicitud</span></a>
          </div>
        </Dialog>
      </div>

      <Toaster position="top-right" richColors />
      <h2 className="font-semibold text-2xl">Datos de la empresa</h2>
      <Form {...form} >
        <form className="flex flex-col flex-wrap" onSubmit={form.handleSubmit(onSubmit)}>
          <CardComponent 
            title="Datos generales de la empresa"
            description=""
            cardContent={<DatosGeneralesEmpresa form={form} sectores={ sectores} />}
            cardFooter={<></>}
          />
          
          <CardComponent
            title="Dirección de la empresa"
            description=""
            cardContent={
              <DatosDireccionEmpresa
                form={form}
                paises={paises}
                estados={estados}
                ciudades={ciudades}
            />}
            cardFooter={<></>}
          />

          <CardComponent
            title="Archivos de la empresa"
            description="Estos archivos son importantes para la realización del convenio."
            cardContent={<ArchivosEmpresa form={form} />}
            cardFooter={<></>}
         />
          
          
          <Button onClick={onSubmit} className={`self-end mt-5`} disabled={loading}>
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
        </form>
      </Form>
      </div>
  )
}

// <DigitosInputComponent maxLength={10} value={field.value} setValue={field.onChange} />