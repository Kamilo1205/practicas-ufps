'use client'
import { useState } from "react"

interface items {
  id: string | number
  label: string;
}

export const TextSelectBadgeComponent = ({ items, selecciones, setSelecciones }: any) => { 

  const [open, setOpen] = useState(true)
  return (
    <div className="w-full md:w-1/2 flex flex-col h-64 mx-auto">
      <div onFocus={()=>setOpen(!open)} >
        <label>Tecnologia</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-1"
          placeholder="Seleccione una tecnologia"
          
        />
      </div>     
      <div className={ ` ${open ? 'block':'hidden'} `}>
        <ul className="flex flex-col p-2  w-full">
          <li className="hover:bg-slate-100">Uno</li>
          
        </ul> 
      </div>
</div>
  
  )
}

