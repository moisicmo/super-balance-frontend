import { ComponentButton } from "@/components"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { CreateWarehouse, WarehouseTable } from ".";
import { Add } from "@mui/icons-material";
import { WarehouseModel } from "@/models";

export const WarehousesView = () => {
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<WarehouseModel | null>(null);

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
                <Typography variant="h6">Sucursales</Typography>
                <ComponentButton
                    text="Nueva Sucursal"
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
            </Stack>
            <WarehouseTable
                handleEdit={(v) => {
                    setItemEdit(v)
                    handleDialog(true)
                }}
            />
            {
                openDialog &&
                <CreateWarehouse
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit}
                />
            }
        </>
    )
}
