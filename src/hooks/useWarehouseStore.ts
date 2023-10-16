import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddWarehouse, setDeleteWarehouse, setUpdateWarehouse, setWarehouses } from '@/store';
import Swal from 'sweetalert2';

export const useWarehouseStore = () => {
    const { warehouses } = useSelector((state: any) => state.warehouses);
    const dispatch = useDispatch();

    const getWarehouses = async () => {
        console.log('OBTENIENDO TODOS LOS TIPOS DE CLIENTES')
        const { data } = await coffeApi.get(`/warehouse`)
        console.log(data)
        dispatch(setWarehouses({ warehouses: data.warehouses }));
    }

    const postCreateWarehouse = async (body: object) => {
        try {
            const { data } = await coffeApi.post('/warehouse/', body);
            console.log(data)
            dispatch(setAddWarehouse({ warehouse: data.warehouse }));
            Swal.fire('Sucursal creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putUpdateWarehouse = async (id: string, body: object) => {
        try {
            const { data } = await coffeApi.put(`/warehouse/${id}`, body);
            console.log(data)
            dispatch(setUpdateWarehouse({ warehouse: data.warehouse }));
            Swal.fire('Sucursal editado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const deleteWarehouse = async (id: string) => {
        try {
            Swal.fire({
                title: '¿Estas seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, bórralo!',
                cancelButtonText: '¡No, cancelar!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await coffeApi.delete(`/warehouse/${id}`);
                    dispatch(setDeleteWarehouse({ id }));
                    console.log(data)
                    Swal.fire(
                        'Eliminado',
                        'Sucursal eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El sucursal esta a salvo :)',
                        'error'
                    )
                }
            }).catch((error) => {
                console.log(error)
                Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
            });
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    return {
        //* Propiedades
        warehouses,
        //* Métodos
        getWarehouses,
        postCreateWarehouse,
        putUpdateWarehouse,
        deleteWarehouse,
    }
}