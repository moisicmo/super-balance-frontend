import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useWarehouseStore } from "@/hooks";
import { WarehouseModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
    handleEdit?: (warehouse: WarehouseModel) => void;
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (warehouse: WarehouseModel) => void;
    items?: any[];
}


export const WarehouseTable = (props: tableProps) => {
    const {
        stateSelect = false,
        handleEdit,
        itemSelect,
        limitInit = 10,
        items = [],
    } = props;

    const { warehouses, getWarehouses, deleteWarehouse } = useWarehouseStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [warehouseList, setWarehouseList] = useState<WarehouseModel[]>([]);
    const [query, setQuery] = useState<string>('');



    useEffect(() => {
        getWarehouses()
    }, []);

    useEffect(() => {
        const filtered = warehouses.filter((e: WarehouseModel) =>
            e.name.toLowerCase().includes(query.toLowerCase())
        );
        const newList = applyPagination(
            query != '' ? filtered : warehouses,
            page,
            rowsPerPage
        );
        setWarehouseList(newList)
    }, [warehouses, page, rowsPerPage, query])

    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentSearch
                title="Buscar Sucursal"
                search={setQuery}
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                            {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {warehouseList.map((warehouse: WarehouseModel) => {
                            const isSelected = items.includes(warehouse.id);
                            return (
                                <TableRow key={warehouse.id} >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => itemSelect!(warehouse)}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{warehouse.name}</TableCell>
                                    <TableCell>{warehouse.address}</TableCell>
                                    <TableCell>{warehouse.phone}</TableCell>
                                    {
                                        !stateSelect && <TableCell align="right">
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton onClick={() => handleEdit!(warehouse)} >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton onClick={() => deleteWarehouse(warehouse.id)} >
                                                    <DeleteOutline color="error" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <ComponentTablePagination
                total={warehouses.length}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setRowsPerPage(value)}
                page={page}
                limit={rowsPerPage}
            />
        </Stack>
    );
}
