'use server'

import { google } from "googleapis";
import googleApiKey from '../../googleApiKey.json'
import { createReadStream } from "fs";
import path from "path";
import { JWT } from "google-auth-library";

const SCOPE = ["https://www.googleapis.com/auth/drive"]
const PATH = process.cwd()
const FOLDERID = '1VUJ0LvbfI0T5-gNV34l31R1qN2_agLgU'
const EMPRESAS_FOLDER_ID = '1_01jGWKQrQ9SojPZW8UVuI2pp3VxE9t4'

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

const uploadeFile = async (authClient: JWT) => { 
  const drive = google.drive({ version: 'v3', auth: authClient });
  

  const media = {
    mineType: 'application/pdf',
    body: createReadStream('camaraComercio.pdf')
  }

  try {
    const folderId = await createFolder(authClient, 'Empresa1')
    if(!folderId) throw new Error('Error al crear la carpeta')
    const requestBody = {
      name: 'camaraComercio.pdf',
      fields: 'id',
      parents: [folderId]
    }
    const file = await drive.files.create({
      requestBody,
      media
    })
    console.log('File Id:', file.data.id);
    return file.data.id;
  }
  catch (error) { 
    console.log(error)
  }
}

const createFolder = async (authClient:JWT, folderName:string) => {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const requestBody = {
    name: folderName,
    parents: [EMPRESAS_FOLDER_ID],
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

export const guardarArchivoEnDrive = async (): Promise<string> => { 
  const id =  autorizar()
    .then((auth)=>uploadeFile(auth))
    .catch(console.error)
  
  if (!id) {
    throw new Error('Error al subir el archivo')
  }
  return `https://drive.google.com/file/d/${id}/view`
  
}


/**
 *   return new Promise((resolve, rejected) => {
    const drive = google.drive({ version: 'v3', auth: authClient });
    const fileMetaData = {
      name: 'mydrivetext.txt',
      parents: ['1bZoTbqCew34MGr1DfgczcA40ECM_QhKg'] // A folder ID to which file will get uploaded
    }
    drive.files.create({
      media: {
        body: createReadStream('mydrivetext.txt'), // files that will get uploaded
        mimeType: 'text/plain'
      },
      fields: 'id'
    }, function (error, file) {
      if (error) {
        return rejected(error)
      }
      resolve(file);
    })
  });
 */
