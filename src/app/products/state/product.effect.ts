import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productAction from './product.action';
import { mergeMap, map } from 'rxjs/operators';
import { Product } from '../product';

@Injectable()
export class ProductEffect {
    constructor(
        private actions$: Actions,
        private service: ProductService) {
    }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productAction.ProductActionType.Load),
        mergeMap((action: productAction.Load) => this.service.getProducts().pipe(
            map((products: Product[]) => (new productAction.LoadSuccess(products)))
        ))
    )
}