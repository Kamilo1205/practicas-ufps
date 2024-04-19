import { Input } from "./input"


export const FileInputComponent = ({ field, onChange }: any) => { 
  
  const handleFileInput = (e: any) => { 
 
    const file = e.target.files[0]
    //console.log(file)
    onChange(file)
  }
  return (
    <Input
      type="file"
      autoComplete="false"
      accept="application/pdf"
      onChange={(e) => handleFileInput(e)}
      />
  )
}