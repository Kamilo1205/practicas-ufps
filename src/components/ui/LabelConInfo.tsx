import Image from "next/image"
import { TooltipComponent } from ".."
import InfoIcon from '/public/info.svg'


export const LabelConInfo = ({ label, info }: { label: string, info: string }) => { 
  return (
    <div className="flex text-center">
      <span className="mr-1">{ label}</span>

      <TooltipComponent
        content={info}
        hoverText={
          <Image src={InfoIcon}
            width={16}
            height={16}
            alt="info icon"
          />
        }
      />
    </div>
  )
}

//"Tenga en cuenta que si el telefono no es de Colombia, debe agregar el código de país. Ejemplo: +1 para Estados Unidos"