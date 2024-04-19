'use client'
import { useState } from "react"
import { FileInputComponent } from "../ui/FileInputComponent"


export const FormularioCargaPracticantesComponent = () => { 

  const [file, setFile] = useState<File | null>(null)
  
  const handleSubmit = (e: any) => { 
    e.preventDefault()
    console.log("FILE: ", file)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <FileInputComponent onChange={setFile} />
        <input type="submit" value="Enviar"
          className="bg-cyan-500 text-white p-2 rounded-md cursor-pointer ml-2"
        />
      </form>
    </div>
  )
}

export const CargarPracticanteComponent = () => {

  const [errores, setErrores] = useState({
    correo: {
      error: false,
      mensaje: ""
    }
  } )

  const validarFormulario = ({correo}:{correo:string}) => { 
    if (correo === "") { 
      return setErrores({correo: {error: true, mensaje: "El correo es requerido"}})
    }
    if(correo.includes("@") === false) { 
      return setErrores({correo: {error: true, mensaje: "El correo no es valido"}})
    }
    const patron = /^[a-zA-Z0-9._-]+@ufps\.edu\.co$/;
    if(!patron.test(correo)) { 
      return setErrores({correo: {error: true, mensaje: "El correo no es un correo institucional."}})
    }
    
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const { correo } = e.target
    validarFormulario({ correo: correo.value })
    if (errores.correo.error) { 
      return
    }
    console.log("ENVIANDO...")
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="correo">Correo del estudiante</label>
          <input
            type="email" id="correo" name="correo"
            className="w-full p-2 border border-gray-300 rounded-md"
            aria-errormessage="error-correo"
            onChange={() => setErrores({ ...errores, correo: { error: false, mensaje: "" } })}
          />
          {errores.correo && <p id="error-correo" className="text-red-500">{ errores.correo.mensaje}</p>}

        </div>

        <input type="submit" value="Registrar"
          className="bg-cyan-500 text-white p-2 rounded-md cursor-pointer mt-2"
        />
      </form>
    </div>
  )
}