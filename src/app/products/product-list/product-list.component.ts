import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select, } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as fromAction from '../state/product.action'
import { Product } from '../product';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  active: boolean = true;
  products$: Observable<Product[]>;

  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];
  selectedProduct: Product | null;

  constructor(private store: Store<fromProduct.IState>) { 
  }

  ngOnInit(): void {
    this.store.dispatch(new fromAction.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    // this.store.pipe(select(fromProduct.getProducts), takeWhile(()=> this.active))
    //   .subscribe((products: Product[]) => this.products = products);

    this.store.pipe(select(fromProduct.getCurrentProduct), takeWhile(()=> this.active))
      .subscribe(p => this.selectedProduct = p);

    this.store.pipe(select(fromProduct.getShowProductCode), takeWhile(()=> this.active))
      .subscribe(p => this.displayCode = p);
  }

  ngOnDestroy(): void {
    this.active = false;
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