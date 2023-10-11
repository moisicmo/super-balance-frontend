import { useCartStore } from '@/hooks';

interface cartProps {
  warehouseId: string;
}
const { cart = [] } = useCartStore();

export const CartView = (props: cartProps) => {
  const {
    warehouseId
  } = props
  return (
    <div>CartView</div>
  )
}
