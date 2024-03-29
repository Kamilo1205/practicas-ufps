'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LuCheck, LuChevronsUpDown } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { PersonalFormSchema } from "@/schemas";
import { cn } from "@/lib/utils";


const languages = [
	{ label: "English", value: "en" },
	{ label: "French", value: "fr" },
	{ label: "German", value: "de" },
	{ label: "Spanish", value: "es" },
	{ label: "Portuguese", value: "pt" },
	{ label: "Russian", value: "ru" },
	{ label: "Japanese", value: "ja" },
	{ label: "Korean", value: "ko" },
	{ label: "Chinese", value: "zh" },
] as const


export const PersonalForm = () => {

	const form = useForm<z.infer<typeof PersonalFormSchema>>({
		mode: 'onBlur',
		resolver: zodResolver(PersonalFormSchema)
	});

	const onSubmit = (values: z.infer<typeof PersonalFormSchema>) => {
		console.log(values);
	}


	return (
		<div className="p-20">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-6">

				<div>
					<h2 className="font-semibold">
						Información Personal
					</h2>
					<p className="text-gray-800 text-sm mt-1 leading-6">
						Por favor, complete los siguientes campos con su información personal.
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-6 col-span-2 gap-x-6 gap-y-8">

						{/* Input Nombre */}
						<div className="col-span-3">
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
						<div className="col-span-3">
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
						<div className="col-span-3">
							<FormField
								control={form.control}
								name="telefono"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telefono</FormLabel>
										<FormControl>
											<Input type="number" autoComplete="false" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Select Departamento */}			
						<div className="col-span-3">
							<FormField
								control={form.control}
								name="departamento"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Departamento</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														role="combobox"
														className={cn(
															"w-[200px] justify-between",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value
															? languages.find(
																(language) => language.value === field.value
															)?.label
															: "Select language"}
														<LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-[200px] p-0">
												<Command>
													<CommandInput placeholder="Search language..." />
													<CommandEmpty>No language found.</CommandEmpty>
													<CommandGroup>
														{languages.map((language) => (
															<CommandItem
																value={language.label}
																key={language.value}
																onSelect={() => {
																	form.setValue("departamento", language.value)
																}}
															>
																<LuCheck
																	className={cn(
																		"mr-2 h-4 w-4",
																		language.value === field.value
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
																{language.label}
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>

		</div>
	);
}
