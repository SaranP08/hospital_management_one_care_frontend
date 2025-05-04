import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorloginComponent } from './doctorlogin.component';

describe('DoctorloginComponent', () => {
  let component: DoctorloginComponent;
  let fixture: ComponentFixture<DoctorloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorloginComponent]
    });
    fixture = TestBed.createComponent(DoctorloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
