//import sectores from './sectores.json';



export interface Sector {
  hits:                Hit[];
  nbHits:              number;
  page:                number;
  nbPages:             number;
  hitsPerPage:         number;
  exhaustiveNbHits:    boolean;
  exhaustiveTypo:      boolean;
  exhaustive:          Exhaustive;
  query:               string;
  params:              string;
  renderingContent:    RenderingContent;
  processingTimeMS:    number;
  processingTimingsMS: ProcessingTimingsMS;
  serverTimeMS:        number;
}

export interface Exhaustive {
  nbHits: boolean;
  typo:   boolean;
}

export interface Hit {
  sector:           string;
  subsector:        HitSubsector[];
  descripcion:      string;
  icono:            string;
  enlace:           string;
  objectID:         string;
  _highlightResult: HighlightResult;
}

export interface HighlightResult {
  sector:      Descripcion;
  subsector:   HighlightResultSubsector[];
  descripcion: Descripcion;
  icono:       Descripcion;
  enlace:      Descripcion;
}

export interface Descripcion {
  value:        string;
  matchLevel:   MatchLevel;
  matchedWords: any[];
}

export enum MatchLevel {
  None = "none",
}

export interface HighlightResultSubsector {
  nombre: Descripcion;
  ciiu:   Descripcion;
  texto:  Descripcion;
}

export interface HitSubsector {
  nombre: string;
  ciiu:   string;
  texto:  string;
}

export interface ProcessingTimingsMS {
  _request:   Request;
  afterFetch: AfterFetch;
  extensions: number;
  total:      number;
}

export interface Request {
  roundTrip: number;
}

export interface AfterFetch {
  format: Format;
}

export interface Format {
  highlighting: number;
  total:        number;
}

export interface RenderingContent {
}

const sectoresPromise = async () => {
  const sectorUrl = "https://raw.githubusercontent.com/joferrer/Indutrias/main/sectores.json"
  const resp: Sector = await fetch(sectorUrl).then((response )=> response.json())
  return resp
}

export const getSectoresConSubsectores = async() => { 
  const sectores = await sectoresPromise()
  return sectores.hits.map((sector) => {
    return {
      sector: sector.sector,
      subsectores: sector.subsector.map((subsector) => {
        return {
          nombre: subsector.nombre,
          ciiu: subsector.ciiu,
          texto: subsector.texto
        }
      })
    }
  }
  )

}