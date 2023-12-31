import { ProductStatusModel, WarehouseModel } from ".";

/* KARDEX PRODUCT MODEL */
export interface KardexProductModel {
  id: string;
  warehouseId: WarehouseModel;
  inputOrOutput: {
    price: number,
    quantity: number,
    createdAt: Date,
    productStatusId: ProductStatusModel;
  };
  detail: string;
  modelRef: string;
  stock: number;
}

/* FORM INPUT PRODUCT MODEL */
export interface FormInputProductModel {
  warehouseId: WarehouseModel | null;
  productStatusId: ProductStatusModel | null;
  detail: string;
  quantity: number;
  price: number;
}

/*FORM INPUT PRODUCT VALIDATIONS */
export interface FormInputProductValidations {
  warehouseId: [(value: WarehouseModel) => boolean, string];
  productStatusId: [(value: ProductStatusModel) => boolean, string];
  detail: [(value: string) => boolean, string];
  quantity: [(value: number) => boolean, string];
  price: [(value: number) => boolean, string];
}