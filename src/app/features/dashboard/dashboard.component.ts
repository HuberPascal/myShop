import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';

import { ProductCarouselComponent } from '../products/product-carousel/product-carousel.component';
import { map, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Product } from '../store/product.model';
import { Store } from '@ngrx/store';
import { selectProducts } from '../store/product.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ProductCarouselComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  products$: Observable<Product[]>;
  myCustomDestroyHandler = new Subject();

  //memoryleaks management
  // v1 keep array of subsibers
  myObservables: Subscription[] = [];
  //v2 use subject
  // destructionSubject = new Subject();

  // foo = {
  //   name: {},
  //   toString: () => 'avc',
  // };
  constructor(private store: Store<{ products: Product[] }>) {
    this.products$ = this.store.select(selectProducts);
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
