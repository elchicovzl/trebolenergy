"use client"
import React, { useEffect, useState, FormEventHandler, useCallback } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSheetStore } from '@/Store/store';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { userFormSchema, UserFormSchema } from '@/types/constansts';


const UsersSheet = () => {
	const {isOpen, setIsOpen, execute, loading, data, identificator, reset} = useSheetStore();
    const { toast } = useToast();

    const [dataForm, setDataForm] = useState(
    	{
            first_name: '',
            last_name: '',
      	    email: '',
            identification: '',
            phone: '',
      	    status: false
    	}
  	);

    const settingData = useCallback((dataCallback:any) => {
        console.log("datacallback",dataCallback)
        dataForm.first_name = dataCallback.first_name
        dataForm.last_name = dataCallback.last_name
        dataForm.email = dataCallback.email
        dataForm.identification = dataCallback.identification
        dataForm.phone = dataCallback.phone
        //setDataForm(dataCallback)
    	
  	}, [dataForm]);

    useEffect(() => {
		if (identificator) {
			execute(identificator, settingData, `/api/users/${identificator}`);
		}
	}, [identificator]);

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
        },
        values: {
            first_name: dataForm.first_name,
            last_name: dataForm.last_name,
            email: dataForm.email,
            status: dataForm.status,
            identification: dataForm.identification,
            phone: dataForm.phone,
        }
    })

	function onSubmit(values: z.infer<typeof userFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent className="w-[800px] sm:min-w-[700px] max-w-[750px] sm:w-[750px] overflow-y-auto">
				<SheetHeader className='w-full'>
					<SheetTitle>Usuario {dataForm.first_name} {dataForm.last_name}</SheetTitle>
					<SheetDescription>
						Editar Usuario
					</SheetDescription>
				</SheetHeader>

				<div>
					{loading ? (<p>Cargando...</p>) :
						(
							<>
								<Card  className='my-3 p-0' >
									<CardContent className='grid grid-rows-1  items-center py-2 ' >
                                        
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
                                                            <Input placeholder="Identificacion" {...field} />
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
                                                            <Input placeholder="Identificacion" {...field} />
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

										{/* <form onSubmit={submit} className='space-y-3'>
											<div>
												<Label htmlFor="firstname">Nombre</Label>
												<Input type="text" value={formData.firstname} onChange={(e) => setData('firstname', e.target.value)}  />
												<InputError message={errors.firstname} className="mt-2" />
											</div>
											<div>
												<Label htmlFor="lastname">Apellido</Label>
												<Input type="text" value={formData.lastname} onChange={(e) => setData('lastname', e.target.value)}  />
												<InputError message={errors.lastname} className="mt-2" />
											</div>
											<div>
												<Label htmlFor="email">Correo</Label>
												<Input type="text" value={formData.email} onChange={(e) => setData('email', e.target.value)}  />
												<InputError message={errors.email} className="mt-2" />
											</div>
                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <Input type='password' id="password" value={formData.password} onChange={(e) => setData('password', e.target.value)} placeholder="password" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="confirm_password">Confirmar Password</Label>
                                                <Input type='password' id="confirm_password" value={formData.confirm_password} onChange={(e) => setData('confirm_password', e.target.value)} placeholder="confirmar password" />
                                            </div>
											<div className='flex items-center gap-3 !mt-5'>
												<Switch id="airplane-mode" checked={formData.status == 'activo'? true:false} onCheckedChange={setChecked}  />
												<Label htmlFor="airplane-mode">Status</Label>
											</div>
											<div className="mt-4 text-right">
												<Button >
													{processing && (
														<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													)}
													Guardar
												</Button>
											</div>
										</form> */}
									</CardContent>
								</Card>
							</>
						)
					}
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default UsersSheet;