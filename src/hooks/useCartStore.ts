import { CartModel } from '@/models';
import { setAddCartProduct, setDeleteCartProduct, setUpdateCartProduct } from '@/store';
import { useDispatch, useSelector } from 'react-redux';


export const useCartStore = () => {
  const { cartProducts } = useSelector((state: any) => state.cartProducts);
  const dispatch = useDispatch();

  const setAddCart = async (body: object) => {
    console.log(body)
    dispatch(setAddCartProduct({ cartProduct: body }))
  }

  const onChangeQuantityItem = async (product: CartModel, isAdd: Boolean) => {
    console.log(product)
    const quantity = isAdd ? product.productStatus.quantity + 1 : product.productStatus.quantity - 1;
    const newProductStatus = { ...product.productStatus, quantity }
    const newProduct = { ...product, productStatus: newProductStatus }
    dispatch(setUpdateCartProduct({ cartProduct: newProduct }))
  }

  const onDeleteItem = async (product: CartModel) => {
    dispatch(setDeleteCartProduct({ cartProduct: product }))
  }
  return {
    //* Propiedades
    cartProducts,
    //* Métodos
    setAddCart,
    onChangeQuantityItem,
    onDeleteItem,
  }
}