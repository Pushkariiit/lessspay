import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTvcComponent } from './admin-tvc.component';

describe('AdminTvcComponent', () => {
  let component: AdminTvcComponent;
  let fixture: ComponentFixture<AdminTvcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTvcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
