'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { SelectComponent } from "../ui/SelectComponent";

export const DatosDireccionEmpresa = ({ form, paises, estados, ciudades }: any) => {
  return (<div className="flex flex-wrap mb-2">
    {/*Selección del Pais*/}
    <div className="mr-2">
      <FormField
        control={form.control}
        name="pais"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pais</FormLabel>
            <FormControl>
              <SelectComponent
                placeholder="Seleccione un pais"
                items={paises}
                value={field.value}
                onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </div>

    {/*Selección del Departamento/Estado*/}
    <div className="mr-2">
      <FormField
        control={form.control}
        name="departamento"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Departamento</FormLabel>
            <FormControl>
              <SelectComponent
                placeholder="Seleccione un departamento"
                items={estados}
                value={field.value}
                onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </div>

    {/*Selección del Ciudad*/}
    <div className="mr-2">
      <FormField
        control={form.control}
        name="municipio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ciudad</FormLabel>
            <FormControl>
              <SelectComponent
                placeholder="Seleccione una ciudad"
                items={ciudades}
                value={field.value}
                onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </div>

    {/* Input Direccion */}
    <div className="col-span-3">
      <FormField
        control={form.control}
        name="direccion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Input type="text" autoComplete="false" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
    </div>
  </div>);
};
