import { ComponentInput } from "@/components";
import { useCartStore, useForm, useKardexProductStore, useProductStore, useWarehouseStore } from "@/hooks";
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, Table, TableBody, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CartView, DetailSale, ProductsStoreView } from ".";
import { CartModel, ProductModel, ProductStatusModel } from "@/models";

const formFields = {
  search: ''
}
export const OrderView = () => {
  const { search, onInputChange } = useForm(formFields);

  const { products = [], getProducts } = useProductStore();
  const { warehouses = [], getWarehouses } = useWarehouseStore();
  const { cartProducts = [] } = useCartStore();
  const { getAllKardexProducts } = useKardexProductStore();

  useEffect(() => {
    getWarehouses();
    getProducts();
    getAllKardexProducts();
  }, []);

  const [warehouse, setWarehouse] = useState<string | null>(null);
  const handleChangeSucursal = (value: string) => setWarehouse(value);

  return (
    <Grid container>
      <Grid item xs={12} sm={warehouse != null ? 5 : 12} sx={{ padding: '5px' }}>
        <Stack spacing={1}>
          <Typography variant="h5">Ordenes</Typography>
        </Stack>
        <FormControl fullWidth style={{ padding: 5 }}>
          <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={warehouse ?? ""}
            label="Sucursal"
            onChange={(e) => handleChangeSucursal(e.target.value)}
            style={{ borderRadius: '10px' }}
          >
            {
              warehouses.map((e: any) => (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>))
            }
          </Select>
        </FormControl>
        {
          warehouse &&
          <>
            <ComponentInput
              type="text"
              label="Buscar Producto"
              name="search"
              value={search}
              onChange={(v: any) => onInputChange(v, true)}
            />
            <Table size="small" aria-label="a dense table">
              <TableBody>
                {
                  products.filter((product: ProductModel) => search !== "" && (
                    (product.name.trim().toUpperCase().includes(search.trim().toUpperCase())) ||
                    (product.code.trim().toUpperCase().includes(search.trim().toUpperCase()))
                  ))
                    .map((product: ProductModel) => {
                      const newProduct = {
                        ...product,
                        productStatus: [...product.productStatus.filter((productStatus: ProductStatusModel) => !cartProducts.filter((cart: CartModel) => cart.warehouseId === warehouse).map((e: any) => e.productStatus.id).includes(productStatus.id))]
                      };
                      return newProduct.productStatus.length > 0 && (
                        <ProductsStoreView key={newProduct.id} product={newProduct} warehouseId={warehouse} />
                      )
                    })
                }
              </TableBody>
            </Table>
          </>
        }
      </Grid>
      {
        warehouse != null &&
        <Grid item xs={12} sm={7} sx={{ padding: '5px' }}>
          <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
            <CartView warehouseId={warehouse} />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
            <DetailSale warehouseId={warehouse} />
          </Grid>
        </Grid>
      }
    </Grid >
  )
}
