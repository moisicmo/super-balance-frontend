import { CategoryModel, ProductStatusModel, UnitMeasurementModel } from ".";

/* PRODUCT MODEL */
export interface ProductModel {
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
    productStatus: ProductStatusModel[];
}
/* FORM PRODUCT MODEL */
export interface FormProductModel {
    name: string;
    price: number;
    discount: number;
    typeDiscount: string;
    categoryId: CategoryModel | null;
    unitMeasurementId: UnitMeasurementModel | null;
}

/*FORM PRODUCT VALIDATIONS */
export interface FormProductValidations {
    name: [(value: string) => boolean, string];
    price: [(value: number) => boolean, string];
    categoryId: [(value: CategoryModel) => boolean, string];
    unitMeasurementId: [(value: UnitMeasurementModel) => boolean, string];
}