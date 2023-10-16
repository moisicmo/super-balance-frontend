import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [] as any[],
    ordersSold: [] as any[],
  },
  reducers: {
    setOrdersSold: (state, action) => {
      state.ordersSold = action.payload.ordersSold;
    },
    setOrders: (state, action) => {
      state.orders = action.payload.orders;
    },
    setAddOrder: (state, action) => {
      state.orders = [...state.orders, action.payload.order];
    },
    setDeleteOrder: (state, action) => {
      state.orders = [...state.orders.filter(e => e.id != action.payload.id)];
    },
  }
});

export const {
  setOrdersSold,
  setOrders,
  setAddOrder,
  setDeleteOrder,
} = orderSlice.actions;