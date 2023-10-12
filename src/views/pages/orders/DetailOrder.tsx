import { Button, IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { CancelOutlined } from "@mui/icons-material";
import { useCartStore, useCustomerStore, useForm } from "@/hooks";
import { ComponentInput } from "@/components";
import { CartModel, CustomerModel } from "@/models";


interface cartProps {
  warehouseId: string;
}

const formFields = {
  search: '',
}


export const DetailSale = (props: cartProps) => {
  const {
    warehouseId
  } = props;

  const { search, onInputChange } = useForm(formFields);

  const { getCustomers } = useCustomerStore();
  const { cartProducts = [] } = useCartStore();
  const { customers = [] } = useCustomerStore();
  const [customerPicker, setCustomerPicker] = useState<CustomerModel | null>(null)
  useEffect(() => {
    getCustomers();
  }, []);

  const handleCustomer = (customer: CustomerModel) => {
    setCustomerPicker(customer)
  }

  const onDeleteCustomer = () => {
    setCustomerPicker(null)
  }

  const sale = () => {
    console.log(customerPicker)
    console.log(cartProducts)
  }

  const total = cartProducts.filter((e: CartModel) => e.warehouseId === warehouseId).reduce(
    (accumulator: number, product: CartModel) => accumulator + (product.productStatus.price * product.productStatus.quantity),
    0
  );



  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h6">Detalles de la orden</Typography>
      </Stack>
      <Table size="small" aria-label="a dense table">
        <TableBody>
          <TableRow>
            <TableCell component="th">
              Total a pagar:
            </TableCell>
            <TableCell component="th">
              {total} Bs.
            </TableCell>
          </TableRow>
          {
            customerPicker != null && <TableRow>
              <TableCell component="th" style={{ padding: 0 }}>
                Cliente: {customerPicker.name}
              </TableCell>
              <TableCell component="th" style={{ padding: 0 }}>
                <IconButton onClick={() => onDeleteCustomer()}>
                  <CancelOutlined color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
      {
        customerPicker == null && <>
          <ComponentInput
            type="text"
            label="Buscar Cliente"
            name="search"
            value={search}
            onChange={(v: any) => onInputChange(v, true)}
          />
          <Table size="small" aria-label="a dense table">
            <TableBody>
              {customers
                .filter((customer: CustomerModel) =>
                  search !== "" &&
                  (customer.name.trim().toUpperCase().includes(search.trim().toUpperCase()) ||
                    customer.numberDocument.toString().includes(search.trim().toUpperCase()))
                )
                .map((customer: CustomerModel) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <Button
                        fullWidth
                        variant="outlined"
                        style={{ margin: 5 }}
                        onClick={() => handleCustomer(customer)}
                      >
                        {customer.name}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      }
      {

        total > 0 && customerPicker != null &&
        <Button
          variant="contained"
          fullWidth style={{ padding: 5 }}
          onClick={() => sale()}
        >
          Generar orden
        </Button>
      }
    </>
  )
}