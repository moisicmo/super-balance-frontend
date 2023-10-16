import { ComponentDate, ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useKardexProductStore } from "@/hooks";
import { FormInputProductModel, FormInputProductValidations, ProductStatusModel, WarehouseModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Switch } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { WarehouseTable } from "../warehouses";
import { ProductTable } from "../products";

interface createProps {
  open: boolean;
  handleClose: () => void;
}

const formFields: FormInputProductModel = {
  warehouseId: null,
  productStatusId: null,
  detail: '',
  quantity: 0,
  price: 0
}

const formValidations: FormInputProductValidations = {
  warehouseId: [(value: WarehouseModel) => value != null, 'Debe ingresar el nombre'],
  productStatusId: [(value: ProductStatusModel) => value != null, 'Debe ingresar el nombre'],
  detail: [(value: string) => value.length >= 0, 'Debe ingresar el nombre'],
  quantity: [(value: number) => value != 0, 'Debe ingresar el nombre'],
  price: [(value: number) => value != 0, 'Debe ingresar el nombre'],
}

export const CreateInputProduct = (props: createProps) => {
  const {
    open,
    handleClose,
  } = props;
  const { postCreateInputProduct } = useKardexProductStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    warehouseId, productStatusId, detail, quantity, price,
    onInputChange, isFormValid, onResetForm, onValueChange,
    warehouseIdValid, productStatusIdValid, detailValid, quantityValid, priceValid,
  } = useForm(formFields, formValidations);


  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    postCreateInputProduct(
      {
        warehouseId: warehouseId.id,
        productStatusId: productStatusId.id,
        detail,
        quantity,
        price,
        dueDate
      });
    handleClose();
    onResetForm();
  }
  const [modalWarehouse, setModalWarehouse] = useState(false);
  const handleModalWarehouse = useCallback((value: boolean) => {
    setModalWarehouse(value);
  }, []);
  const [modalProductStatus, setModalProductStatus] = useState(false);
  const handleModalProductStatus = useCallback((value: boolean) => {
    setModalProductStatus(value);
  }, []);

  // 
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [stateDueDate, setStateDueDate] = useState<boolean>(false)
  const handleDueDate = (event: any) => {
    setStateDueDate(event.target.checked)
  };
  const onDateChanged = (event: Date) => {
    setDueDate(event)
  }
  return (
    <>
      {
        modalWarehouse &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Sucursales:'
          opendrawer={modalWarehouse}
          handleDrawer={handleModalWarehouse}
        >
          <WarehouseTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (warehouseId == null || warehouseId.id != v.id) {
                onValueChange('warehouseId', v)
                handleModalWarehouse(false)
              }
            }}
            items={warehouseId == null ? [] : [warehouseId.id]}
          />
        </ModalSelectComponent>
      }
      {
        modalProductStatus &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Productos:'
          opendrawer={modalProductStatus}
          handleDrawer={handleModalProductStatus}
        >
          <ProductTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              if (productStatusId == null || productStatusId.id != v.id) {
                onValueChange('productStatusId', v)
                handleModalProductStatus(false)
              }
            }}
            items={productStatusId == null ? [] : [productStatusId.id]}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{'Nueva Recepción de Productos'}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={warehouseId != null ? 'Sucursal' : ''}
                  title={warehouseId != null ? warehouseId.name : 'Sucursal'}
                  onPressed={() => handleModalWarehouse(true)}
                  error={!!warehouseIdValid && formSubmitted}
                  helperText={formSubmitted ? warehouseIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={productStatusId != null ? 'Producto' : ''}
                  title={productStatusId != null ? productStatusId.name : 'Producto'}
                  onPressed={() => handleModalProductStatus(true)}
                  error={!!productStatusIdValid && formSubmitted}
                  helperText={formSubmitted ? productStatusIdValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Cantidad"
                  name="quantity"
                  value={quantity}
                  onChange={onInputChange}
                  error={!!quantityValid && formSubmitted}
                  helperText={formSubmitted ? quantityValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Precio"
                  name="price"
                  value={price}
                  onChange={onInputChange}
                  error={!!priceValid && formSubmitted}
                  helperText={formSubmitted ? priceValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Detalle"
                  name="detail"
                  value={detail}
                  onChange={onInputChange}
                  error={!!detailValid && formSubmitted}
                  helperText={formSubmitted ? detailValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <FormControlLabel
                  control={
                    <Switch checked={stateDueDate} onChange={handleDueDate} name="jason" />
                  }
                  label="Fecha de vencimiento"
                />
              </Grid>
              {
                stateDueDate &&
                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                  <ComponentDate
                    value={dueDate}
                    title="Fecha de vencimiento"
                    onChange={(event) => onDateChanged(event)}
                  />
                </Grid>
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              onResetForm();
              handleClose()
            }}>Cancelar</Button>
            <Button type="submit">
              {'CREAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
