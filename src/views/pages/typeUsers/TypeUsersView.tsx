import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateTypeUser, TypeUserTable } from ".";
import { Add } from "@mui/icons-material";
import { TypeUserModel } from "@/models";


export const TypeUsersView = () => {
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<TypeUserModel | null>(null);

    /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemEdit(null)
        setopenDialog(value);
    }, []);
    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Typography variant="h6">Tipos de Usuarios</Typography>
                <ComponentButton
                    text="Nuevo tipo de usuario"
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
            </Stack>
            <TypeUserTable
                handleEdit={(v) => {
                    setItemEdit(v)
                    handleDialog(true)
                }}
            />
            {
                openDialog &&
                <CreateTypeUser
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit}
                />
            }
        </>
    )
}
