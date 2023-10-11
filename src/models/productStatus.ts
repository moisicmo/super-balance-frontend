import { ProductModel } from ".";

/* PRODUCT STATUS MODEL */
export interface ProductStatusModel {
    id: string;
    name: string;
    state: boolean;
    productId: ProductModel;
    price: number;
    discount: number;
    typeDiscount: string;
}