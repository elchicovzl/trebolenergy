import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { UserFormSchema, userFormSchema } from "@/types/constansts";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation'





export type DialogOptions = {
    showDialog: boolean,
    setShowDialog: (value: boolean) => void;
}

export default function UserCreatedDialog({ showDialog, setShowDialog }: DialogOptions) {
    const router = useRouter()

    const form = useForm<UserFormSchema>({
        mode: "onBlur",
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            identification: "",
            phone: "",
            status: false
        }
    })
    
    async function onSubmit(values: z.infer<typeof userFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            const response = await axios.post('/api/users', values);
            console.log('User created successfully:', response.data);
            setShowDialog(false);
            toast({
                title: "Usuario Creado Exitosamente",
            })
            router.refresh()
        } catch (error) {
            console.error('Error creating user:', error);
            toast({
                variant: "destructive",
                title: "Error creando el usuario",
            })
        }
    }

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Usuario</DialogTitle>
                    <DialogDescription>
                        Agrega una nuevo usuario.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="nombre" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input placeholder="apellido" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Correo</FormLabel>
                                <FormControl>
                                    <Input placeholder="correo electronico" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="identification"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Identificacion</FormLabel>
                                <FormControl>
                                    <Input placeholder="identificacion" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Telefono</FormLabel>
                                <FormControl>
                                    <Input placeholder="telefono" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Estado</FormLabel>
                                    <FormDescription>
                                        Estado del Usuario Activo o Inactivo
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}