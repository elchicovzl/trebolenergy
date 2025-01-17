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
import { useSheetStore } from "@/Store/store";
import { Button } from "@/components/ui/button";
import UserCreatedDialog from "./Dialogs/UserCreateDialog";

interface Users {
  id: string;
  email: string,
  first_name: string,
  last_name: string,
  phone: string,
  identification: string,
  role: string;
}

interface UsersTableProps {
  data: Users[];
}

export function UsersTable({ data }: UsersTableProps) {
    const [showNewUserDialog, setShowNewUserDialog] = React.useState(false);
    const setIdentificator = useSheetStore((state) => state.setIdentificator)
    const [filter, setFilter] = React.useState("");

  const filteredData = React.useMemo(() => {
    return data.filter((user) =>
        user.identification.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  

  return (
    <div>
        <Button className='mb-5' onClick={() => setShowNewUserDialog(true)}>Crear Usuario</Button>
        <UserCreatedDialog showDialog={showNewUserDialog} setShowDialog={setShowNewUserDialog} />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by Identification..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Correo</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Identification</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Accion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.identification}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                        <button className="btn btn-primary" onClick={setIdentificator(user.id)}>Edit</button>
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
