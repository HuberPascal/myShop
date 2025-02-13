import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../store/product.actions'
import { Product } from '../../api/api-client';

// interface FormProfile {
//   category: FormControl<Product>;
//   brand: FormControl<Product>;
//   productName: FormControl<Product>;
//   productPrice: FormControl<Product>;
//   basePrice: FormControl<Product>;
//   productSpecification: FormControl<Product>;
//   numberOfRating: FormControl<Product>;
//   imgSrc: FormControl<Product>;
//   rating: FormControl<Product>;
// }

@Component({
  selector: 'app-admin-add-product',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.scss'
})
export class AdminAddProductComponent {

  store = inject(Store);


  form = new FormGroup({
    category: new FormControl('', Validators.required),
    brand: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    productPrice: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    basePrice: new FormControl<string>(''),
    productSpecification: new FormControl<string>(''),
    numberOfRating: new FormControl<number>(0, [Validators.min(0), Validators.max(10000)]),
    imgSrc: new FormControl<string>(''),
    rating: new FormControl<number>(0, [Validators.min(0), Validators.max(5)])
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log("Formular ist ungültig!", this.form.errors);
      return;
    }

    console.log("Formularwerte:", this.form.value);
    const product = this.form.getRawValue() as Product;

    this.store.dispatch(ProductsActions.addProduct({ product }));
  }
}
