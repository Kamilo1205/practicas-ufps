import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandList, CommandItem } from "cmdk";
import { Button } from "react-day-picker";
import { RxCaretSort, RxCheck } from "react-icons/rx";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form";

export const SelectDepartamento = ({ form }) => {
    const departamentos = [];

    return (
        <FormField
            control={form.control}
            name="departamento"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Departamento de Residencia</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? departamentos.find(
                                            (departamento) => departamento.value === field.value
                                        )?.label
                                        : "Seleccione un departamento"}
                                    <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder="Search framework..."
                                    className="h-9"
                                />
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandList>
                                        {languages.map((language) => (
                                            <CommandItem
                                                value={language.label}
                                                key={language.value}
                                                onSelect={() => {
                                                    form.setValue("departamento", language.value)
                                                }}
                                            >
                                                {language.label}
                                                <RxCheck
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        language.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandList>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
