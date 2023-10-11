/* TYPE USER MODEL */
export interface TypeUserModel {
    id: string;
    name: string;
    state: boolean;
}

/* FORM TYPE USER MODEL */
export interface FormTypeUserModel {
    name: string;
}

/*FORM TYPE USER MODEL VALIDATIONS */
export interface FormTypeUserValidations {
    name: [(value: string) => boolean, string];
}