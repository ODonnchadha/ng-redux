import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { ProductAction, ProductActionType } from './product.action';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';

export interface IState extends fromRoot.IState {
    products: IProductState
}

export interface IProductState {
    showProductCode: boolean,
    currentProductId: number | null,
    products: Product[],
    error: string
}

const getProductFeatureState = createFeatureSelector<IProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState, 
    state => state.showProductCode
)

export const getCurrentProductId = createSelector(
    getProductFeatureState, 
    state => state.currentProductId
)

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
)

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
)

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
)

export default function reducer(state = initialState, action: ProductAction): IProductState {
    switch (action.type) {
        case ProductActionType.ToggleProductCode:
            return {
                ...state, showProductCode: action.payload
            };
        case ProductActionType.SetCurrentProduct:
            return {
                ...state, currentProductId: action.payload.id
            };
            case ProductActionType.ClearCurrentProduct:
                return {
                    ...state, currentProductId: null
                };
            case ProductActionType.InitializeCurrentProduct:
                return {
                    ...state, currentProductId: 0
                };
            case ProductActionType.LoadSuccess:
                return {
                    ...state, products: action.payload, error: ''
                };
            case ProductActionType.LoadFail:
                return {
                    ... state, products: [], error: action.payload
                };
        default:
            return state;
    }
}

const initialState: IProductState = {
    showProductCode: false,
    currentProductId: null,
    products: [],
    error: ''
}