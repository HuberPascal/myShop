import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableContainerComponent } from './available-container.component';

describe('AvailableContainerComponent', () => {
  let component: AvailableContainerComponent;
  let fixture: ComponentFixture<AvailableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
