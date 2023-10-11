import { SeverityPill } from '@/components';
import { ProductModel, ProductStatusModel } from '@/models';
import { Add, DeleteOutline } from '@mui/icons-material';
import { Box, Button, Checkbox, Collapse, IconButton, Stack, SvgIcon, Switch, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'


interface tableProps {
    openIndex: string;
    product: ProductModel;
    stateSelect?: boolean;
    itemSelect?: (productStatus: ProductStatusModel) => void;
    items?: any[];
}

export const ProductStatusTable = (props: tableProps) => {
    const {
        openIndex,
        product,
        stateSelect = false,
        itemSelect,
        items = [],
    } = props;
    return (
        <TableRow

            style={{ backgroundColor: (openIndex == product.id) ? '#f2f2f2' : '#fff' }}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                <Collapse in={openIndex == product.id} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Stack direction="row" justifyContent="space-between">
                            <Stack spacing={1}>
                                <Typography>Estados del producto: {product.name}</Typography>
                            </Stack>
                            <div>
                                <Button
                                    onClick={() => { }}
                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
                                    variant="contained"
                                >
                                    Nuevo estado
                                </Button>
                            </div>
                        </Stack>

                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    {stateSelect && <TableCell />}
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Precio referencia</TableCell>
                                    <TableCell>Descuento</TableCell>
                                    <TableCell>Tipo Descuento</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {product.productStatus.map((productStatus) => {
                                    const isSelected = items.includes(productStatus.id);
                                    return (
                                        <TableRow key={productStatus.id}>
                                            {
                                                stateSelect && <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onChange={() => itemSelect!(productStatus)}
                                                    />
                                                </TableCell>
                                            }
                                            <TableCell component="th" scope="row">
                                                {productStatus.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {productStatus.price}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {productStatus.discount}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {productStatus.typeDiscount}
                                            </TableCell>
                                            <TableCell>
                                                <SeverityPill color={productStatus.state ? 'success' : 'error'}>
                                                    {productStatus.state ? 'Activo' : 'Inactivo'}
                                                </SeverityPill>
                                            </TableCell>
                                            <TableCell>
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    {/* <IconButton
                                                    onClick={() => handleDialog(true, {}, productStatus)}
                                                    disabled={permisions().filter((e) => e.name === 'Editar tipos de usuario').length == 0}
                                                >
                                                    <EditOutlined color="info" />
                                                </IconButton> */}
                                                    <Switch
                                                        checked={productStatus.state}
                                                        onChange={() => { }}
                                                        color="success"
                                                        size="small"
                                                    />
                                                    <IconButton
                                                        onClick={() => { }}
                                                    >
                                                        <DeleteOutline color="error" />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}
