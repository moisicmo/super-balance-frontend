import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useKardexProductStore } from "@/hooks";
import { KardexProductModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

export const MovementTable = () => {

  const { kardexProducts, getAllKardexProducts } = useKardexProductStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [kardexProductList, setKardexProductList] = useState<KardexProductModel[]>([]);



  useEffect(() => {
    getAllKardexProducts()
  }, []);

  useEffect(() => {
    const defaultPermisionsList = applyPagination(
      kardexProducts,
      page,
      rowsPerPage
    );
    setKardexProductList(defaultPermisionsList)
  }, [kardexProducts, page, rowsPerPage])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar mov"
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Sucursal</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Razön</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Detalle</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kardexProductList.map((kardexProduct: KardexProductModel) => {
              return (
                <TableRow key={kardexProduct.id} >
                  <TableCell>{kardexProduct.warehouseId.name}</TableCell>
                  <TableCell>{kardexProduct.modelRef == 'Inputs' ? 'Entrada' : 'Salida'}</TableCell>
                  <TableCell>{kardexProduct.detail}</TableCell>
                  <TableCell>{kardexProduct.inputOrOutput.productStatusId.productId.name}</TableCell>
                  <TableCell>{kardexProduct.inputOrOutput.productStatusId.name}</TableCell>
                  <TableCell>{kardexProduct.inputOrOutput.quatity}</TableCell>
                  <TableCell>{kardexProduct.inputOrOutput.createdAt.toString()}</TableCell>
                  <TableCell>{kardexProduct.inputOrOutput.price}</TableCell>
                  <TableCell>{kardexProduct.stock}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={kardexProducts.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}
