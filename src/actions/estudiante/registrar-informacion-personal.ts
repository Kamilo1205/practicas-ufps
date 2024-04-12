/* import { z } from "zod";
import { auth } from "@/auth.config";
import { PersonalFormSchema } from "@/schemas";
import prisma from "@/lib/prisma";

export const agregarInformacionPersonal = async (formData: z.infer<typeof PersonalFormSchema>) => {
    try {
        const session = await auth();

        if (!session?.user) {
            return {
                ok: false,
                message: 'Debe estar autenticado'
            };
        }

        if (session?.user.role !== 'estudiante') {
            return {
                ok: false,
                message: 'Debe de estar autenticado como estudiante'
            };
        }

        const validatedFields = PersonalFormSchema.safeParse(formData);
        if (!validatedFields.success) {
            return {
                ok: false,
                errors: validatedFields.error.flatten().fieldErrors
            };
        }

        const informacionPersonal = await prisma.informacionPersonal.create({
            data: formData
        });

        await prisma.estudiante.create({
            data: {
                usuarioId: "SA#$",
                informacionPersonaId: informacionPersonal.id 
            }
        });

        await prisma.estudiante.upsert({
            where: { usuarioId: session.user.id },
            update: {
                informacionPersonal: {
                    update: formData
                }
            },
            create: {
                usuarioId: session.user.id,
                informacionPersonal: {
                    create: {
                        nombre: formData.nombre,
                        apellido: formData.apellido,
                        departamento: formData.departamento,
                        direccion: formData.direccion,
                        fechaNacimiento: formData.fechaNacimiento,
                        genero: formData.genero,
                        municipio: formData.municipio,
                        telefono: formData.telefono
                    }
                }
            }
        }); 
        console.log( informacionPersonal );
    } catch (error) {
        return {
            ok: false,
            message: 'Ocurrió un error al procesar la solicitud'
        };
    }
};
 */