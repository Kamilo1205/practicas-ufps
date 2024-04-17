//'use client'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

//import { useState } from 'react';

interface Tutor { 
  nombre: string
  telefono: string
  email: string
  documento:number
  estado: string
}

interface Props { 
  tutores: Tutor[]

}


export const TablaTutores = ({tutores}:Props) => { 
  //const [customers, setCustomers] = useState([]);
  return (
    <PrimeReactProvider>
      <DataTable value={tutores} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ width:"100%"}}>
        <Column field="nombre" header="Nombre" style={{ width: '20%' }}></Column>
        <Column field="email" header="Correo" style={{ width: '20%' }}></Column>
        <Column field="telefono" header="Telefono" style={{ width: '20%' }}></Column>
        <Column field="documento" header="Documento" style={{ width: '20%' }}></Column>
        <Column field="estado" header="Estado" style={{ width: '20%' }}></Column>
      </DataTable>  
    </PrimeReactProvider>
  )
}