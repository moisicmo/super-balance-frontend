import { ComponentButton, ComponentTablePagination } from "@/components";
import { useCategoryStore } from "@/hooks";
import { CategoryModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CreateCategory } from ".";

interface tableProps {
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (customer: CategoryModel) => void;
    items?: any[];
}

export const CategoryTable = (props: tableProps) => {
    const {
        stateSelect = false,
        itemSelect,
        limitInit = 10,
        items = [],
    } = props;

    const { categories, getCategories } = useCategoryStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<CategoryModel | null>(null);

    /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemEdit(null)
        setopenDialog(value);
    }, []);

    useEffect(() => {
        getCategories()
    }, []);

    useEffect(() => {
        const defaultPermisionsList = applyPagination(
            categories,
            page,
            rowsPerPage
        );
        setCategoryList(defaultPermisionsList)
    }, [categories, page, rowsPerPage])


    return (
        <>
            <Stack sx={{ paddingRight: '10px' }}>
                <ComponentButton
                    text="Crear Categoria"
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
                            {categoryList.map((category: CategoryModel) => {
                                const isSelected = items.includes(category.id);
                                return (
                                    <TableRow key={category.id} >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => itemSelect!(category)}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>{category.name}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ComponentTablePagination
                    total={categories.length}
                    onPageChange={(value) => setPage(value)}
                    onRowsPerPageChange={(value) => setRowsPerPage(value)}
                    page={page}
                    limit={rowsPerPage}
                />
            </Stack>
            {
                openDialog &&
                <CreateCategory
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit}
                />
            }
        </>
    );
}
