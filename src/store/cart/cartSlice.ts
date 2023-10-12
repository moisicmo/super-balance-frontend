import { createSlice } from '@reduxjs/toolkit';
import { CartModel } from '../../models';

export const cartProductSlice = createSlice({
  name: 'cartProduct',
  initialState: {
    cartProducts: [] as CartModel[],
  },
  reducers: {
    setAddCartProduct: (state, action) => {
      console.log(action.payload.cartProduct)
      state.cartProducts = [...state.cartProducts, action.payload.cartProduct];
    },
    setUpdateCartProduct: (state, action) => {
      state.cartProducts = state.cartProducts.map((e: CartModel) => {
        if (e.warehouseId === action.payload.cartProduct.warehouseId && e.productStatus.id === action.payload.cartProduct.productStatus.id) {
          return {
            ...action.payload.cartProduct
          };
        }
        return e;
      });
    },
    setDeleteCartProduct: (state, action) => {
      state.cartProducts = [...state.cartProducts.filter((e) => (e.warehouseId != action.payload.cartProduct.warehouseId) || (e.productStatus.id != action.payload.cartProduct.productStatus.id))]
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  setAddCartProduct,
  setUpdateCartProduct,
  setDeleteCartProduct,
} = cartProductSlice.actions;