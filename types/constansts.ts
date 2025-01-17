import { z } from "zod";

export type UserFormSchema = z.infer<typeof userFormSchema>;
export type RaffleFormSchema = z.infer<typeof raffleFormSchema>;

export const userFormSchema = z.object({
    first_name: z.string().min(2, {
      message: "firstname must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
        message: "lastname must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "email must be at least 2 characters.",
    }),
    identification: z.string().min(2, {
        message: "Identificacion must be at least 2 characters.",
    }),
    phone: z.string().min(2, {
        message: "Telefono must be at least 2 characters.",
    }),
    status: z.nullable(z.boolean())
});

export const raffleFormSchema = z.object({
    nombre: z.string().min(2, {
      message: "Nombre debe tener almenos 2 caracteres.",
    }),
    descripcion: z.string().min(2, {
        message: "Descripcion debe tener almenos 2 caracteres.",
    }),
    fecha_sorteo: z.date({
        required_error: "Fecha de sorteo es requerida",
    }),
    precio_ticket: z.coerce.number({
        required_error: "Precio del ticket es requerido",
        invalid_type_error: "Precio del ticket debe ser un numero",
    }),
    cantidad_tickets: z.coerce.number({
        required_error: "Cantidad de ticket es requerido",
        invalid_type_error: "Cantidad del ticket debe ser un numero",
    }),
    estado: z.nullable(z.string())
});