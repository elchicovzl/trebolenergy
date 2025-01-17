"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RaffleCreatedDialog from "./Dialogs/RaffleCreatedDialog";

interface Raffles {
  id: string;
  nombre: string,
  descripcion: string,
  precio_ticket: string,
  fecha_sorteo: string,
  fecha_creacion: string;
}

interface RafflesTableProps {
  data: Raffles[];
}

export function RafflesTable({ data }: RafflesTableProps) {
    const [showNewRaffleDialog, setShowNewRaffleDialog] = React.useState(false);
  const [filter, setFilter] = React.useState("");

  const filteredData = React.useMemo(() => {
    return data.filter((raffle) =>
        raffle.nombre.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return (
    <div>
        <Button className='mb-5' onClick={() => setShowNewRaffleDialog(true)}>Crear Rifa</Button>
        <RaffleCreatedDialog showDialog={showNewRaffleDialog} setShowDialog={setShowNewRaffleDialog} />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por Nombre..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Fecha Sorteo</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Fecha Creacion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((raffle) => (
                <TableRow key={raffle.id}>
                  <TableCell>{raffle.nombre}</TableCell>
                  <TableCell>{raffle.descripcion}</TableCell>
                  <TableCell>{raffle.fecha_sorteo}</TableCell>
                  <TableCell>{raffle.precio_ticket}</TableCell>
                  <TableCell>{raffle.fecha_creacion}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
