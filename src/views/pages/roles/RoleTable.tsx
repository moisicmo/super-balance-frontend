import { ComponentSearch, ComponentTablePagination, SeverityPill } from "@/components";
import { useRoleStore } from "@/hooks";
import { PermissionModel, RoleModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
    handleEdit?: (role: RoleModel) => void;
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (role: RoleModel) => void;
    items?: any[];
}


export const RoleTable = (props: tableProps) => {
    const {
        stateSelect = false,
        handleEdit,
        itemSelect,
        items = [],
        limitInit = 10,
    } = props;

    const { roles, getRoles, deleteRole } = useRoleStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [roleList, setRoleList] = useState<RoleModel[]>([]);



    useEffect(() => {
        getRoles()
    }, []);

    useEffect(() => {
        const defaultPermisionsList = applyPagination(
            roles,
            page,
            rowsPerPage
        );
        setRoleList(defaultPermisionsList)
    }, [roles, page, rowsPerPage])


    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentSearch
                title="Buscar Rol"
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Permisos</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                            {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roleList.map((role: RoleModel) => {
                            const isSelected = items.includes(role.id);
                            return (
                                <TableRow key={role.id} >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => itemSelect!(role)}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>{role.permisionIds.map((permission: PermissionModel, index) => (<Typography key={index}>- {permission.name}</Typography>))}</TableCell>
                                    <TableCell>
                                        <SeverityPill color={role.state ? 'success' : 'error'}>
                                            {role.state ? 'Disponible' : 'Inactivo'}
                                        </SeverityPill>
                                    </TableCell>
                                    {
                                        !stateSelect && <TableCell align="right">
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton onClick={() => handleEdit!(role)} >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton onClick={() => deleteRole(role.id)} >
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
                total={roles.length}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setRowsPerPage(value)}
                page={page}
                limit={rowsPerPage}
            />
        </Stack>
    );
}
