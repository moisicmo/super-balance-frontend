import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useTypeUserStore } from "@/hooks";
import { TypeUserModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
    handleEdit?: (typeUser: TypeUserModel) => void;
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (typeUser: TypeUserModel) => void;
    items?: any[];
}


export const TypeUserTable = (props: tableProps) => {
    const {
        stateSelect = false,
        handleEdit,
        itemSelect,
        limitInit = 10,
        items = [],
    } = props;

    const { typeUsers, getTypeUsers, deleteTypeUser } = useTypeUserStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [typeUserList, setTypeUserList] = useState<TypeUserModel[]>([]);
    const [query, setQuery] = useState<string>('');


    useEffect(() => {
        getTypeUsers()
    }, []);

    useEffect(() => {
        const filtered = typeUsers.filter((e: TypeUserModel) =>
            e.name.toLowerCase().includes(query.toLowerCase())
        );
        const newTypeUserList = applyPagination(
            query != '' ? filtered : typeUsers,
            page,
            rowsPerPage
        );
        setTypeUserList(newTypeUserList)
    }, [typeUsers, page, rowsPerPage, query])


    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentSearch
                title="Buscar Tipo de usuario"
                search={setQuery}
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
                        {typeUserList.map((typeUser: TypeUserModel) => {
                            const isSelected = items.includes(typeUser.id);
                            return (
                                <TableRow key={typeUser.id} >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => itemSelect!(typeUser)}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{typeUser.name}</TableCell>
                                    {
                                        !stateSelect && <TableCell align="right">
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton onClick={() => handleEdit!(typeUser)} >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton onClick={() => deleteTypeUser(typeUser.id)} >
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
                total={typeUsers.length}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setRowsPerPage(value)}
                page={page}
                limit={rowsPerPage}
            />
        </Stack>
    );
}
