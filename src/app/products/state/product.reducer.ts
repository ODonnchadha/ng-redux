import { Product } from '../product';
import { ProductAction, ProductActionType } from './product.action';

export interface IProductState {
    showProductCode: boolean,
    currentProductId: number | null,
    products: Product[],
    error: string
}

const initialState: IProductState = {
    showProductCode: false,
    currentProductId: null,
    products: [],
    error: ''
}

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
            case ProductActionType.UpdateProductSuccess:
                const id = action.payload.id;
                const update = state.products.map(p => id === p.id ? action.payload : p);
                return {
                    ...state, products: update, currentProductId: id, error: ''
                }
            case ProductActionType.UpdateProductFail:
                return {
                    ... state, error: action.payload
                };
        default:
            return state;
    }
}