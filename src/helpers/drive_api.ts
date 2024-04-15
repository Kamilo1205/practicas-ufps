'use server'

import path from "path";
import { createReadStream } from "fs";

import { google } from "googleapis";
import { JWT } from "google-auth-library";
import googleApiKey from '../../googleApiKey.json'

const SCOPE = ["https://www.googleapis.com/auth/drive"]
const PATH = process.cwd()

//TODO: Estos ids deberian estar en un archivo de configuración. .env quizás.
const FOLDERS = {
  'raiz': '1VUJ0LvbfI0T5-gNV34l31R1qN2_agLgU',
  'empresas': '1_01jGWKQrQ9SojPZW8UVuI2pp3VxE9t4',
}

type FolderKey = keyof typeof FOLDERS;


const autorizar = async () => { 
  const jwtClient = new google.auth.JWT(
    googleApiKey.client_email,
    path.join(PATH,'googleApiKey.json'),
    googleApiKey.private_key,
    SCOPE
  )
  await jwtClient.authorize()

  return jwtClient
}
/**
 * Crea un archivo en Google Drive.
 * @param authClient Objeto de autenticación.
 * @param folderName Nombre de la carpeta donde se guardará el archivo.
 * @param fileName Nombre del archivo.
 * @throws Error si no se puede crear la carpeta.
 * @returns {Promise<string>} Id del archivo creado.
 */
const uploadeFile = async (authClient: JWT,folderName:string, fileName:string,file:File, parentFolder:FolderKey) => { 
  const drive = google.drive({ version: 'v3', auth: authClient });
  
  //TODO: Cambiar esto por un archivo real.
  const ruta = path.join(__dirname, `temp/${fileName}`)
  //console.log('Ruta:', pathc) 
  const media = {
    mimeType: 'application/pdf',
    body: file
  }

  try {
    const folders = await searchFoldersInDrive(authClient, folderName,parentFolder)
    //Buscamos si la carpeta ya existe. Si no la creamos.
    const folderId = folders?.length > 0 ? folders[0].id :
      await createFolder(authClient, folderName, 'empresas') 
  
    if(!folderId) throw new Error('Error al crear la carpeta')
    const requestBody = {
      name: fileName,
      fields: 'id',
      parents: [folderId]
    }
    const file = await drive.files.create({
      requestBody,
      media
    })
    console.log('File Id CrenadoFile:', file.data.id);
    return file.data.id;
  }
  catch (error) { 
    console.log(error)
  }
}

/**
 * Crea una carpeta en Google Drive.
 * @param authClient Objeto de autenticación
 * @param folderName Nombre de la carpeta que se quiere crear.
 * @param parentFolderId Id de la carpeta padre.
 * @returns {Promise<string>} Id de la carpeta creada.
 */
const createFolder = async (authClient: JWT, folderName: string, parentFolder: FolderKey) => {
  const drive = google.drive({ version: 'v3', auth: authClient })
  const parentFolderId = FOLDERS[parentFolder]
  const requestBody = {
    name: folderName,
    parents: [parentFolderId],
    mimeType: 'application/vnd.google-apps.folder',
  }

  try {
    const driveFolder = await drive.files.create({
      requestBody,
      fields: 'id',
    })
    console.log('File Id:',driveFolder.data.id);
    return driveFolder.data.id;
  }
  catch (error) {
    console.log(error)
  }  
}

/**
 * Guarda un archivo en Google Drive.
 * @param folderName Carpeta donde se guardará el archivo.
 * @param fileName Nombre del archivo.
 * @param parentFolder Carpeta donde se encuentra la carpeta donde se guardará el archivo.
 * @returns {string} URL del archivo guardado.
 */
export const guardarArchivoEnDrive = async (folderName: string, fileName: string, file:File,parentFolder:FolderKey): Promise<string> => { 
  //TODO: Ahora toca guardar los arhivos guardados en la carpeta temp en Google Drive.
  const id =  await (autorizar()
    .then((auth)=>uploadeFile(auth,folderName,fileName,file,parentFolder))
    .catch(console.error))
  
  if (!id) {
    throw new Error('Error al subir el archivo')
  }
  return `https://drive.google.com/file/d/${id}/view`
  
}

//TODO: Tengo la sospecha de que el nextjs está cacheando las respuestas de la API de Google Drive. 
/**
 * Busca una carpeta en Google Drive. Aunque en realidad busca cualquier archivo o carpeta.
 * @param authClient Objeto de autenticación.
 * @param folderName Carpeta que se quiere buscar.
 * @param parentFolder 'raiz' o 'empresas'. Carpeta donde se buscará la carpeta.
 * @throws Error si no se puede buscar la carpeta debido a un error.
 * @returns {Promise<{name: string, id: string}[]>} Arreglo con los nombres e ids de los archivos encontrados. Si no hay nada retorna un arreglo vacío.
 */
const searchFoldersInDrive = async (authClient: JWT, folderName: string, parentFolder: FolderKey) => { 
  try {
    console.log('Buscando carpeta', folderName)
    const drive = google.drive({ version: 'v3', auth: authClient });
    const parentFolderId = FOLDERS[parentFolder]
    const res = await drive.files.list({
      q: `name = '${folderName}' and '${parentFolderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    if (files === undefined) {
      throw new Error('No se encontró la carpeta')
    }
    if (files.length === 0) {
      console.log('No hay archivos que mostrar.');
      return [];
    }

    console.log('Files:');
    const resp = files.map((file) => {
      console.log(`${file.name} (${file.id})`);
      return {
        name: file.name,
        id: file.id
      }
    });
    return resp

  } catch (error) {
    console.log(error)
    throw new Error(`Error al buscar la carpeta: ${error}`)
  }
}

