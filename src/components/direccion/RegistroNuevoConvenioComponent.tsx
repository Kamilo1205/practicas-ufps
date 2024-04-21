'use client'

import { useState } from "react"
import { FileInputComponent } from "../ui/FileInputComponent"
import { LabelConInfo } from "../ui/LabelConInfo"
import { Toaster, toast } from "sonner"



export const RegistroNuevoConvenio = () => {


  const [file, setFile] = useState<File | null>(null)
  const [errores, setErrores] = useState({
    nit: { error: false, mensaje: "" },
    fecha: { error: false, mensaje: "" },
    documentoConvenio: { error: false, mensaje: "" },
    correo: { error: false, mensaje: "" }
  })

  const validar = ({ nit, fecha, correo,file }: any) => { 
    // Expresión regular para verificar el formato XXXXXXXXX-X
    const formatoEspecifico = /^[0-9]{9}-[0-9]$/;
    // Expresión regular para verificar que solo se ingresen números
    const soloNumeros = /^[0-9]+$/;

    if (nit === '') {
      setErrores({ ...errores, nit: { error: true, mensaje: "En NIT es requerido" } })
    }
    else if (!soloNumeros.test(nit) && !formatoEspecifico.test(nit)) {
      setErrores({ ...errores, nit: { error: true, mensaje: 'El NIT deben ser solo números o en formato XXXXXXXXX-X' } })
    }
    else if (fecha === '') {
      setErrores({...errores, fecha: {error:true,mensaje:'La fecha es requerida.'} })
    }
    else if (correo === '') { 
      setErrores({...errores, correo: {error:true,mensaje:'El correo es requerido.'} })
    }
    else if (file === null || file === '') {
      setErrores({...errores, documentoConvenio: {error:true,mensaje:'El documento es requerido.'} })
    }
    else if (file !== 'application/pdf') {
      setErrores({...errores, documentoConvenio: {error:true,mensaje:'El documento debe ser un archivo PDF.'} })
    }
    
    else {
      return false
    }
    return true
  }

  const cargarArchivo = (file: File) => { 
    setFile(file)
    setErrores({...errores, documentoConvenio: {error:false,mensaje:''} })
  }

  const onSubmit = (e: any) => { 
    e.preventDefault()
    const { nit, fecha,correo } = e.target
    const errorEncontrado = validar({ nit: nit.value, fecha: fecha.value, file: file?.type ,correo:correo.value})
    if (errorEncontrado) { 
      return
    }
    console.log('enviando...', nit.value, fecha.value, correo.value, file?.type)
    const enviando  = false
    return enviando ? toast.success('Convenio registrado exitosamente.') : toast.error('Error al registrar el convenio.')
  }

  return (
    <div>
      <Toaster position="top-right" richColors />
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <LabelConInfo label="Nit de la empresa" info="El NIT debe ser solo números o en formato XXXXXXXXX-X donde X son dígitos entre 0-9." />

            <input
              type="text" id="nit" name="nit"
              className="w-full p-2 border border-gray-300 rounded-md"
              aria-errormessage="error-nit"
              onChange={() => setErrores({ ...errores, nit: {error:false,mensaje:""} })}
            />
            {errores.nit.error && <p id="error-nombre" className="text-red-500">{errores.nit.mensaje }</p>}
              
          </div>
          
          <div>
            <label htmlFor="fecha">Fecha de inicio del convenio</label>
            <input type="date" id="fecha" name="fecha"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={() => setErrores({ ...errores, fecha: {error:false,mensaje:''} })}

            />
            {errores.fecha.error && <p className="text-red-500">{ errores.fecha.mensaje}</p>}
          </div>
          <div>
            <LabelConInfo label="Correo de la empresa" info="Este es el correo al cual se le enviará la notificación para que registre sus datos." />

            <input
              type="email" id="correo" name="correo"
              className="w-full p-2 border border-gray-300 rounded-md"
              aria-errormessage="error-correo"
              onChange={() => setErrores({ ...errores, correo: { error: false, mensaje: "" } })}
            />
            {errores.correo.error && <p id="error-correo" className="text-red-500">{errores.correo.mensaje}</p>}

          </div>
          
          <div>
            <label htmlFor="file">Documento de convenio Final</label>
            <FileInputComponent onChange={cargarArchivo}/>
            {errores.documentoConvenio.error && <p className="text-red-500">{errores.documentoConvenio.mensaje}</p>}
          </div>

        </div>
       <input type="submit" value="Enviar" className="bg-cyan-500 text-white p-2 rounded-md cursor-pointer mt-5 left-0" /> 
      </form>
    </div>
  )
}

/**
 * <div>
            <label htmlFor="tipo">Tipo de convenio</label>
            <select id="tipo" name="tipo" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="1">Acuerdo de cooperación</option>
              <option value="2">Convenio de prácticas</option>
              <option value="3">Convenio de investigación</option>
            </select>
          </div>

          <div>
            <LabelConInfo label="Correo de la empresa" info="Este es el correo al cual se le enviará la notificación para que registre sus datos." />

            <input
              type="text" id="correo" name="correo"
              className="w-full p-2 border border-gray-300 rounded-md"
              aria-errormessage="error-correo"
              onChange={() => setErrores({ ...errores, nit: { error: false, mensaje: "" } })}
            />
            {errores.nit.error && <p id="error-nombre" className="text-red-500">{errores.nit.mensaje}</p>}

          </div>
 */