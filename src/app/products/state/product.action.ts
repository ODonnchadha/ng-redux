import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionType {
    ToggleProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product',
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

export type ProductAction = 
    ToggleProductCode | SetCurrentProduct | ClearCurrentProduct | InitializeCurrentProduct;