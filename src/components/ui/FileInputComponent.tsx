import { Input } from "./input"


export const FileInputComponent = ({ field, onChange }: any) => { 
  
  const handleFileInput = (e: any) => { 
    console.log("field input")
    console.log("FILE INPUT: ", e.target.files[0])
    const file = e.target.files[0]
    const { name } = file

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log(`${name}: `, e.target?.result)
        //onFileInput(e.target?.result)
        onChange(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
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