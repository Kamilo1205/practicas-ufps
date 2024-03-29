import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select"

interface item { 
  key: string
  value: string
}

interface SelectComponentProps {
  placeholder: string
  items?: item[]
  value: string
  onChange: (value: string) => void
 }

export const SelectComponent = ({placeholder,items,value,onChange}:SelectComponentProps) => { 
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={ placeholder} />
      </SelectTrigger>
      <SelectContent>
        {
          items?.map((item) => (
            <SelectItem key={item.key} value={item.value}>{item.value}</SelectItem>
          ))
        }
        
      </SelectContent>
    </Select>

  )
}