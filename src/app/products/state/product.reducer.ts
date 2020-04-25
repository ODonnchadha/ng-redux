import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { ProductAction, ProductActionType } from './product.action';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';

export interface IState extends fromRoot.IState {
    products: IProductState
}

export interface IProductState {
    showProductCode: boolean,
    currentProduct: Product,
    products: Product[],
    error: string
}

const getProductFeatureState = createFeatureSelector<IProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState, 
    state => state.showProductCode
)

export const getCurrentProduct = createSelector(
    getProductFeatureState, 
    state => state.currentProduct
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
                ...state, currentProduct: { ...action.payload }
            };
            case ProductActionType.ClearCurrentProduct:
                return {
                    ...state, currentProduct: null
                };
            case ProductActionType.InitializeCurrentProduct:
                return {
                    ...state, 
                    currentProduct: {
                        id: 0,
                        productName: '',
                        productCode: 'New',
                        description: '',
                        starRating: 0
                    }
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
    currentProduct: null,
    products: [],
    error: ''
}