import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useCustomerStore } from '@/hooks';
import { CustomerModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
    handleEdit?: (customer: CustomerModel) => void;
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (customer: CustomerModel) => void;
    items?: any[];
}


export const CustomerTable = (props: tableProps) => {
    const {
        stateSelect = false,
        handleEdit,
        itemSelect,
        limitInit = 10,
        items = [],
    } = props;

    const { customers, getCustomers, deleteCustomer } = useCustomerStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [customerList, setCustomerList] = useState<CustomerModel[]>([]);



    useEffect(() => {
        getCustomers()
    }, []);

    useEffect(() => {
        const defaultPermisionsList = applyPagination(
            customers,
            page,
            rowsPerPage
        );
        setCustomerList(defaultPermisionsList)
    }, [customers, page, rowsPerPage])


    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentSearch
                title="Buscar Cliente"
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
                        {customerList.map((customer: CustomerModel) => {
                            const isSelected = items.includes(customer.id);
                            return (
                                <TableRow key={customer.id} >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => itemSelect!(customer)}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{customer.name}</TableCell>
                                    {
                                        !stateSelect && <TableCell align="right">
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton onClick={() => handleEdit!(customer)} >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton onClick={() => deleteCustomer(customer.id)} >
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
                total={customers.length}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setRowsPerPage(value)}
                page={page}
                limit={rowsPerPage}
            />
        </Stack>
    );
}
