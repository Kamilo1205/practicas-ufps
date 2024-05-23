

export interface Empresa { 

  id: string
  nombre: string
  direccion: string
  nit: string
  telefono: string
  pais: string
  departamento: string
  ciudad: string
  industria: string
  descripcion?: string
  representanteLegal: RepresentanteLegal
  rut: File | null
  camaraComercio: File | null
  convenio: File | null
  sector: string | null
  
}

export interface Usuario { }

export interface RepresentanteLegal {
  representanteNombre: string
  representanteEmail: string
  representanteTelefono: string
  representanteTipoDocumentoId: string
  representanteNumeroDocumentoIdentidad: string
  representanteFechaExpedicion: string
  representanteLugarExpedicion: string
  documentoIdentidad: File | null

 }

export interface TutorDeEmpresa { }

export interface SolicitudDePracticante { }