import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesDialogComponent } from './medicines-dialog.component';

describe('MedicinesDialogComponent', () => {
  let component: MedicinesDialogComponent;
  let fixture: ComponentFixture<MedicinesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicinesDialogComponent]
    });
    fixture = TestBed.createComponent(MedicinesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
