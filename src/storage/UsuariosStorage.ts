import { error } from 'console';
import {create} from 'zustand'


export interface RegistroResponse {
  usuario:      Usuario;
  accessToken:  string;
  refreshToken: string;
  statusCode?: number;
  message?:    string;
}

export interface Usuario {
  email:              string;
  displayName:        null;
  imagenUrl:          null;
  estaActivo:         boolean;
  emailConfirmado:    null;
  estaRegistrado:     boolean;
  roles:              Role[];
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}

export interface Role {
  id:                 string;
  nombre:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}


interface User {
  usuario: Usuario
  accessToken?: string
  refreshToken?: string
  error?: string
  iniciarSeccion: (data: any) => void
  solicitarToken: (email: string, password: string) => Promise<void>
  registarEmpresa: (email:string,password:string) => Promise<void>
}

const URL = 'http://localhost:3000'

const registarURL = `${URL}/auth/register`


export const useUsuariosStorage = create<User>((set,get) => ({
  usuario: {
    email: '',
    displayName: null,
    imagenUrl: null,
    estaActivo: false,
    emailConfirmado: null,
    estaRegistrado: false,
    roles: [],
    id: '',
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  },
  error: '',
  accessToken: '',
  refreshToken: '',

  iniciarSeccion:  (data:RegistroResponse) => { 
    console.log('Iniciando seccion')
    set({ 
      usuario: data.usuario,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      error : ''
    })
  },
  solicitarToken: async (email: string, password: string) => {
    console.log('Solicitando token')
    const token = await fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
        contentType: 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data:RegistroResponse = await token.json()
    console.log(data)

    if (!data) {
      console.log('No se pudo iniciar seccion')
      return set({error: 'No se pudo iniciar seccion'})
    }

    if (data.statusCode === 401) { 
      console.log('Credenciales incorrectas o el usuario no está autorizado')
      return set({error: 'Sus credenciales son incorrectas o no está autorizado para acceder a esta sección'})
    }

    console.log('Seccion iniciada')
    get().iniciarSeccion(data)

   },
  registarEmpresa: async (email,password) => {
    console.log('Registrando usuario', email, password)
    const empresaRegistrada = await fetch(registarURL, {
      method: 'POST',
      headers: {
        contentType: 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data:RegistroResponse = await empresaRegistrada.json()
    console.log(data)

    if (!data) {
      console.log('No se pudo registrar')
      return set({error: 'No se pudo registrar'})
    }

    if (data.statusCode) {
      console.log('Error al registrar')
      return set({error: 'Error al registrar: ' + data.message})
    }

    console.log('Usuario registrado')
    get().iniciarSeccion(data)

  },
}))