"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { format } from "date-fns";
import { es } from 'date-fns/locale';

import { LuCalendar } from "react-icons/lu";
import { RxCaretSort, RxCheck } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormularioGrid } from "@/components/ui/FormularioGrid";

import { PersonalFormSchema } from "@/schemas";
import { cn } from "@/lib/utils";

import { agregarInformacionPersonal } from "@/actions";

const languages = [
	{ label: 'Español', value: 'ES' },
	{ label: 'Ingles', value: 'EN' },
];

export const PersonalForm = () => {

	const form = useForm<z.infer<typeof PersonalFormSchema>>({
		mode: 'onBlur',
		resolver: zodResolver(PersonalFormSchema)
	});

	const onSubmit = async (values: z.infer<typeof PersonalFormSchema>) => {
		await agregarInformacionPersonal(values);
	}

	return (
		<FormularioGrid
			titulo="Información Personal"
			subtitulo="Por favor, complete los siguientes campos con su información personal."
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-6 col-span-2 gap-x-6 gap-y-8">

					{/* Input Nombre */}
					<div className="col-span-6 sm:col-span-3">
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
							)}
						/>
					</div>

					{/* Input Apellido */}
					<div className="col-span-6 sm:col-span-3">
						<FormField
							control={form.control}
							name="apellido"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Apellido</FormLabel>
									<FormControl>
										<Input type="text" autoComplete="false" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Input Telefono */}
					<div className="col-span-6 sm:col-span-3">
						<FormField
							control={form.control}
							name="telefono"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefono</FormLabel>
									<FormControl>
										<Input type="text" autoComplete="false" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* RadioButton Genero */}
					<div className="col-span-6 sm:col-span-3">
						<FormField
							control={form.control}
							name="genero"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Género</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1"
										>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="masculino" id="masculino" />
												</FormControl>
												<FormLabel className="font-normal" htmlFor="masculino">
													Masculino
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="femenino" id="femenino" />
												</FormControl>
												<FormLabel className="font-normal" htmlFor="femenino">
													Femenino
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Input Fecha de Nacimiento */}
					<div className="col-span-6 sm:col-span-4">
						<FormField
							control={form.control}
							name="fechaNacimiento"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Fecha de Nacimiento</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-wull pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP", { locale: es })
													) : (
														<span>Selecciona una fecha</span>
													)}
													<LuCalendar className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Select Departamento */}
					<div className="col-span-6 sm:col-span-3">
					<FormField
							control={form.control}
							name="municipio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Municipio de Residencia</FormLabel>
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
														? languages.find(
															(language) => language.value === field.value
														)?.label
														: "Select language"}
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
																	form.setValue("municipio", language.value)
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
					</div>

					{/* Select Municipio */}
					<div className="col-span-6 sm:col-span-3">
						<FormField
							control={form.control}
							name="municipio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Municipio de Residencia</FormLabel>
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
														? languages.find(
															(language) => language.value === field.value
														)?.label
														: "Select language"}
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
																	form.setValue("municipio", language.value)
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
					</div>

					{/* Input Direccion */}
					<div className="col-span-6 sm:col-span-4">
						<FormField
							control={form.control}
							name="direccion"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Direccion</FormLabel>
									<FormControl>
										<Input type="text" autoComplete="false" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="col-span-6 flex justify-end">
						<Button type="submit">Siguiente</Button>
					</div>
				</form>
			</Form>
		</FormularioGrid>
	);
}
