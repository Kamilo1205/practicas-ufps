'use client'

import { get } from "http";
import { CardComponent } from "../ui/CardComponent"
import { useSolicitudPracticas } from "@/helpers/hookSolicitudPracticas";

interface Opcion {
  id: string
  label: string

}

interface Props { 
  perfil: Opcion[]
  setPerfil: (perfil: Opcion[]) => void
}
export const PerfilSolicitudComponent = ({ perfil, setPerfil }: Props) => { 
  
  const {
    items,
    selecciones,
    setItems,
    setSelecciones,
    guardarPerfil,
    guardarTecnologia,
    guardarConocimiento,
    getConocimientosDePerfil,
    getTecnologiasPorConocimiento,
  } = useSolicitudPracticas()

  const onChangePerfil = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => { 
    const itemId = e.target.value
    guardarPerfil(itemId, index)
  }    


  const agregarPerfil = (opcion: Opcion) => { 
    //if(perfil.find((o) => o.id === opcion.id)) return
    //setPerfil([...perfil, opcion])

    setSelecciones([...selecciones, {
      id: "",
      label: "",
      conocimientos: []
    }])
  }

  const quitarPerfil = (opcion: Opcion) => {
    setPerfil(perfil.filter((o) => o.id !== opcion.id))
  }
  const quitarConocimiento = (idPerfil: string, idConocimiento: string) => {
    const conocimientos = selecciones.find((s) => s.id === idPerfil)?.conocimientos.filter((c) => c.id !== idConocimiento) || []
    const nuevaLista = selecciones.map((s) => {
      if (s.id === idPerfil) {
        return { ...s, conocimientos }
      }
      return s
    })
    setSelecciones(nuevaLista)
  }

  

  const handleSubtmit = (e: React.FormEvent<HTMLFormElement> ) => { 
    e.preventDefault()
    console.log(e.target)
   
  }

  return (
    <>

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
                    onChange={(e) => onChangePerfil(e, index)}
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
                    <div className="mt-2 justify-center">
                        <label className="font-semibold">Conocimientos</label>

                        {
                          getConocimientosDePerfil(selecciones[index].id)
                            ?.map((conocimiento) => 
                              <div key={conocimiento.id}>
                                <input
                                  type="checkbox"
                                  value={conocimiento.id}
                                  checked={ selecciones[index].conocimientos.find(c => c.id === conocimiento.id) ? true : false}
                                  onChange={
                                    () => selecciones[index].conocimientos.find(c => c.id === conocimiento.id) === undefined ?
                                    guardarConocimiento(seleccion.id, conocimiento.id)
                                      : quitarConocimiento(seleccion.id, conocimiento.id)
                                  }
                                />
                                <label className="ml-1">{conocimiento.nombre}</label>
                          </div>
                          )
                      }
                        
                    </div>  
                  }
                </div>
                {
                  <div>
                    {
                      selecciones[index].conocimientos.length !== 0
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

         <select className="w-full border border-gray-300 rounded p-1" multiple >
                          <option defaultValue={''} value={''}>Seleccione un conocimiento</option>
                          {items?.find((i) => i.id === selecciones[index].id)?.conocimientos.map((conocimiento) => (
                            <option key={`${index}-${conocimiento.id}`} value={conocimiento.id}>{conocimiento.nombre}</option>
                          ))}
                          <option value={'otro'}>Otro</option>
                        </select>
 */