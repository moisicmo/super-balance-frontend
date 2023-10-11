import { ComponentSearch, ComponentTablePagination } from "@/components";
import { usePermissionStore } from "@/hooks";
import { PermissionModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
    stateSelect?: boolean;
    itemSelect?: (permission: PermissionModel) => void;
    items?: any[];
    limitInit?: number;
}

export const PermissionTable = (props: tableProps) => {
    const {
        stateSelect = false,
        itemSelect,
        items = [],
        limitInit = 10,
    } = props;

    const { permissions, getPermissions } = usePermissionStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [permisionList, setTypeUserList] = useState<PermissionModel[]>([]);


    useEffect(() => {
        getPermissions()
    }, []);

    useEffect(() => {
        const defaultPermisionsList = applyPagination(
            permissions,
            page,
            rowsPerPage
        );
        setTypeUserList(defaultPermisionsList)
    }, [permissions, page, rowsPerPage])



    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentSearch
                title="Buscar Permiso"
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                            {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permisionList.map((permission: PermissionModel) => {
                            const isSelected = items.includes(permission.id);
                            return (
                                <TableRow key={permission.id} >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => itemSelect!(permission)}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{permission.name}</TableCell>
                                    <TableCell>{permission.category}</TableCell>
                                    {
                                        !stateSelect && <TableCell align="right">
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton onClick={() => { }} >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton onClick={() => { }} >
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
                total={permissions.length}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setRowsPerPage(value)}
                page={page}
                limit={rowsPerPage}
            />
        </Stack>
    );
}
