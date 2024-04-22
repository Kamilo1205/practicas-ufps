import { DatosTutorEmpresa } from "@/components/empresa"
import { SideBarLayout } from "../../SidebarLayout"
import { CardComponent } from "@/components"


export const metadata = {
  title: 'Registro de tutor',
  description: 'Registra un tutor en el sistema.',
}

export const Page = () => {
  return (
    <SideBarLayout>
      
      <div className="lg:w-6/12">
        <CardComponent
          title="Registro de un tutor"
          description="Una vez registrado el correo del tutor, este será notificado y podrá acceder al sistema dentro del periodo de practicas actual."
          cardContent={
            <div className="flex">
              <DatosTutorEmpresa />
            </div>
          }
          cardFooter={<></>}
        />
      </div>
      

     
    </SideBarLayout>
  )

}

export default Page