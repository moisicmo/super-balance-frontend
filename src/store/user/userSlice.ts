import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../models';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [] as UserModel[],
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.users;
        },
        setAddUser: (state, action) => {
            state.users = [...state.users, action.payload.user];
        },
        setUpdateUser: (state, action) => {
            state.users = [...state.users.map((e) => {
                if (e.id === action.payload.user.id) {
                    return {
                        ...action.payload.user
                    }
                }
                return e
            })];
        },
        setDeleteUser: (state, action) => {
            state.users = [...state.users.filter(e => e.id != action.payload.id)];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    setUsers,
    setAddUser,
    setUpdateUser,
    setDeleteUser,
} = userSlice.actions;