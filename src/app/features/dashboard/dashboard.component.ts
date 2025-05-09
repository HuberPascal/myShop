import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { ProductCarouselComponent } from '../products/product-carousel/product-carousel.component';
import { map, Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import { Product } from '../store/product.model';
import { Store } from '@ngrx/store';
import { selectProducts } from '../store/product.selectors';
import { selectCartId } from '../store/cart.selectors';
import { AppState } from '../store/app.state';
import { loadProducts } from '../store/actions/product.actions';
import { loadCart } from '../store/actions/cart.actions';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ProductCarouselComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select(selectProducts);
  }

  // In DashboardComponent
  ngOnInit(): void {
    this.store
      .select((state) => state.product.products)
      .pipe(take(1))
      .subscribe((products) => {
        if (!products || products.length === 0) {
          this.store.dispatch(loadProducts());
        }
      });
    this.store
      .select((state) => state.cart.cartId)
      .pipe(take(1))
      .subscribe((cartId) => {
        if (!cartId) {
          this.store.dispatch(loadCart());
        }
      });
  }
}
// handle() {
//   let foo = new Subject<string>();
//   foo.next('a');
//   // foo.next('b');
//   // foo.next('c');
//   foo.complete();

//   foo.subscribe({
//     next: (x) => console.log(x),
//     error: console.log,
//     complete: () => console.log('DONE!!!'),
//   });

//   this.myObservables.push(this.counter().subscribe(console.log));

//   this.counter().subscribe(console.log);
//   // manage memory leaks:
//   // keep array of all subscriptions
//   this.myObservables.push(this.counter().subscribe(console.log));
//   // takeUntil with self manage Subject
//   this.counter()
//     .pipe(takeUntil(this.myCustomDestroyHandler))
//     .subscribe(console.log);
// }

// ngOnDestroy(): void {
//   //v1
//   this.myObservables.forEach((element) => {
//     element.unsubscribe();
//   });

//   //v2
//   this.destructionSubject.next('+*');

//   let foo$ = new Observable((subscriber) => {
//     subscriber.complete();
//     subscriber.next(1);
//   });

//   let foo = foo$.subscribe(console.log)
//   foo.unsubscribe();
//   foo.()
// }

//   currentValue: number = 123;

//   subscribe(doFunction: (next: number) => void) {
//     doFunction(this.currentValue);
//   }

//   next(nextValue: number) {
//     this.currentValue = nextValue;
//   }

//   produkt$ = new Observable({
//     name: 'fdg',
//     foo: fgd,
//   });

//   httpGet(url: string): Observable<Response> {
//     return new Observable((subscriber) => {
//       let result = fetch(url)
//         .then((response) => subscriber.next(response))
//         .catch((eroor) => subscriber.error(eroor))
//         .finally(() => subscriber.complete());
//     });
//   }

//   counter(): Observable<number> {
//     return new Observable((subscriber) => {
//       let i = 0;
//       while (true) {
//         subscriber.next(i);
//         i = i + 1;
//       }
//     });
//   }

//   justComplete(): Observable<number> {
//     return new Observable((subscriber) => {
//       subscriber.complete();
//     });
//   }

//   takeUntil(notifier): Observable<number> {
//     while (!notifier) {
//       keepgoind;
//     }
//     complete;
//   }
// }
