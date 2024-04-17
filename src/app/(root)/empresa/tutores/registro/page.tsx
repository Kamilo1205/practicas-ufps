import { DatosTutorEmpresa } from "@/components/empresa"
import { SideBarLayout } from "../../SidebarLayout"
import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"


export const metadata = {
  title: 'Registro de tutor',
  description: 'Registra un tutor en el sistema.',
}

export const Page = () => {
  return (
    <SideBarLayout>
      <div className="flex flex-col w-full">

        <Link href="/empresa/tutores">
          <button className="">
            <LuArrowLeft size={'30px'}/>
          </button>
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Registro de tutor</h1>
       <DatosTutorEmpresa />
      </div>
    </SideBarLayout>
  )

}

export default Page