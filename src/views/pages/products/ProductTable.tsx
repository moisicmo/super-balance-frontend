import { ComponentSearch, ComponentTablePagination, SeverityPill } from "@/components";
import { useProductStore } from "@/hooks";
import { ProductModel, ProductStatusModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { Box, IconButton, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProductStatusTable } from "./productStatus";
import imagelogo from '@/assets/images/no-image.webp';
interface tableProps {
    handleEdit?: (product: ProductModel) => void;
    limitInit?: number;
    stateSelect?: boolean;
    itemSelect?: (productStatus: ProductStatusModel) => void;
    items?: any[];
}

export const ProductTable = (props: tableProps) => {
    const {
        stateSelect = false,
        handleEdit,
        itemSelect,
        limitInit = 10,
        items = [],
    } = props;

    const { products, getProducts, deleteProduct } = useProductStore();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(limitInit);
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [openIndex, setOpenIndex] = useState<string | null>(null);


    useEffect(() => {
        getProducts()
    }, []);

    useEffect(() => {
        const defaultPermisionsList = applyPagination(
            products,
            page,
            rowsPerPage
        );
        setProductList(defaultPermisionsList)
    }, [products, page, rowsPerPage])


    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentSearch
                title="Buscar Producto"
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Estados</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Imagen</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Cod. Barras</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Categoria</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Und. medida</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Visible</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                            {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((product: ProductModel) => (
                            <React.Fragment key={product.id} >
                                <TableRow key={product.id} >

                                    <TableCell>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => {
                                                if (openIndex == product.id) {
                                                    setOpenIndex(null)
                                                } else {

                                                    setOpenIndex(product.id);
                                                }
                                            }}
                                        >
                                            {openIndex == product.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{product.code}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 100,
                                                width: 100,
                                            }}
                                            alt={product.name}
                                            src={product.image ?? imagelogo}
                                        />
                                    </TableCell>
                                    <TableCell>{product.barCode ?? ''}</TableCell>
                                    <TableCell>{product.categoryId.name}</TableCell>
                                    <TableCell>{product.unitMeasurementId.name}</TableCell>
                                    {
                                        !stateSelect && <TableCell>
                                            <Switch
                                                checked={product.visible}
                                                onChange={() => { }}
                                                color="success"
                                                size="small"
                                            />
                                        </TableCell>
                                    }
                                    {
                                        !stateSelect && <TableCell>
                                            <SeverityPill color={product.state ? 'success' : 'error'}>
                                                {product.state ? 'Activo' : 'Inactivo'}
                                            </SeverityPill>
                                        </TableCell>
                                    }
                                    {
                                        !stateSelect && <TableCell align="right">
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton onClick={() => handleEdit!(product)} >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton onClick={() => deleteProduct(product.id)} >
                                                    <DeleteOutline color="error" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    }
                                </TableRow>
                                <ProductStatusTable
                                    openIndex={openIndex!}
                                    product={product}
                                    stateSelect={stateSelect}
                                    itemSelect={itemSelect}
                                    items={items}
                                />
                            </React.Fragment>
                        )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <ComponentTablePagination
                total={products.length}
                onPageChange={(value) => setPage(value)}
                onRowsPerPageChange={(value) => setRowsPerPage(value)}
                page={page}
                limit={rowsPerPage}
            />
        </Stack>
    );
}
