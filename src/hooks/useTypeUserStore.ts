import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddTypeUser, setDeleteTypeUser, setTypeUsers, setUpdateTypeUser } from '@/store';
import Swal from 'sweetalert2';

export const useTypeUserStore = () => {
    const { typeUsers } = useSelector((state: any) => state.typeUsers);
    const dispatch = useDispatch();

    const getTypeUsers = async () => {
        console.log('OBTENIENDO TIPOS DE USUARIOS')
        const { data } = await coffeApi.get('/typeuser/');
        console.log(data)
        dispatch(setTypeUsers({ typeUsers: data.typeUsers }));
    }

    const postCreateTypeUser = async (body: object) => {
        try {
            console.log('CREANDO TIPO DE USUARIO')
            const { data } = await coffeApi.post(`/typeuser/`, body);
            console.log(data)
            dispatch(setAddTypeUser({ typeUser: data.typeUser }));
            Swal.fire('Tipo de usuario creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putUpdateTypeUser = async (id: string, body: object) => {
        try {
            const { data } = await coffeApi.put(`/typeuser/${id}`, body);
            console.log(data)
            dispatch(setUpdateTypeUser({ typeUser: data.typeUser }));
            Swal.fire('Se modifico el tipo de usuario', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const deleteTypeUser = async (id: string) => {
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
                    const { data } = await coffeApi.delete(`/typeuser/${id}`);
                    console.log(data)
                    dispatch(setDeleteTypeUser({ id }));
                    Swal.fire(
                        'Eliminado',
                        'Tipo de usuario eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'El tipo de usuario esta a salvo :)',
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
        typeUsers,
        //* Métodos
        getTypeUsers,
        postCreateTypeUser,
        putUpdateTypeUser,
        deleteTypeUser,
    }
}