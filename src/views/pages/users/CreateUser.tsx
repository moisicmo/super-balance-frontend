import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useForm, useUserStore } from "@/hooks";
import { FormUserModel, FormUserValidations, RoleModel, TypeUserModel, WarehouseModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useCallback, useState } from "react";
import { WarehouseTable } from "../warehouses";
import { RoleTable } from "../roles";
import { TypeUserTable } from "../typeUsers";

interface createProps {
    open: boolean;
    handleClose: () => void;
    item: TypeUserModel | null;
}

const formFields: FormUserModel = {
    name: '',
    lastName: '',
    email: '',
    roleId: null,
    typeUserId: null,
    warehouses: [],
}

const formValidations: FormUserValidations = {
    name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
    lastName: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
    email: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
    roleId: [(value: RoleModel) => value != null, 'Debe ingresar el nombre'],
    typeUserId: [(value: TypeUserModel) => value != null, 'Debe ingresar el nombre'],
    warehouses: [(value: WarehouseModel[]) => value.length >= 1, 'Debe ingresar el nombre'],
}
export const CreateUser = (props: createProps) => {
    const {
        open,
        handleClose,
        item,
    } = props;
    const { postCreateUser, putUpdateUser } = useUserStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        name, lastName, email, roleId, typeUserId, warehouses,
        onInputChange, isFormValid, onResetForm, onValueChange,
        nameValid, lastNameValid, emailValid, roleIdValid, typeUserIdValid, warehousesValid,
    } = useForm(item ?? formFields, formValidations);

    const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        if (item == null) {
            postCreateUser(
                {
                    name: name.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    roleId: roleId.id,
                    typeUserId: typeUserId.id,
                    warehouses: warehouses.map((e: WarehouseModel) => e.id)
                });
        } else {
            putUpdateUser(item.id,
                {
                    name: name.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    roleId: roleId.id,
                    typeUserId: typeUserId.id,
                    warehouses: warehouses.map((e: WarehouseModel) => e.id)
                });
        }
        handleClose();
        onResetForm();
    }

    const [modalRole, setModalRole] = useState(false);
    const [modalTypeUser, setModalTypeUser] = useState(false);
    const [modalWarehouse, setModalWarehouse] = useState(false);
    const handleModalRole = useCallback((value: boolean) => {
        setModalRole(value);
    }, []);
    const handleModalTypeUser = useCallback((value: boolean) => {
        setModalTypeUser(value);
    }, []);

    const handleModalWarehouse = useCallback((value: boolean) => {
        setModalWarehouse(value);
    }, []);
    return (
        <>
            {
                modalRole &&
                <ModalSelectComponent
                    stateSelect={true}
                    stateMultiple={false}
                    title='Roles:'
                    opendrawer={modalRole}
                    handleDrawer={handleModalRole}
                >
                    <RoleTable
                        stateSelect={true}
                        limitInit={5}
                        itemSelect={(v) => {
                            if (roleId == null || roleId.id != v.id) {
                                onValueChange('roleId', v)
                                handleModalRole(false)
                            }
                        }}
                        items={roleId == null ? [] : [roleId.id]}
                    />
                </ModalSelectComponent>
            }
            {
                modalTypeUser &&
                <ModalSelectComponent
                    stateSelect={true}
                    stateMultiple={false}
                    title='Tipos de Usuarios:'
                    opendrawer={modalTypeUser}
                    handleDrawer={handleModalTypeUser}
                >
                    <TypeUserTable
                        stateSelect={true}
                        limitInit={5}
                        itemSelect={(v) => {
                            if (typeUserId == null || typeUserId.id != v.id) {
                                onValueChange('typeUserId', v)
                                handleModalTypeUser(false)
                            }
                        }}
                        items={typeUserId == null ? [] : [typeUserId.id]}
                    />
                </ModalSelectComponent>
            }
            {
                modalWarehouse &&
                <ModalSelectComponent
                    stateSelect={true}
                    stateMultiple={true}
                    title='Sucursales:'
                    opendrawer={modalWarehouse}
                    handleDrawer={handleModalWarehouse}
                >
                    <WarehouseTable
                        stateSelect={true}
                        limitInit={5}
                        itemSelect={(v) => {
                            if (warehouses.map((e: WarehouseModel) => e.id).includes(v.id)) {
                                onValueChange('warehouses', [...warehouses.filter((e: WarehouseModel) => e.id != v.id)])
                            } else {
                                onValueChange('warehouses', [...warehouses, v])
                            }
                        }}
                        items={warehouses.map((e: WarehouseModel) => (e.id))}
                    />
                </ModalSelectComponent>
            }
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nuevo Tipo de usuario' : `${item.name}`}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent sx={{ display: 'flex' }}>
                        <Grid container>
                            <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
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
                            <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Apellido"
                                    name="lastName"
                                    value={lastName}
                                    onChange={onInputChange}
                                    error={!!lastNameValid && formSubmitted}
                                    helperText={formSubmitted ? lastNameValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="email"
                                    label="Correo"
                                    name="email"
                                    value={email}
                                    onChange={onInputChange}
                                    error={!!emailValid && formSubmitted}
                                    helperText={formSubmitted ? emailValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    label={roleId != null ? 'Rol' : ''}
                                    title={roleId != null ? roleId.name : 'Rol'}
                                    onPressed={() => handleModalRole(true)}
                                    error={!!roleIdValid && formSubmitted}
                                    helperText={formSubmitted ? roleIdValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    label={typeUserId != null ? 'Tipo de usuario' : ''}
                                    title={typeUserId != null ? typeUserId.name : 'Tipo de usuario'}
                                    onPressed={() => handleModalTypeUser(true)}
                                    error={!!typeUserIdValid && formSubmitted}
                                    helperText={formSubmitted ? typeUserIdValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    label={warehouses != null ? '' : 'Sucursales'}
                                    title={'Sucursales'}
                                    onPressed={() => handleModalWarehouse(true)}
                                    error={!!warehousesValid && formSubmitted}
                                    helperText={formSubmitted ? warehousesValid : ''}
                                    items={warehouses.map((e: WarehouseModel) => ({ id: e.id, name: e.name }))}
                                    onRemove={(v) => onValueChange('warehouses', [...warehouses.filter((e: WarehouseModel) => e.id != v)])}
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
