import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';

export interface IState extends fromRoot.IState {
    products: IProductState
}

export interface IProductState {
    showProductCode: boolean,
    currentProduct: Product,
    products: Product[]
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

export default function reducer(state = initialState, action): IProductState {
    switch (action.type) {
        case 'TOGGLE_PRODUCT_CODE':
            return {
                ...state, showProductCode: action.payload
            }
        default:
            return state;
    }
}

const initialState: IProductState = {
    showProductCode: false,
    currentProduct: null,
    products: []
}