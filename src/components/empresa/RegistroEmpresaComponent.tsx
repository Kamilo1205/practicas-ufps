'use client'
import { useState } from "react"
import { DatosEmpresaForm } from "./DatosEmpresaForm"
import { DatosRepresentanteLegal } from "./DatosRepresentanteLegal"
import { DatosConvenio } from "./DatosConvenio"

import { Steps } from 'primereact/steps';
import { PrimeReactProvider } from "primereact/api"
import "primereact/resources/themes/lara-light-cyan/theme.css";

const items = [
  { label: 'Datos de la empresa' },
  { label: 'Datos del representante legal' },
  { label: 'Solicitud de Convenio' }

]

export const RegistroEmpresaComponent = () => { 
  const [stage, setStage] = useState(1)

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

/**
 *     <div className="flex space-x-10">
          {stage > 1 ? <Button onClick={backStage}>Atras</Button> : null}         
        </div >

<div className="mr-10 w-96 flex flex-col space-y-10">
        <div className={`rounded  p-3 ${stage === 1 && 'bg-red-50'}`}>
          <h2 className="font-semibold">
            Datos de la empresa
          </h2>
          <p className="text-gray-800 text-sm mt-1 leading-6">
            Por favor, complete los siguientes campos con la información de su empresa.
          </p>
        </div>
        <div className={`rounded  p-3 ${stage === 2 && 'bg-red-50'}`}>
          <h2 className="font-semibold">
            Datos del representante legal.
          </h2>
          <p className="text-gray-800 text-sm mt-1 leading-6">
            Complete los datos de la persona que representa legalmente a la empresa.
          </p>
        </div>
        <div className={`rounded  p-3 ${stage === 3 && 'bg-red-50'}`}>
          <h2 className="font-semibold">
            Documento del convenio
          </h2>
          <p className="text-gray-800 text-sm mt-1 leading-6">
            Si la empresa ya cuenta con un convenio, por favor adjuntelo.
          </p>
        </div>

      </div>

        */