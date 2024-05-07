'use client'
import { useState } from "react"


export const TextSelectBadgeComponent = ({ items, selecciones, setSelecciones }: any) => { 

  const [open, setOpen] = useState(false)
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
      <div>
        <label>Tecnologia</label>
        <input className="w-full border border-gray-300 rounded p-1" type="text" placeholder="Seleccione una tecnologia" />
      </div>     
      <div className={ ` ${open ? 'block':'hidden'} `}>
        <ul>
          <li>Uno</li>
          <li>Dos</li>
        </ul> 
      </div>
</div>
  
  )
}

