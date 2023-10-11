import { ProductModel, ProductStatusModel, WarehouseModel } from '@/models';
import { setAddCartProduct } from '@/store';
import { useDispatch, useSelector } from 'react-redux';


export const useCartStore = () => {
  const { cartProducts } = useSelector((state: any) => state.cartProducts);
  const dispatch = useDispatch();

  const setAddCart = async (product: ProductModel, productStatus: ProductStatusModel, quantity: number, warehouseId: WarehouseModel) => {
    const newProductStatus = { ...productStatus, quantity }
    const newProduct = { ...product, productStatus: newProductStatus, warehouseId }
    console.log(newProduct)
    dispatch(setAddCartProduct({ cartProducts: newProduct }))
  }

  return {
    //* Propiedades
    cartProducts,
    //* Métodos
    setAddCart,
  }
}