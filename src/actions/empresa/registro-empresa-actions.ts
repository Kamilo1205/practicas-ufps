'use server'

import prisma from "@/lib/prisma"
import { Empresa } from "@prisma/client"

import { revalidatePath } from "next/cache"

interface EmpresaData { 
  id                   :string, 
  nombre               ?:string,
  direccion            ?:string,
  NIT                  ?:string,
  telefono             ?:string,
  pais                 ?:string,
  departamento         ?:string,
  municipio            ?:string,
  email                ?:string,
  industria            ?:string,
  RUTUrl               ?:string,
  camaraComercioUrl    ?:string, 
  registroMercantilUrl ?:string, 
  representanteLegalId ?:string,
}

/**
 * Actualiza los datos de una empresa ya registrada. O devuelve un error si la empresa no existe.
 * @param data 
 * @returns {Promise<Empresa>} Empresa con los datos actualizados.
 */
export const guardarDatosEmpresa = async (data: EmpresaData): Promise<Empresa> => { 
  console.log("QUE PASA")
  console.log('guardarDatosEmpresa', data)
  const usuarioExiste = await prisma.usuario.findFirst({
    where: {
      email: data.email
    }
  })

  if (!usuarioExiste) {
    throw new Error('El usuario no existe')
  }

  const actualizarDatos = await prisma.empresa.update({
    where: {
      id: data.id
    },
    data
  })
  if (!actualizarDatos) {
    throw new Error('No se pudo actualizar los datos de la empresa')
  }
  revalidatePath("/empresa/registro")
  return actualizarDatos
}