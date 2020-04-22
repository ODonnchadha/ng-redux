import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionType {
    ToggleProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product',
    Load = '[Product] Load',
    LoadSuccess = '[Product] Load Success',
    LoadFail = '[Product] Load Fail'
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

export type ProductAction = 
    ToggleProductCode | SetCurrentProduct | ClearCurrentProduct | 
    InitializeCurrentProduct | Load | LoadSuccess | LoadFail;