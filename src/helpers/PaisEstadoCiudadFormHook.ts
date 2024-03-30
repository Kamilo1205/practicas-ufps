import { useEffect, useState } from "react";
import { getCiudadesPorEstado, getEstadosPorPais, getPaises } from ".";

const getListaDePaises = async () => {
  const paises = await getPaises()
  return paises.map((pais) => {
    return {
      key: pais.id,
      value: pais.nombre,

    }
  })
}

interface Props{
  paisSeleccionado?: string,
  estadoSeleccionado?: string,
  ciudadSeleccionada?: string,
}

export const PaisEstadoCiudadFormHook = ({paisSeleccionado="",estadoSeleccionado="",ciudadSeleccionada=""}:Props) => { 

  const [paises, setPaises] = useState<{ key: string; value: string; }[]>([]);
  const [estados, setEstados] = useState<{ key: string; value: string; }[]>([])
  const [ciudades, setCiudades] = useState<{ key: string; value: string; }[]>([])

  useEffect(() => {
    if (paises.length === 0) {
      getListaDePaises().then((paises) => {
        setPaises(paises)
      })
    }
  }, [])

  useEffect(() => { 
    getEstadosPorPais(paisSeleccionado).then((estados) => {
      const estadosData = estados?.map((estado) => {
        return {
          key: estado.id,
          value: estado.nombre
        }
      })
      setEstados(estadosData || [])
    })
  }, [paisSeleccionado])

  useEffect(() => {
    getCiudadesPorEstado(paisSeleccionado, estadoSeleccionado).then((ciudades) => { 
      const ciudadesData = ciudades?.map((ciudad) => {
        return {
          key: ciudad.id,
          value: ciudad.nombre
        }
      })
      setCiudades(ciudadesData || [])
    })
  }, [estadoSeleccionado,paisSeleccionado])

  return {
    paises,
    estados,
    ciudades
  }
}