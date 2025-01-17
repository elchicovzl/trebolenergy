import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { raffleFormSchema, RaffleFormSchema } from "@/types/constansts";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

export type DialogOptions = {
    showDialog: boolean,
    setShowDialog: (value: boolean) => void;
}

export default function RaffleCreatedDialog({ showDialog, setShowDialog }: DialogOptions) {
    const router = useRouter()

    const form = useForm<RaffleFormSchema>({
        mode: "onBlur",
        resolver: zodResolver(raffleFormSchema),
        defaultValues: {
            nombre: "",
            descripcion: "",
            fecha_sorteo: new Date(),
            precio_ticket: 0,
            cantidad_tickets: 0,
            estado: "pendiente"
        }
    })
    
    async function onSubmit(values: z.infer<typeof raffleFormSchema>) {
        console.log(values)
        try {
            const response = await axios.post('/api/raffles', values);
            console.log('Rifa creada exitosamente:', response.data);
            setShowDialog(false);
            toast({
                title: "Rifa Creada Exitosamente",
            })
            router.refresh()
        } catch (error) {
            console.error('Error creando la  rifa:', error);
            toast({
                variant: "destructive",
                title: "Error creando la rifa",
            })
        }
    }

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Rifa</DialogTitle>
                    <DialogDescription>
                        Crea un nuevo sorteo de Rifa
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="nombre" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nombre de la rifa.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl>
                                <Textarea rows={4}  placeholder="descripcion" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Breve descripcion de lo que se va a rifar
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="fecha_sorteo"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Fecha del sorteo</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Elige una fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Fecha en la que se realizara el sorteo
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="precio_ticket"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Precio del ticket</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="precio del ticket" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Precio con el que se venderan los tickets.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cantidad_tickets"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Cantidad de tickets</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="cantidad de tickets" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Numero de tickets que tendra la rifa.
                                </FormDescription>
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