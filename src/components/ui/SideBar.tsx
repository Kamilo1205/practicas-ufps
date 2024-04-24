'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import {  useEffect, useState } from "react"

interface item  {
  nombre: string
  url: string
  subitems?: item[]
  itemOpen?: boolean
  
}

interface Props  {
  valores: item[],
  titulo: string
}

class BarItem implements item {
  nombre: string
  url: string
  subitems?: item[]
  itemOpen?: boolean
  
  constructor({ nombre, url,subitems,itemOpen, }: { 
    nombre: string,
    url: string,
    subitems ?: item[],
    itemOpen ?: boolean,
  }) {
    this.nombre = nombre
    this.url = url
    this.subitems = subitems
    this.itemOpen = itemOpen || false
    
  }

  setitemOpen(itemOpen: boolean, callback: () => void){ 
    this.itemOpen = itemOpen
    callback()
  }
}

export const SideBar = ({ valores, titulo }: Props) => {
  
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<BarItem[]>(
    valores.map((item) => new BarItem({ ...item, itemOpen: pathname == item.url || item.subitems?.some((subitem) => pathname == subitem.url)}))
  )

  const setItemOpen = (item: BarItem) => { 
    
    const newItems = items.map((i) => {
      if(i.nombre === item.nombre){
        i.setitemOpen(!i.itemOpen, () => {
        })
      }
      return i
    })
    setItems(newItems)
  }

  return (
   
<div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
  <div  className={`flex flex-col w-full md:w-64 text-gray-700 ${open ? 'bg-white':''} md:bg-white -translate-x-1 rounded-lg dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0`} x-data="{ open: false }">
    <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <a href={valores[0].url} className={`${!open ? 'hidden':''} md:block text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline`}>{titulo}</a>
      <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={()=>setOpen(!open)}>
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {
                !open ? 
                  <path x-show="!open" fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                :
                  <path x-show="open" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              }
        </svg>
      </button>
    </div>
        <nav className={`${open ? 'block' : 'hidden'} flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto`} >
          {
            items.map((item) => { 
              return (
                item.subitems && item.subitems?.length > 0 ?
                  <div key={`${item.nombre}-item.url`}>
                  <button onClick={() => setItemOpen(item)} className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <span>{item.nombre}</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" className={`{'rotate-180': itemOpen, 'rotate-0': !itemOpen} inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1`}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                    <div className={`${!item.itemOpen? 'hidden': ''} right-0 w-full mt-2 origin-top-right rounded-md shadow-lg`}>
                    <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                      {
                        item.subitems.map(({ nombre, url }) => {
                          return (
                            pathname === url ?
                              <Link key={nombre} className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href={url}>{nombre}</Link>
                              :
                              <Link key={nombre} className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode" href={url}>{nombre}</Link>
                          )
                        })
                      }
                      </div>
                  </div>
                </div>
                  :
                  
                    pathname === item.url ?
                      <Link key={item.nombre} className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href={item.url}>{item.nombre}</Link>
                      :
                      <Link key={item.nombre} className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href={item.url}>{item.nombre}</Link>

                  
              )
            })
          }
          
    </nav>
  </div>
</div>
  )
}


/**
 * pathname === item.url ?
                  <Link  key={nombre} className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href={url}>{ nombre}</Link>
                :
                  <Link  key={nombre} className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href={url}>{ nombre}</Link>
              
              
              
              
  <div  className="relative" x-data="{ open: false }">
            <button onClick={() => { }} className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              <span>Dropdown</span>
              <svg fill="currentColor" viewBox="0 0 20 20" className="{'rotate-180': open, 'rotate-0': !open}" className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        <div x-show="open" className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg">
          <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
            <a className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Link #1</a>
            <a className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Link #2</a>
            <a className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Link #3</a>
          </div>
        </div>
      </div>
 */