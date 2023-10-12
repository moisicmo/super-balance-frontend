import { configureStore } from '@reduxjs/toolkit';
import { kardexProductSlice } from './kardexProduct/kardexProductSlice';
import {
    authSlice,
    customerSlice,
    permissionSlice,
    roleSlice,
    typeUserSlice,
    userSlice,
    warehouseSlice,
    productSlice,
    categorySlice,
    unitMeasurementSlice,
    cartProductSlice,

} from '.';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        warehouses: warehouseSlice.reducer,
        permissions: permissionSlice.reducer,
        typeUsers: typeUserSlice.reducer,
        roles: roleSlice.reducer,
        users: userSlice.reducer,
        customers: customerSlice.reducer,
        products: productSlice.reducer,
        categories: categorySlice.reducer,
        unitMeasurements: unitMeasurementSlice.reducer,
        kardexProducts: kardexProductSlice.reducer,
        cartProducts: cartProductSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})