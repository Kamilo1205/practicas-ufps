'use server'

import prisma from "@/lib/prisma"
import { Empresa } from "@prisma/client"
import { unlink, writeFile } from "fs/promises"

import { revalidatePath } from "next/cache"
import { join } from "path"
import { guardarArchivoEnDrive } from "@/helpers/drive_api"

interface EmpresaData { 
  id                   :string, 
  nombre               :string,
  direccion            ?:string,
  NIT                  ?:string,
  telefono             ?:string,
  pais                 ?:string,
  departamento         ?:string,
  municipio            ?:string,
  email                ?:string,
  industria            ?:string,
  RUTUrl               ?:string,
  camaraComercio       ?:string, 
  registroMercantilUrl ?:string, 
  representanteLegalId ?:string,
}

/**
 * Actualiza los datos de una empresa ya registrada. O devuelve un error si la empresa no existe.
 * @param {EmpresaData} data
 * @returns {Promise<Empresa>} Empresa con los datos actualizados.
 */
export const guardarDatosEmpresa = async (data: EmpresaData): Promise<Empresa> => { 
  console.log('guardarDatosEmpresa', data)
  //TODO: Debe cambiarse a la tabla de usuarios.
  const usuarioExiste = await prisma.empresa.findFirst({
    where: {
      id: data.id
    }
  })
  console.log('usuarioExiste', usuarioExiste)
  if (!usuarioExiste) {
    throw new Error('El usuario no existe')
  }
  const actualizarDatos = await prisma.empresa.update({
    where: {
      id: data.id
    },
    data: {
      nombre: data.nombre,
      direccion: data.direccion,
      NIT: data.NIT,
      telefono: data.telefono,
      pais: data.pais, // Add the 'pais' property
      departamento: data.departamento,
      municipio: data.municipio,
      email: data.email,
      industria: data.industria,
      RUTUrl: data.RUTUrl,
      camaraComercioUrl: data.camaraComercio,
      representanteLegalId: data.representanteLegalId
    }
  })
  if (!actualizarDatos) {
    throw new Error('No se pudo actualizar los datos de la empresa')
  }
  revalidatePath("/empresa/registro")
  return actualizarDatos
}

//TODO: Cambiar el tipo de dato de file a File.
export const guardarArchivoEmpresa = async (file:File, nombre: string, nombreDeCarpeta:string): Promise<string> => { 
  //const archivo = file 
  console.log('guardarArchivo', nombre)
  
  try{
    if (!file ) {
      throw new Error('No se ha encontrado un archivo')
    }
    
    //TODO: Recibir el path y guardarlo en Google Drive.
    //const url = await guardarArchivoEnDrive(nombreDeCarpeta,nombre,file,"empresas")
    //console.log('Archivo guardado correctamente',url)
    //TODO: Esto no está borrando na.
    //await unlink(path) //Borra los archivos al finalizar.
    console.log('Archivo borrado correctamente')
    //return url
  } catch (error) {
    console.log('Error al guardar el archivo', error)
  }
  

  return `https://www.example.com/${nombre}.pdf`
}


/**
 *   const archivo: File | null = file as unknown as File
  console.log('guardarArchivo', archivo, nombre)
  if(!archivo) throw new Error('No se ha encontrado un archivo')

  const bytes = await archivo.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join(process.cwd(), 'camaraComercio.pdf')
  await writeFile(path, buffer)


  ****+
 
 const byteString = atob(file.split(',')[1])
  const mineString = file.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mineString });
 */


  /**
   * const archivo = file 
  console.log('guardarArchivo', nombre)
  
  try{
    if (file === null || file === undefined || file === '') {
      throw new Error('No se ha encontrado un archivo')
    }
    const srcToFile= (src:string, fileName:string, mimeType:string) =>{
      return (fetch(src)
        .then(function (res) { return res.arrayBuffer(); })

      );
    }
    const archivoB = await srcToFile(file, nombre, 'application/pdf')
    
    const path = join(process.cwd(), 'temp', nombre)
    const ruta = join(__dirname, `temp/${nombre}`)
console.log("AHHHH",ruta)
    await writeFile(ruta, Buffer.from(archivo,'base64url'))  
    //TODO: Recibir el path y guardarlo en Google Drive.
    const url = await guardarArchivoEnDrive(nombreDeCarpeta,nombre,path,"empresas")
    console.log('Archivo guardado correctamente', archivoB)
    //TODO: Esto no está borrando na.
    //await unlink(path) //Borra los archivos al finalizar.
    console.log('Archivo borrado correctamente')
    return url
  } catch (error) {
    console.log('Error al guardar el archivo', error)
  }
  

  return `https://www.example.com/${nombre}.pdf`
   */