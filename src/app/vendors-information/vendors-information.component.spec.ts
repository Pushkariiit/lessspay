import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsInformationComponent } from './vendors-information.component';

describe('VendorsInformationComponent', () => {
  let component: VendorsInformationComponent;
  let fixture: ComponentFixture<VendorsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorsInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
