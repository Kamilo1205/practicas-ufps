'use client'

import { FileInputComponent } from "../ui/FileInputComponent"

export const RegistroConvenioComponent = () => {
  return (
    <div>
      <form className="flex justify-center">
        <FileInputComponent />
        <input type="submit" value="Enviar"
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer ml-2"
        />
      </form>
    </div>
  )
}