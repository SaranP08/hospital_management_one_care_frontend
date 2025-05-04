import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutdialogComponent } from './signoutdialog.component';

describe('SignoutdialogComponent', () => {
  let component: SignoutdialogComponent;
  let fixture: ComponentFixture<SignoutdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignoutdialogComponent]
    });
    fixture = TestBed.createComponent(SignoutdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
