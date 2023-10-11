/* WAREHOUSE MODEL */
export interface WarehouseModel {
    id: string;
    name: string;
    address: string;
    phone: number;
    state: boolean;
}

/* FORM WAREHOUSE MODEL */
export interface FormWarehouseModel {
    name: string;
    address: string;
    phone: number
}

/*FORM WAREHOUSE VALIDATIONS */
export interface FormWarehouseValidations {
    name: [(value: string) => boolean, string];
    address: [(value: string) => boolean, string];
    phone: [(value: number) => boolean, string];
}