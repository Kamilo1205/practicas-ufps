import { RegistroForm } from "./ui/RegistroForm";


export const metadata = {
  title: 'Registro nuevo usuario',
  description: 'Pagína para la creación de un nuevo usuario.',
};


export const RegistroPage = () => {

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold mt-14 mb-10">Registro</h1>
      <div className="w-full max-w-[350px] flex flex-col items-center">
        <RegistroForm />
      </div>
    </div>
  )
 }

export default RegistroPage;