import { TypeDocumentModel } from ".";

/* CUSTOMER MODEL */
export interface CustomerModel {
    id: string;
    name: string;
    email: string;
    phone: string
    state: boolean;
    typeDocumentId: TypeDocumentModel;
    numberDocument: number;
}

/* FORM CUSTOMER MODEL */
export interface FormCustomerModel {
    name: string;
    email: string;
    phone: number;
    typeDocumentId: TypeDocumentModel | null;
    numberDocument: number;
}

/*FORM CUSTOMER VALIDATIONS */
export interface FormCustomerValidations {
    name: [(value: string) => boolean, string];
    email: [(value: string) => boolean, string];
    phone: [(value: number) => boolean, string];
    typeDocumentId: [(value: TypeDocumentModel) => boolean, string];
    numberDocument: [(value: number) => boolean, string];
}