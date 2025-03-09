import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../store/actions/product.actions';
import { IProduct, Product } from '../../api/api-client';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export type FormGroupMap<T> = {
  [key in keyof T]: FormControl<T[key]>;
};

@Component({
  selector: 'app-admin-add-product',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.scss',
})
export class AdminAddProductComponent {
  store = inject(Store);
  http = inject(HttpClient);

  form = new FormGroup<FormGroupMap<IProduct>>({
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

  onSubmit() {
    if (this.form.invalid) {
      console.log('Formular ist ungültig!', this.form.errors);
      return;
    }

    console.log('Formularwerte:', this.form.value);
    const product = new Product({ ...this.form.getRawValue() });

    this.store.dispatch(ProductsActions.addProduct({ product }));
  }
}
