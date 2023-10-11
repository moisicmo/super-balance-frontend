import { createSlice } from '@reduxjs/toolkit';
import { WarehouseModel } from '../../models';

export const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState: {
        warehouses: [] as WarehouseModel[],
    },
    reducers: {
        //warehouse
        setWarehouses: (state, action) => {
            state.warehouses = action.payload.warehouses;
        },
        setAddWarehouse: (state, action) => {
            state.warehouses = [...state.warehouses, action.payload.warehouse];
        },
        setUpdateWarehouse: (state, action) => {
            state.warehouses = [...state.warehouses.map((e) => {
                if (e.id === action.payload.warehouse.id) {
                    return {
                        ...action.payload.warehouse
                    }
                }
                return e
            })];
        },
        setDeleteWarehouse: (state, action) => {
            state.warehouses = [...state.warehouses.filter(e => e.id != action.payload.id)];
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    //warehouses
    setWarehouses,
    setAddWarehouse,
    setUpdateWarehouse,
    setDeleteWarehouse,
} = warehouseSlice.actions;