import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanFingersComponent } from './scan-fingers.component';

describe('ScanFingersComponent', () => {
  let component: ScanFingersComponent;
  let fixture: ComponentFixture<ScanFingersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanFingersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanFingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
