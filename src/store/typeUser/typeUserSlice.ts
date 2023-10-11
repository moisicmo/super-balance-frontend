import { createSlice } from '@reduxjs/toolkit';
import { TypeUserModel } from '../../models';

export const typeUserSlice = createSlice({
    name: 'typeUser',
    initialState: {
        typeUsers: [] as TypeUserModel[],
    },
    reducers: {
        //warehouse
        setTypeUsers: (state, action) => {
            state.typeUsers = action.payload.typeUsers;
        },
        setAddTypeUser: (state, action) => {
            state.typeUsers = [...state.typeUsers, action.payload.typeUser];
        },
        setUpdateTypeUser: (state, action) => {
            state.typeUsers = [...state.typeUsers.map((e) => {
                if (e.id === action.payload.typeUser.id) {
                    return {
                        ...action.payload.typeUser
                    }
                }
                return e
            })];
        },
        setDeleteTypeUser: (state, action) => {
            state.typeUsers = [...state.typeUsers.filter(e => e.id != action.payload.id)];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    //warehouses
    setTypeUsers,
    setAddTypeUser,
    setUpdateTypeUser,
    setDeleteTypeUser,
} = typeUserSlice.actions;