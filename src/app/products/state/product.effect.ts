import { Injectable } from '@angular/core';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productAction from './product.action';
import { Product } from '../product';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffect {
    constructor(
        private actions$: Actions,
        private service: ProductService) {
    }

    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(productAction.ProductActionType.Load),
        mergeMap((action: productAction.Load) => this.service.getProducts().pipe(
            map((products: Product[]) => (new productAction.LoadSuccess(products))),
            catchError(err => of(new productAction.LoadFail(err)))
        ))
    )

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productAction.ProductActionType.UpdateProduct),
        map((action: productAction.UpdateProduct) => action.payload),
        mergeMap((p: Product) => this.service.updateProduct(p).pipe(
            map(updatedProduct => (new productAction.UpdateProductSuccess(updatedProduct))),
            catchError(err => of(new productAction.UpdateProductFail(err)))
        ))
    )
}