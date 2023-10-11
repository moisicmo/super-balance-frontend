import { ComponentButton, ComponentTablePagination } from "@/components";
import { useUnitMeasurementStore } from '@/hooks';
import { UnitMeasurementModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CreateUnitMeasurement } from ".";

interface tableProps {
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (unitMeasurement: UnitMeasurementModel) => void;
    items?: any[];
}

export const UnitMeasurementTable = (props: tableProps) => {
    const {
        stateSelect = false,
        itemSelect,
        limitInit = 10,
        items = [],
    } = props;

    const { unitMeasurements, getUnitMeasurements } = useUnitMeasurementStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [unitMeasurementList, setUnitMeasurement] = useState<UnitMeasurementModel[]>([]);
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<UnitMeasurementModel | null>(null);

    /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemEdit(null)
        setopenDialog(value);
    }, []);


    useEffect(() => {
        getUnitMeasurements()
    }, []);

    useEffect(() => {
        const defaultPermisionsList = applyPagination(
            unitMeasurements,
            page,
            rowsPerPage
        );
        setUnitMeasurement(defaultPermisionsList)
    }, [unitMeasurements, page, rowsPerPage])


    return (
        <>
            <Stack sx={{ paddingRight: '10px' }}>
                <ComponentButton
                    text="Crear Unidad de medida"
                    onClick={() => handleDialog(true)}
                />
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} size="small">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {unitMeasurementList.map((unitMeasurement: UnitMeasurementModel) => {
                                const isSelected = items.includes(unitMeasurement.id);
                                return (
                                    <TableRow key={unitMeasurement.id} >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => itemSelect!(unitMeasurement)}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>{unitMeasurement.name}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ComponentTablePagination
                    total={unitMeasurements.length}
                    onPageChange={(value) => setPage(value)}
                    onRowsPerPageChange={(value) => setRowsPerPage(value)}
                    page={page}
                    limit={rowsPerPage}
                />
            </Stack>
            {
                openDialog &&
                <CreateUnitMeasurement
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit}
                />
            }
        </>
    );
}
