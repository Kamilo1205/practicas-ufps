import { SideBar } from "@/components/empresa/SideBar"



export default function NamePage() {
  return (
    <div className="flex flex-row">
      <div className="flex-shrink-0">
        <SideBar /> 
      </div>
      <h1>Hello Page</h1>
    </div>
  );
}