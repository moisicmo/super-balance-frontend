import { PermissionModel } from ".";

/* WAREHOUSE MODEL */
export interface RoleModel {
    id: string;
    name: string;
    permisionIds: PermissionModel[];
    state: boolean;
}

/* FORM CUSTOMER MODEL */
export interface FormRoleModel {
    name: string;
    permisionIds: PermissionModel[];
}

/*FORM CUSTOMER MODEL VALIDATIONS */
export interface FormRoleValidations {
    name: [(value: string) => boolean, string];
    permisionIds: [(value: PermissionModel[]) => boolean, string];
}