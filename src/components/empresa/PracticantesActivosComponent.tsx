import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const PracticantesActivosComponent = ({practicantes}:any) => { 
  return (
    <>
      {
        practicantes.length === 0 ?
          <>
            <p>No hay practicantes activos</p>
          </>
          :
          <div className="flex">
            <Accordion type="single" className="w-full" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger> <h2 className="text-lg font-semibold text-gray-800 w-fit">Practicantes Activos</h2></AccordionTrigger>
                <AccordionContent className="flex space-x-4">
                  {
                    practicantes.map((practicante:any) =>
                      <div key={practicante.id} className="bg-white shadow-sm rounded-sm p-2 mt-4">
                        <h3 className="text-lg font-semibold text-gray-800">{practicante.nombre} </h3>
                        <p className="text-gray-600">{practicante.carrera}</p>
                        <p className="text-gray-600">{practicante.semestre}</p>
                        <p className="text-gray-600">{practicante.telefono}</p>
                      </div>

                    )
                  }
                </AccordionContent>
              </AccordionItem>
            </Accordion>


          </div>
      }

    </>
  )
}