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
/* FORM PRODUCT STATUS MODEL */
export interface FormProductStatusModel {
    name: string;
    price: number;
    discount: number;
    typeDiscount: string;
}

/*FORM PRODUCT STATUS VALIDATIONS */
export interface FormProductStatusValidations {
    name: [(value: string) => boolean, string];
    price: [(value: number) => boolean, string];
}