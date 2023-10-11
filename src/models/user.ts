import { RoleModel, TypeUserModel, WarehouseModel } from ".";

/* USER MODEL */
export interface UserModel {
    id: string;
    name: string;
    lastName: string;
    email: string;
    roleId: RoleModel;
    typeUserId: TypeUserModel;
    warehouses: WarehouseModel[];
    state: boolean;
}

/* FORM USER MODEL */
export interface FormUserModel {
    name: string;
    lastName: string;
    email: string;
    roleId: RoleModel | null;
    typeUserId: TypeUserModel | null;
    warehouses: WarehouseModel[];
}

/*FORM USER VALIDATIONS */
export interface FormUserValidations {
    name: [(value: string) => boolean, string];
    lastName: [(value: string) => boolean, string];
    email: [(value: string) => boolean, string];
    roleId: [(value: RoleModel) => boolean, string];
    typeUserId: [(value: TypeUserModel) => boolean, string];
    warehouses: [(value: WarehouseModel[]) => boolean, string];
}