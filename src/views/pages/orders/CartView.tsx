import { IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography, styled } from "@mui/material";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import { useCartStore } from "@/hooks";
import { CartModel } from "@/models";

interface cartProps {
  warehouseId: string;
}


export const CartView = (props: cartProps) => {
  const {
    warehouseId
  } = props;

  const { cartProducts, onChangeQuantityItem, onDeleteItem } = useCartStore();


  const ElevatedIconButton = styled(IconButton)(({ theme }) => ({
    boxShadow: theme.shadows[1],
    borderRadius: '50%',
    padding: 3,
  }));


  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h6">Productos seleccionados</Typography>
        {
          cartProducts.filter((e: CartModel) => e.warehouseId === warehouseId).map((product: CartModel) => (
            <div key={product.productStatus.id} style={{ borderRadius: 10, border: '1px solid #ccc', padding: 5 }}>
              <Typography>{product.name} - {product.productStatus.name}</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ padding: 0 }}>
                      Precio: {product.productStatus.price} Bs.
                    </TableCell>
                    <TableCell style={{ padding: 0 }} >
                      SubTotal: {product.productStatus.price * product.productStatus.quantity} Bs.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ padding: 0 }}>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <ElevatedIconButton
                          onClick={() => onChangeQuantityItem(product, false)}
                          disabled={product.productStatus.quantity == 1}
                        >
                          <Remove />
                        </ElevatedIconButton>
                        <Typography>{product.productStatus.quantity}</Typography>
                        <ElevatedIconButton
                          onClick={() => onChangeQuantityItem(product, true)}>
                          <Add />
                        </ElevatedIconButton>
                      </Stack>
                    </TableCell>
                    <TableCell style={{ padding: 0 }} >
                      <IconButton onClick={() => onDeleteItem(product)}>
                        <DeleteOutline color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ))
        }
      </Stack>
    </>
  );
}