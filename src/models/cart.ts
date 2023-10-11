import { CategoryModel, ProductModel, UnitMeasurementModel, WarehouseModel } from ".";

/* CART MODEL */
export interface CartModel {
  id: string;
  categoryId: CategoryModel;
  unitMeasurementId: UnitMeasurementModel;
  name: string;
  image: string | null;
  barCode: string | null;
  visible: boolean;
  type: string;
  state: boolean;
  code: string;
  productStatus: {
    id: string;
    name: string;
    state: boolean;
    productId: ProductModel;
    price: number;
    discount: number;
    typeDiscount: string;
    quantity: number
  };
  warehouseId: WarehouseModel;
}