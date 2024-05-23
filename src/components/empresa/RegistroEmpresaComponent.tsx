'use client'
import { use, useState } from "react"
import { DatosEmpresaForm } from "./DatosEmpresaForm"
import { DatosRepresentanteLegal } from "./DatosRepresentanteLegal"
import { DatosConvenio } from "./DatosConvenio"

import { Steps } from 'primereact/steps';
import { PrimeReactProvider } from "primereact/api"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useUsuariosStorage } from "@/storage/UsuariosStorage"
import { obtenerEmpresa, useEmpresaStorage } from "@/storage/empresaStorage"
import { redirect } from "next/navigation"

const items = [
  { label: 'Datos de la empresa' },
  { label: 'Datos del representante legal' },
  { label: 'Solicitud de Convenio' }

]


export const RegistroEmpresaComponent = () => { 
  
  const { usuario } = useUsuariosStorage();
  const { empresa } = useEmpresaStorage()
  const { nit, representanteLegal, convenio } = empresa
  const [stage, setStage] = useState(!nit ? 0 : !representanteLegal.representanteEmail ? 1 : !convenio ? 2 : 3)

  if (stage === 3) {
    redirect('/empresa')
  }


  const nextStage = () => {
    { /* //TODO: Controlar el max next. */ }
    if (stage === 2) return;
    setStage(stage + 1)
  }

  const backStage = () => {
    if (stage === 0) return
    setStage(stage - 1)
  }
  return (
    <div className="flex flex-col px-20 py-10">
      <PrimeReactProvider>
        <Steps model={items} activeIndex={stage} />
      </PrimeReactProvider>
      <div className="flex flex-col mb-5">
        {
          stage === 0 ? <DatosEmpresaForm setStage={nextStage} /> :
            stage === 1 ? <DatosRepresentanteLegal
              nextStage={nextStage}
              backStage={backStage}
            /> :
              <DatosConvenio
                backStage={backStage}
              />
        }
    

      </div>



    </div>
  )
}
