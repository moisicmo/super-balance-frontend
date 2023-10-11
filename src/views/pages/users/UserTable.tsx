import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useUserStore } from "@/hooks";
import { UserModel, WarehouseModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
    handleEdit?: (user: UserModel) => void;
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (user: UserModel) => void;
    items?: any[];
}

export const UserTable = (props: tableProps) => {
    const {
        stateSelect = false,
        handleEdit,
        itemSelect,
        limitInit = 10,
        items = [],
    } = props;

    const { users = [], getUsers, deleteUser } = useUserStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [userList, setUserList] = useState<UserModel[]>([]);

    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        const defaultPermisionsList = applyPagination(
            users,
            page,
            rowsPerPage
        );
        setUserList(defaultPermisionsList)
    }, [users, page, rowsPerPage])


    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentSearch
                title="Buscar Usuario"
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Correo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tipo de Usuario</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Sucursales</TableCell>
                            {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user: UserModel) => {
                            const isSelected = items.includes(user.id);
                            return (
                                <TableRow key={user.id} >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => itemSelect!(user)}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.roleId.name}</TableCell>
                                    <TableCell>{user.typeUserId.name}</TableCell>
                                    <TableCell>{user.warehouses.map((warehouse: WarehouseModel, index) => (<Typography key={index}>- {warehouse.name}</Typography>))}</TableCell>
                                    {
                                        !stateSelect && <TableCell align="right">
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton onClick={() => handleEdit!(user)} >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton onClick={() => deleteUser(user.id)} >
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
                total={users.length}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setRowsPerPage(value)}
                page={page}
                limit={rowsPerPage}
            />
        </Stack>
    );
}
