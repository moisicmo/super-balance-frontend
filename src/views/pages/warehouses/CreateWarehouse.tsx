import { ComponentInput } from "@/components"
import { useForm, useWarehouseStore } from "@/hooks";
import { FormWarehouseModel, FormWarehouseValidations, WarehouseModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
    open: boolean;
    handleClose: () => void;
    item: WarehouseModel | null;
}

const formFields: FormWarehouseModel = {
    name: '',
    address: '',
    phone: 0
}

const formValidations: FormWarehouseValidations = {
    name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
    address: [(value: string) => value.length >= 1, 'Debe ingresar la direcciön'],
    phone: [(value: number) => value != 0, 'Debe ingresar el nombre'],
}

export const CreateWarehouse = (props: createProps) => {
    const {
        open,
        handleClose,
        item,
    } = props;
    const { postCreateWarehouse, putUpdateWarehouse } = useWarehouseStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { name, address, phone, onInputChange, isFormValid, nameValid, addressValid, phoneValid, onResetForm } = useForm(item ?? formFields, formValidations);

    const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        if (item == null) {
            postCreateWarehouse(
                {
                    name: name.trim(),
                    address: address.trim(),
                    phone: phone,
                });
        } else {
            putUpdateWarehouse(item.id,
                {
                    name: name.trim(),
                    address: address.trim(),
                    phone: phone,
                });
        }
        handleClose();
        onResetForm();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nueva Sucursal' : `Tipo de cliente: ${item.name}`}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent sx={{ display: 'flex' }}>
                        <ComponentInput
                            type="text"
                            label="Nombre"
                            name="name"
                            value={name}
                            onChange={onInputChange}
                            error={!!nameValid && formSubmitted}
                            helperText={formSubmitted ? nameValid : ''}
                        />
                        <ComponentInput
                            type="text"
                            label="Dirección"
                            name="address"
                            value={address}
                            onChange={onInputChange}
                            error={!!addressValid && formSubmitted}
                            helperText={formSubmitted ? addressValid : ''}
                        />
                        <ComponentInput
                            type="text"
                            label="Telefono"
                            name="phone"
                            value={phone}
                            onChange={onInputChange}
                            error={!!phoneValid && formSubmitted}
                            helperText={formSubmitted ? phoneValid : ''}

                        />
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
