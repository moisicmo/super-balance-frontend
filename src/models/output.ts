import { ProductStatusModel, WarehouseModel } from ".";

/* OUTPUT MODEL */
export interface OutputModel {
  id?: string;
  price: number;
  warehouseId: WarehouseModel,
  quantity: number;
  discount: number;
  typeDiscount: string;
  productStatusId: ProductStatusModel;
}
// export interface OutputModel {
//   id: string;
//   productStatusId: ProductStatusModel;
//   quantity: number;
//   price: number;
//   discount: number;
//   typeDiscount: string;
//   createdAt: Date;
// }