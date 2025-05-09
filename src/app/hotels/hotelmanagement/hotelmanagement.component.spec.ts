import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelmanagementComponent } from './hotelmanagement.component';

describe('HotelmanagementComponent', () => {
  let component: HotelmanagementComponent;
  let fixture: ComponentFixture<HotelmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
