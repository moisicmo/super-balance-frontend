import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddUser, setDeleteUser, setUpdateUser, setUsers } from '@/store';
import Swal from 'sweetalert2';

export const useUserStore = () => {
    const { users } = useSelector((state: any) => state.users);
    const dispatch = useDispatch();

    const getUsers = async () => {
        console.log('OBTENIENDO USUARIOS')
        const { data } = await coffeApi.get('/user/');
        console.log(data)
        dispatch(setUsers({ users: data.users }));
    }

    const postCreateUser = async (body: object) => {
        try {
            console.log('CREANDO USUARIO')
            console.log(body)
            const { data } = await coffeApi.post(`/user/`, body);
            console.log(data)
            dispatch(setAddUser({ user: data.user }));
            Swal.fire('Usuario creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putUpdateUser = async (id: string, body: object) => {
        try {
            const { data } = await coffeApi.put(`/user/${id}`, body);
            console.log(data)
            dispatch(setUpdateUser({ user: data.user }));
            Swal.fire('Se modifico el usuario', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const deleteUser = async (id: string) => {
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
                    const { data } = await coffeApi.delete(`/user/${id}`);
                    console.log(data)
                    dispatch(setDeleteUser({ id }));
                    Swal.fire(
                        'Eliminado',
                        'Usuario eliminado correctamente',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Cancelado',
                        'Usuario esta a salvo :)',
                        'error'
                    )
                }
            });
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    return {
        //* Propiedades
        users,
        //* Métodos
        getUsers,
        postCreateUser,
        putUpdateUser,
        deleteUser,
    }
}