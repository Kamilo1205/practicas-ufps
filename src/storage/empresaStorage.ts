import {
  Empresa,
  RepresentanteLegal,
  SolicitudDePracticante,
  TutorDeEmpresa,
  Usuario
} from "./modelos"



export const registrarEmpresa = async(empresa:Empresa) => {
  

}

export const obtenerEmpresa = async (usuarioId: Usuario) => { 

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