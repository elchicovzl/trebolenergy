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

interface Tickets {
  id: string;
  numero: string,
  estado: string,
  fecha_asignacion: string
}

interface TicketsTableProps {
  data: Tickets[];
}

export function TicketsTable({ data }: TicketsTableProps) {
  const [filter, setFilter] = React.useState("");

  const filteredData = React.useMemo(() => {
    return data.filter((raffle) =>
        raffle.numero.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por Numero..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numero</TableHead>
              <TableHead>Rifa</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Usuario Asignado</TableHead>
              <TableHead>Fecha Asignacion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((raffle) => (
                <TableRow key={raffle.id}>
                  <TableCell>{raffle.numero}</TableCell>
                  <TableCell>{raffle.raffles.nombre}</TableCell>
                  <TableCell>{raffle.estado}</TableCell>
                  <TableCell>{raffle.profiles.first_name + ' ' + raffle.profiles.last_name}</TableCell>
                  <TableCell>{raffle.fecha_asignacion}</TableCell>
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
