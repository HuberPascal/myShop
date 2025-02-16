import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import {
  selectProductIsLoading,
  selectProducts,
} from '../store/product.selectors';
import { IProduct, Product } from '../../api/api-client';
import { MatButtonModule } from '@angular/material/button';
import { ProductsActions } from '../store/product.actions';

export type FormGroupMap<T> = {
  [key in keyof T]: FormControl<T[key]>;
};

@Component({
  selector: 'app-admin-edit-product',
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './admin-edit-product.component.html',
  styleUrl: './admin-edit-product.component.scss',
})
export class AdminEditProductComponent {
  loading$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProductLabel$: Observable<string>;

  store = inject(Store<{ products: Product[] }>);

  form = new FormGroup<FormGroupMap<IProduct | any>>({
    selectedProductId: new FormControl<number>(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    category: new FormControl('', Validators.required),
    brand: new FormControl<string>(''),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    productPrice: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    basePrice: new FormControl<string>(''),
    productSpecification: new FormControl<string>(''),
    numberOfRating: new FormControl<number>(0, {
      validators: [Validators.min(0), Validators.max(10000)],
      nonNullable: true,
    }),
    imgSrc: new FormControl<string>(''),
    rating: new FormControl<number>(0, {
      validators: [Validators.min(0), Validators.max(5)],
      nonNullable: true,
    }),
  });

  constructor() {
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductIsLoading);

    this.selectedProductLabel$ = this.products$.pipe(
      map((products) =>
        products.length > 0
          ? `${products[0].brand} ${products[0].name}`
          : 'Kein Produkt verfügbar'
      )
    );

    this.form
      .get('selectedProductId')!
      .valueChanges.pipe(
        switchMap((id) =>
          this.products$.pipe(
            map((products) => products.find((product) => product.id === id))
          )
        )
      )
      .subscribe((selectedProduct) => {
        if (selectedProduct) {
          console.log('Gefundenes Produkt:', selectedProduct);
          this.form.patchValue({
            category: selectedProduct.category,
            brand: selectedProduct.brand,
            name: selectedProduct.name,
            productPrice: selectedProduct.productPrice,
            basePrice: selectedProduct.basePrice,
            productSpecification: selectedProduct.productSpecification,
            numberOfRating: selectedProduct.numberOfRating,
            imgSrc: selectedProduct.imgSrc,
            rating: selectedProduct.rating,
          });
        } else {
          console.error('Produkt nicht gefunden');
        }
      });
  }

  onSubmit() {
    const id = this.form.value['selectedProductId'];
    const product = new Product({ ...this.form.getRawValue() });

    console.log('id', id);

    this.store.dispatch(
      ProductsActions.updateProduct({ id, product: product })
    );
  }
}
