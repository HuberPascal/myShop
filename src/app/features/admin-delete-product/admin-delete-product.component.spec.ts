import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteProductComponent } from './admin-delete-product.component';

describe('AdminDeleteProductComponent', () => {
  let component: AdminDeleteProductComponent;
  let fixture: ComponentFixture<AdminDeleteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDeleteProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
