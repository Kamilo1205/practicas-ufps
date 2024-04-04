'use client'
import { DatosEmpresaForm, DatosRepresentanteLegal } from "@/components/empresa";
import { Button } from "@/components/ui/button";
import { useState } from "react";



export default function Page() { 
  const [stage, setStage] = useState(1)
  
  const nextStage = () => { 
    { /* //TODO: Controlar el max next. */}
    setStage(stage + 1)
  }

  const backStage = () => {
    if (stage === 1) return
    setStage(stage - 1)
  }

    return (
        <div className="flex px-28 py-10">
        { /* TODO: Layout para el registro */}
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
        <div className="flex flex-col">
          {
            stage === 1 ? <DatosEmpresaForm setStage={setStage} /> :
              stage === 2 ? <DatosRepresentanteLegal /> :
                <DatosRepresentanteLegal />
          }
          <div className="flex space-x-10">
            {stage > 1 ? <Button onClick={backStage}>Atras</Button> : null}
            {/* TODO: Cuando llegue al ultimo stage cambiar el texto a enviar. */}
            <Button onClick={nextStage} className="self-end">Siguiente</Button>
          </div>
          
        </div>
        
        

        </div>
    )
}