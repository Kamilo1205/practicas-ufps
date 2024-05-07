'use client'

import { useEffect, useState } from "react"
import { CardComponent } from "../ui/CardComponent"
import { getPerfiles } from "@/storage/perfilPracticanteStorage"
import { TextSelectBadgeComponent } from "../ui/TextSelectBadges";

interface Item{
  id: string;
  label: string;
  conocimientos: {
    id: string;
    nombre: string;
    tecnologias: string[];
  }[]
}

interface Opcion {
  id: string
  label: string

}

interface Props { 
  perfil: Opcion[]
  setPerfil: (perfil: Opcion[]) => void
}
export const PerfilSolicitudComponent = ({ perfil, setPerfil }: Props) => { 
  
  const [items, setItems] = useState<Item[]>()
  
  const [selecciones, setSelecciones] = useState<Item[]>([
    {
      id: "",
      label: "",
      conocimientos: [
        {
          id: "",
          nombre: "",
          tecnologias: [""]
        }
      ]
    }
  ])
  console.log(selecciones)

  const onHandleChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => { 

    const itemId = e.target.value
    const item = items?.find((i) => i.id === itemId)
   
    const {label, id, conocimientos} = item || {label: "", id: "", conocimientos: []}

    let seleccionI = {
      id,
      label,
      conocimientos
    }
    const nuevaLista = selecciones.map((s, i) => {
      if(i === index) return seleccionI
      return s
    }
    )
    setSelecciones(nuevaLista)
  }

  const onHandleChangeConocimiento = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => { 
    const itemId = e.target.value
    const item = items?.find((i) => i.id === itemId)
    const {label, id, conocimientos} = item || {label: "", id: "", conocimientos: []}
    let seleccionI = {
      id,
      label,
      conocimientos
    }
    const nuevaLista = selecciones.map((s, i) => {
      if(i === index) return seleccionI
      return s
    }
    )
    setSelecciones(nuevaLista)
  
  }


  useEffect(() => {
    //TRAER LOS PERFILES DE PRACTICANTE DEL STORAGE
    getPerfiles().then((res) => {
      setItems(res)
    })
  }, [])  


  const agregarPerfil = (opcion: Opcion) => { 
    //if(perfil.find((o) => o.id === opcion.id)) return
    //setPerfil([...perfil, opcion])

    setSelecciones([...selecciones, {
      id: "",
      label: "",
      conocimientos: [
        {
          id: "",
          nombre: "",
          tecnologias: [""]
        }
      ]
    }])
  }

  const quitarPerfil = (opcion: Opcion) => {
    setPerfil(perfil.filter((o) => o.id !== opcion.id))
  }

  const handleSubtmit = (e: React.FormEvent<HTMLFormElement> ) => { 
    e.preventDefault()
    console.log(e.target)
   
  }

  return (
    <>
      <TextSelectBadgeComponent />

      <button
        className="bg-blue-500 text-white p-2 rounded-md mt-2"
        onClick={() => agregarPerfil({ id: "1", label: "Perfil 1" })}>Agregar nuevo perfil
      </button>

      <button
        className="bg-blue-500 text-white p-2 rounded-md mt-2"
      >
        Enviar solicitud
      </button>

      {
        selecciones.map((seleccion,index) => (
          <CardComponent
            key={`${index}-${seleccion.id}`}
            title={`${index + 1} Perfil de practicante `}
            description="Seleccione entre las siguientes habilidades, aquellas que se acoplen al perfil de practicante que está solicitando."
            cardContent={
              
              <form onSubmit={handleSubtmit}>
                <div>
                  <label className="font-semibold">Perfil</label>
                  <select
                    className="w-full border border-gray-300 rounded p-1"
                    onChange={(e) => onHandleChange(e, index)}
                    value={seleccion.id}
                    required
                  >
                    <option defaultValue={''} >Seleccione un perfil</option>
                    {items?.map((item) => (
                      <option key={`${index}-${item.id}`} value={item.id}>{item.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  {
                    selecciones[index].label !== ""
                    &&
                    <div className="mt-2">
                        <label className="font-semibold">Conocimientos</label>
                        <select className="w-full border border-gray-300 rounded p-1">
                          <option defaultValue={''} value={''}>Seleccione un conocimiento</option>
                          {items?.find((i) => i.id === selecciones[index].id)?.conocimientos.map((conocimiento) => (
                            <option key={`${index}-${conocimiento.id}`} value={conocimiento.id}>{conocimiento.nombre}</option>
                          ))}
                          <option value={'otro'}>Otro</option>
                        </select>
                    </div>  
                  }
                </div>
                {
                  <div>
                    {
                      selecciones[index].conocimientos[0].nombre !== ""
                      &&
                      <div className="mt-2">
                        <label className="font-semibold">Tecnologías</label>
                        <select className="w-full border border-gray-300 rounded p-1">
                          <option defaultValue={''} value={''}>Seleccione una tecnología</option>
                          {items?.find((i) => i.id === selecciones[index].id)?.conocimientos.find((c) => c.id === selecciones[index].conocimientos[0].id)?.tecnologias.map((tecnologia) => (
                            <option key={`${index}-${tecnologia}`} value={tecnologia}>{tecnologia}</option>
                          ))}
                          <option value={'otro'}>Otro</option>
                        </select>
                      
                      </div>
                    }
                  </div>
                }
                <button
                  className="bg-red-500 text-white p-2 rounded-md mt-2 mr-2"
                  onClick={() => setSelecciones(selecciones.filter((s, i) => i !== index))}
                >
                  Eliminar
                </button>
                </form>
              
            }
            cardFooter={<></>}
          />
        ))

    }
      
    </> 
    
  )
}

/**
 * <CheckboxReactHookFormMultiple items={items}
          title="Perfil del practicante"
          description="Seleccione entre las siguientes habilidades, aquellas que se acoplen al perfil de practicante que está solicitando."
          seleccionar={agregarPerfil}
          quitar={quitarPerfil}
        /> 
 */