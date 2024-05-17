import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentVendorsComponent } from './recent-vendors.component';

describe('RecentVendorsComponent', () => {
  let component: RecentVendorsComponent;
  let fixture: ComponentFixture<RecentVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentVendorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
