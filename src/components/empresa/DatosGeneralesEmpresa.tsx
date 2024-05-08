'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { LabelConInfo } from "..";
import { SelectComponent } from "../ui/SelectComponent";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export const DatosGeneralesEmpresa = ({ form, sectores }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Input NIT */}
      <div className="m-1">
        <FormField
          control={form.control}
          name="nit"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <LabelConInfo label="NIT" info="El NIT deben ser solo números o en formato XXXXXXXXX-X, donde X es un digíto de 0-9" />
              </FormLabel>
              <FormControl>
                <Input type="text" autoComplete="false" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </div>
      {/* Input Nombre */}
      <div className="m-1">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="false" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </div>
      {/* Input Telefono */}
      <div className="flex-1 m-1">
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel asChild>
                <LabelConInfo label="Telefono" info="Tenga en cuenta que si el telefono no es de Colombia, debe agregar el código de país. Ejemplo: +1 para Estados Unidos" />
              </FormLabel>
              <FormControl>
                <Input type="text" autoComplete="true" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </div>

      {/* Input Telefono */}
      <div className="m-1 mt-3">
        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de empresa</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Publica" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Pública
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Privada" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Privada
                    </FormLabel>
                  </FormItem>

                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </div>

      {/*Selección del Sector comercial*/}
      <div className="mr-2">
        <FormField
          control={form.control}
          name="industria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industria</FormLabel>
              <FormControl>
                <SelectComponent
                  placeholder="Seleccione un sector..."
                  items={sectores}
                  value={field.value}
                  onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
      </div>


    </div>
  );
};
