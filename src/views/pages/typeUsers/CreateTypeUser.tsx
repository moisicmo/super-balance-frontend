import { ComponentInput } from "@/components"
import { useForm, useTypeUserStore } from "@/hooks";
import { FormTypeUserModel, FormTypeUserValidations, TypeUserModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
    open: boolean;
    handleClose: () => void;
    item: TypeUserModel | null;
}

const formFields: FormTypeUserModel = {
    name: ''
}

const formValidations: FormTypeUserValidations = {
    name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
}
export const CreateTypeUser = (props: createProps) => {
    const {
        open,
        handleClose,
        item,
    } = props;
    const { postCreateTypeUser, putUpdateTypeUser } = useTypeUserStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { name, onInputChange, isFormValid, nameValid, onResetForm } = useForm(item ?? formFields, formValidations);

    const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        if (item == null) {
            postCreateTypeUser({ name: name.trim() });
        } else {
            putUpdateTypeUser(item.id, { name: name.trim() });
        }
        handleClose();
        onResetForm();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nuevo Tipo de usuario' : `${item.name}`}</DialogTitle>
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
