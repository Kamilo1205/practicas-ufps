'use client'

import { useState } from "react"


export const RegistroNuevoConvenio = () => {

  const [errores, setErrores] = useState({
    nombre: false,
    fecha: false
  })

  const validar = ({nombre,fecha}:any) => { 
    if (nombre === '') {
      setErrores({ ...errores, nombre: true })
    }
    if (fecha === '') {
      setErrores({...errores, fecha: true })
    }
  }

  const onSubmit = (e: any) => { 
    e.preventDefault()
    const { nombre, fecha } = e.target
    validar({ nombre: nombre.value, fecha: fecha.value })
    console.log('enviando...', nombre.value, fecha.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre">NIT de la empresa</label>
            <input
              type="text" id="nombre" name="nombre"
              className="w-full p-2 border border-gray-300 rounded-md"
              aria-errormessage="error-nombre"
              onChange={() => setErrores({ ...errores, nombre: false })}
            />
            {errores.nombre && <p id="error-nombre" className="text-red-500">El nombre es requerido</p>}
              
          </div>
          <div>
            <label htmlFor="fecha">Fecha de inicio del convenio</label>
            <input type="date" id="fecha" name="fecha"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={() => setErrores({ ...errores, fecha: false })}

            />
            {errores.fecha && <p className="text-red-500">La fecha es requerida</p>}
          </div>
          
          
          

        </div>
       <input type="submit" value="Enviar" className="bg-cyan-500 text-white p-2 rounded-md cursor-pointer mt-5" /> 
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
 */