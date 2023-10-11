import { createSlice } from '@reduxjs/toolkit';
import { CartModel } from '../../models';

export const cartProductsSlice = createSlice({
  name: 'cartProducts',
  initialState: {
    cartProducts: [] as CartModel[],
  },
  reducers: {
    setAddCartProduct: (state, action) => {
      state.cartProducts = [...state.cartProducts, action.payload.cart];
    },
    // setUpdateCartProduct: (state, action) => {
    //   // state.cart = state.cart.map((e: CartModel) => {
    //   //   if (e.warehouseId === action.payload.product.warehouseId && e.cart.id === action.payload.product.productStatus.id) {
    //   //     return {
    //   //       ...action.payload.product
    //   //     };
    //   //   }
    //   //   return e;
    //   // });
    // },
    // setDeleteCartProduct: (state, action) => {
    //   // state.cart = [...state.cart.filter((e) => (e.warehouseId != action.payload.product.warehouseId) || (e.cart.id != action.payload.product.productStatus.id))]
    // },
  }
});

// Action creators are generated for each case reducer function
export const {
  setAddCartProduct,
  // setUpdateCartProduct,
  // setDeleteCartProduct,
} = cartProductsSlice.actions;