'use client'
import { getPerfiles } from "@/storage/perfilPracticanteStorage";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  label: string;
  conocimientos: {
    id: string;
    nombre: string;
    tecnologias: string[];
  }[]
}


export const useSolicitudPracticas = () => {
  const [items, setItems] = useState<Item[]>()

  const [selecciones, setSelecciones] = useState<Item[]>([
    {
      id: "",
      label: "",
      conocimientos: []
    }
  ])
  console.log(selecciones)

  useEffect(() => {
    //TRAER LOS PERFILES DE PRACTICANTE DEL STORAGE
    getPerfiles().then((res) => {
      setItems(res)
    })
  }, [])

  const guardarPerfil = (idPerfil: string, index: number) => {

   
    const item = items?.find((i) => i.id === idPerfil)

    const { label, id, conocimientos } = item || { label: "", id: "", conocimientos: [] }

    let seleccionI = {
      id,
      label,
      conocimientos:[]
    }
    const nuevaLista = selecciones.map((s, i) => {
      if (i === index) return seleccionI
      return s
    }
    )
    setSelecciones(nuevaLista)
  }


  const getConocimientosDePerfil = (idPerfil: string) => {
    return items?.find((i) => i.id === idPerfil)?.conocimientos
  }

  const getTecnologiasPorConocimiento = (idPerfil: string, idConocimiento: string) => {
    return items?.find((i) => i.id === idPerfil)?.conocimientos.find((c) => c.id === idConocimiento)?.tecnologias
  }

  const guardarConocimiento = (idPerfil: string, idConocimiento: string) => { 
   
    const item = items?.find((i) => i.id === idPerfil)
    const conocimiento = item?.conocimientos.find((c) => c.id === idConocimiento)
    const { nombre, id, tecnologias } = conocimiento || { nombre: "", id: "", tecnologias: [] }
    let seleccionI = {
      id,
      nombre,
      tecnologias:[]
    }
    const nuevaLista = selecciones.map((s, i) => {
      if (s.id === idPerfil) return {
        id: s.id,
        label: s.label,
        conocimientos: [...s.conocimientos,seleccionI]
      }
      return s
    })
    console.log('nl',nuevaLista)
     setSelecciones(nuevaLista)
  }

  const guardarTecnologia = (tecnologia: string, idPerfil: string, idConocimiento: string) => {
    const nuevaLista = selecciones.map((s, i) => {
      if (s.id === idPerfil) return {
        id: s.id,
        label: s.label,
        conocimientos: s.conocimientos.map((c, j) => {
          if (c.id === idConocimiento) return {
            id: c.id,
            nombre: c.nombre,
            tecnologias: [...c.tecnologias,tecnologia]
          }
          return c
        })
      }
      return s
    })
    if (nuevaLista && nuevaLista.length !== 0) setSelecciones(nuevaLista)
  }
  
  const quitarTecnologia = (idPerfil: string, idConocimiento: string, tecnologia: string) => {
    //Buscar el perfil con la id dada, luego encontrar el conocimiento con la id dada, luego encontrar la tecnologia y eliminarla.
    const tecnologias = selecciones.find((s) => s.id === idPerfil)
      ?.conocimientos.find((c) => c.id === idConocimiento)
      ?.tecnologias.filter((t) => t !== tecnologia) || []

    //Actualizar la lista de selecciones
    const nuevaLista = selecciones.map((s) => {
      if (s.id === idPerfil) {
        return {
          ...s,
          conocimientos: s.conocimientos.map((c) => {
            if (c.id === idConocimiento) {
              return {
                ...c,
                tecnologias
              }
            }
            return c
          })
        }
      }
      return s
    })
    setSelecciones(nuevaLista)
  }

  const getTodasLasTecnologiasDeSelecciones = () => { 
    let tecnologias = selecciones.map(s =>
      s.conocimientos.map(c => getTecnologiasPorConocimiento(s.id,c.id))).flat(2)

    return tecnologias
  }

  return {
    items,
    setItems,
    selecciones,
    setSelecciones,
    getConocimientosDePerfil,
    getTecnologiasPorConocimiento,
    guardarTecnologia,
    guardarPerfil,
    guardarConocimiento,
    quitarTecnologia,
    getTodasLasTecnologiasDeSelecciones
  }
}