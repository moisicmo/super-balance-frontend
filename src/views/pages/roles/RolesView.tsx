import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateRole, RoleTable } from ".";
import { Add } from "@mui/icons-material";
import { RoleModel } from "@/models";

export const RolesView = () => {
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<RoleModel | null>(null);

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
                <Typography variant="h6">Roles</Typography>
                <ComponentButton
                    text="Nuevo rol"
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
            </Stack>
            <RoleTable
                handleEdit={(v) => {
                    setItemEdit(v)
                    handleDialog(true)
                }}
            />
            {
                openDialog &&
                <CreateRole
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit}
                />
            }
        </>
    )
}
