'use client'
import { useEffect, useState } from "react"

interface items {
  id: string | number
  label: string;
}

const itenstemp = [
  {
    id: 1,
    label: "React",
    seleccionado: true
  },
  {
    id: 2,
    label: "Angular",
    seleccionado: false
  },
  {
    id: 3,
    label: "View",
    seleccionado: false
  }
]

export const TextSelectBadgeComponent = ({ items = itenstemp, deleteItem }: any) => {

  const [open, setOpen] = useState(true)

  const [itemsState, setItemsState] = useState(items)

  const [search, setSearch] = useState("")  

  useEffect(() => { }, [itemsState,search])


  const onSelectedItem = (index: number) => {
    console.log("Seleccionado...")
    const newItems = itemsState.map((item, i) => {
      if (index === item.id) {
        return {
          ...item,
          seleccionado: true
        }
      }
      return item
    })
    setItemsState(newItems)
  }

  const onDesSelectedItem = (index: number) => {
    console.log("Deseleccionado...")
    const newItems = itemsState.map((item, i) => {
      if (index === item.id) {
        return {
          ...item,
          seleccionado: false
        }
      }
      return item
    })
    setItemsState(newItems)
  }

  console.log(itemsState)

  const onDeleteItem = (index:number) => {
    console.log("Borrado...")
   // deleteItem()
    return;
  }

  return (
    <div className="w-full md:w-1/2 flex flex-col">
      {/**Este es el la parte del input. */}
      <div className="w-full bg-white flex flex-auto flex-wrap border rounded-sm border-gray-200">
        {/** Aqui van los badges */}
        <div className="flex flex-wrap"> 
          {
            itemsState.map(
              (item) => item.seleccionado && <div key={item.id} className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                <span className="text-xs font-normal leading-none max-w-full flex-initial">{item.label}</span>
                <svg
                  onClick={() => onDesSelectedItem(item.id)}
                  xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            )
          }
        </div>
        {/** Aquí va el input html */}
        <div className="flex-1">
          <input type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setOpen(true)}
         
            className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800" />
          
        </div>
      </div>
      { /**Este es la lista para seleccionar. */}
      <div className={`${open ? 'relative' : 'hidden'} shadow top-2 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto`}>
        <div className="flex flex-col w-full">
          {
            itemsState.map(i =>
              !i.seleccionado &&
              (search === "" || i.label.toLowerCase().includes(search.toLowerCase()))
                &&
              <div key={`no-seleccionado-${i.id}`}
                  onClick={() => onSelectedItem(i.id)}
                  className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100 items-center p-1" >
                  <span className=" leading-6">{ i.label}</span>
            </div>)
          }
        </div>
      </div>
    </div>
  
  )
}

