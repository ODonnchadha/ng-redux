import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionType {
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product',
    Load = '[Product] Load',
    LoadSuccess = '[Product] Load Success',
    LoadFail = '[Product] Load Fail',
    SetCurrentProduct = '[Product] Set Current Product',
    ToggleProductCode = '[Product] Toggle Product Code',
    UpdateProduct = '[Product] UpdateProduct',
    UpdateProductSuccess = '[Product] Update Product Success',
    UpdateProductFail = '[Product] Update Product Fail'
}

export class ToggleProductCode implements Action {
    readonly type = ProductActionType.ToggleProductCode;
    constructor(public payload: boolean) {
    }
}
export class SetCurrentProduct implements Action {
    readonly type = ProductActionType.SetCurrentProduct;
    constructor(public payload: Product) {
    }
}
export class ClearCurrentProduct implements Action {
    readonly type = ProductActionType.ClearCurrentProduct;
}
export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionType.InitializeCurrentProduct;
}
export class Load implements Action {
    readonly type = ProductActionType.Load;
}
export class LoadSuccess implements Action {
    readonly type = ProductActionType.LoadSuccess;
    constructor(public payload: Product[]) {
    }
}
export class LoadFail implements Action {
    readonly type = ProductActionType.LoadFail;
    constructor(public payload: string) {
    }
}
export class UpdateProduct implements Action {
    readonly type = ProductActionType.UpdateProduct;
    constructor(public payload: Product) {
    }
}
export class UpdateProductSuccess implements Action {
    readonly type = ProductActionType.UpdateProductSuccess;
    constructor(public payload: Product) {
    }
}
export class UpdateProductFail implements Action {
    readonly type = ProductActionType.UpdateProductFail;
    constructor(public payload: string) {
    }
}
export type ProductAction = 
    ToggleProductCode | SetCurrentProduct | ClearCurrentProduct | 
    InitializeCurrentProduct | Load | LoadSuccess | LoadFail | 
    UpdateProduct | UpdateProductSuccess | UpdateProductFail;