import { Component, OnInit } from '@angular/core';
import { Store, select, } from '@ngrx/store';
import * as fromProduct from '../../state/product.reducer';
import * as fromAction from '../../state/product.action'
import { Product } from '../../product';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  error$: Observable<string>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.IState>) { 
  }

  ngOnInit(): void {
    this.store.dispatch(new fromAction.Load());

    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
    this.error$ = this.store.pipe(select(fromProduct.getError));
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new fromAction.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new fromAction.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new fromAction.SetCurrentProduct(product));
  }
}
