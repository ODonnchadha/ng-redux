import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as fromAction from '../state/product.action'
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];
  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    private store: Store<fromProduct.IState>,
    private productService: ProductService) { 
    }

  ngOnInit(): void {
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      p => this.selectedProduct = p
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any) => this.errorMessage = err.error
    });

    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      p => this.displayCode = p
    );
  }

  ngOnDestroy(): void {
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