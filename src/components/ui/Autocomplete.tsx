'use client'

import { useEffect, useState } from "react"
import { Input } from "./input"

interface choice { 
  id: number
  name: string

}
interface Props{
  value?: string
  setValue: (value: choice) => void
  choices: choice[],
}

const filterChoices = (value: string, choices: choice[]) => {
  return choices.filter((choice) =>
    choice.name.toLowerCase().includes(value.toLowerCase())
  );
};

export const Autocomplete = ({value = "",setValue,choices}:Props) => { 


  const [controlValue, setcontrolValue] = useState(value)
  const [filteredChoices, setFilteredChoices] = useState<choice[]>([]);




  const onChoiceClick = (choice: choice) => { 
    console.log(choice)
    setcontrolValue("")
    setValue(choice)
    setFilteredChoices([])
  }
 
  useEffect(() => {
    if (controlValue.length > 0) { 
      const filteredChoices = filterChoices(controlValue,choices) 
      setFilteredChoices(filteredChoices)
    }
   }, [controlValue,choices])

  return <div>
   
    <div>
      <Input
        value={controlValue}
        onChange={(e) => setcontrolValue(e.target.value)}
      />
      {filterChoices.length > 0 && <div className="bg-white w-full border max-h-60 border-gray-300 overflow-y-scroll">
        {filteredChoices.map((choice) =>
          <div key={choice.id} onClickCapture={()=>onChoiceClick(choice)} className="p-2 hover:bg-gray-100 cursor-pointer a">{choice.name}</div>
        )}
      </div>}
    </div>
  </div>
}