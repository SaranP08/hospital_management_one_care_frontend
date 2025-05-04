import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAddressDialogComponent } from './delete-address-dialog.component';

describe('DeleteAddressDialogComponent', () => {
  let component: DeleteAddressDialogComponent;
  let fixture: ComponentFixture<DeleteAddressDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAddressDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
