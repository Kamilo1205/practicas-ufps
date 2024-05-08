import { ca } from "date-fns/locale"
import {
  Empresa,
  RepresentanteLegal,
  SolicitudDePracticante,
  TutorDeEmpresa,
  Usuario
} from "./modelos"



export const registrarEmpresa = async(empresa:Empresa) => {
  

}

export const obtenerEmpresa = async (usuarioId: string) => { 
  const URL = 'http://localhost:3000'
  const peticion = await (await fetch(URL + '/empresa/' + usuarioId)).json()
  const empresa = {
    id: peticion.id,
    nit: peticion.nit,
    nombre: peticion.nombre,
    rut: peticion.rut,
    direccion: peticion.direccion,
    sector: peticion.sector,
    telefono: peticion.telefono,
    email: peticion.email,
    camaraComercio: peticion.camaraComercio,
    representanteLegal:{
        nombre: peticion.representanteLegal.nombre,
        apellido: peticion.representanteLegal.apellido,
        telefono: peticion.representanteLegal.telefono,
        email: peticion.representanteLegal.email,
        documento: peticion.representanteLegal.documento
      
    },
    convenio: {
      estado: 'pendiente',
      fechaInicio: new Date(),
      documento: null
    }
  }
  return empresa
}


export const registrarRepresentanteLegal = async (representanteLegal: RepresentanteLegal) => {

}
 
export const registrarSolicitudDeConvenio = async (usuario: Usuario, file:File) => {

}

export const registrarTutorDePractica = async (usuario: TutorDeEmpresa) => { }


export const obtenerTutoresDePractica = async (empresa: Empresa) => { }

export const inhabilitarTutorDePractica = async (tutor: TutorDeEmpresa) => { }

export const obtenerPracticasDeLaEmpresa = async (empresa: Empresa) => { }

export const registarSolicitudDePracticante = async (empresaId: string, solicitud:SolicitudDePracticante) => { }

export const obtenerSolicitudesDePracticante = async (empresa: Empresa) => { }

export const cancelarSolicitudDePracticante = async (solicitudId: string) => { }