import { ComponentInput, ComponentSelect, MaterialUISwitch, ModalSelectComponent } from "@/components"
import { useForm, useProductStore } from "@/hooks";
import { CategoryModel, FormProductModel, FormProductValidations, ProductModel, UnitMeasurementModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { CategoryTable } from "../categories";
import { UnitMeasurementTable } from "../unitMeasurements";

interface createProps {
    open: boolean;
    handleClose: () => void;
    item: ProductModel | null;
}

const formFields: FormProductModel = {
    name: '',
    price: 0,
    discount: 0,
    typeDiscount: 'Monto',
    categoryId: null,
    unitMeasurementId: null,
}

const formValidations: FormProductValidations = {
    name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
    price: [(value: number) => value != 0, 'Debe ingresar el nombre'],
    categoryId: [(value: CategoryModel) => value != null, 'Debe ingresar el nombre'],
    unitMeasurementId: [(value: UnitMeasurementModel) => value != null, 'Debe ingresar el nombre'],
}

export const CreateProduct = (props: createProps) => {
    const {
        open,
        handleClose,
        item,
    } = props;
    const { postCrateProduct, putUpdateProduct } = useProductStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        name, price, discount, typeDiscount, categoryId, unitMeasurementId,
        onInputChange, isFormValid, onResetForm, onValueChange,
        nameValid, priceValid, categoryIdValid, unitMeasurementIdValid,
    } = useForm(item ?? formFields, formValidations);


    const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        if (item == null) {
            postCrateProduct(
                {
                    name: name.trim(),
                    price: price.trim(),
                    discount: discount,
                    typeDiscount,
                    categoryId: categoryId.id,
                    unitMeasurementId: unitMeasurementId.id,
                });
        } else {
            putUpdateProduct(item.id,
                {
                    name: name.trim(),
                    categoryId: categoryId.id,
                    unitMeasurementId: unitMeasurementId.id,
                }
            );
        }
        handleClose();
        onResetForm();
    }
    const [modalCategory, setModalCategory] = useState(false);
    const [modalUnitMeasurement, setModalUnitMeasurement] = useState(false);
    const handleModalCategory = useCallback((value: boolean) => {
        setModalCategory(value);
    }, []);
    const handleModalUnitMeasurement = useCallback((value: boolean) => {
        setModalUnitMeasurement(value);
    }, []);
    return (
        <>
            {
                modalCategory &&
                <ModalSelectComponent
                    stateSelect={true}
                    stateMultiple={false}
                    title='Categorias:'
                    opendrawer={modalCategory}
                    handleDrawer={handleModalCategory}
                >
                    <CategoryTable
                        stateSelect={true}
                        limitInit={5}
                        itemSelect={(v) => {
                            if (categoryId == null || categoryId.id != v.id) {
                                onValueChange('categoryId', v)
                                handleModalCategory(false)
                            }
                        }}
                        items={categoryId == null ? [] : [categoryId.id]}
                    />
                </ModalSelectComponent>
            }
            {
                modalUnitMeasurement &&
                <ModalSelectComponent
                    stateSelect={true}
                    stateMultiple={false}
                    title='Unidades de medida:'
                    opendrawer={modalUnitMeasurement}
                    handleDrawer={handleModalUnitMeasurement}
                >
                    <UnitMeasurementTable
                        stateSelect={true}
                        limitInit={5}
                        itemSelect={(v) => {
                            if (unitMeasurementId == null || unitMeasurementId.id != v.id) {
                                onValueChange('unitMeasurementId', v)
                                handleModalUnitMeasurement(false)
                            }
                        }}
                        items={unitMeasurementId == null ? [] : [unitMeasurementId.id]}
                    />
                </ModalSelectComponent>
            }
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nuevo Producto' : `${item.name}`}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent sx={{ display: 'flex' }}>
                        <Grid container>
                            <Grid item xs={12} sm={!item ? 6 : 12} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Nombre"
                                    name="name"
                                    value={name}
                                    onChange={onInputChange}
                                    error={!!nameValid && formSubmitted}
                                    helperText={formSubmitted ? nameValid : ''}
                                />
                            </Grid>
                            {
                                !item && <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
                            }
                            {
                                !item && <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                    <ComponentInput
                                        type="text"
                                        label="Descuento"
                                        name="discount"
                                        value={discount}
                                        onChange={onInputChange}
                                    />
                                </Grid>
                            }
                            {
                                !item && <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                    <Stack direction="row" alignItems="center" justifyContent="center">
                                        <Typography>Monto</Typography>
                                        <MaterialUISwitch
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    onValueChange('typeDiscount', 'Porcentaje')
                                                } else {
                                                    onValueChange('typeDiscount', 'Monto')
                                                }
                                            }}
                                        />
                                        <Typography>Porcentaje</Typography>
                                    </Stack>
                                </Grid>
                            }
                            <Grid item xs={12} sm={!item ? 6 : 12} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    label={categoryId != null ? 'Categoria' : ''}
                                    title={categoryId != null ? categoryId.name : 'Categoria'}
                                    onPressed={() => handleModalCategory(true)}
                                    error={!!categoryIdValid && formSubmitted}
                                    helperText={formSubmitted ? categoryIdValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={!item ? 6 : 12} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    label={unitMeasurementId != null ? 'Unidad de medida' : ''}
                                    title={unitMeasurementId != null ? unitMeasurementId.name : 'Unidad de medida'}
                                    onPressed={() => handleModalUnitMeasurement(true)}
                                    error={!!unitMeasurementIdValid && formSubmitted}
                                    helperText={formSubmitted ? unitMeasurementIdValid : ''}
                                />
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            onResetForm();
                            handleClose()
                        }}>Cancelar</Button>
                        <Button type="submit">
                            {item == null ? 'CREAR' : 'EDITAR'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
