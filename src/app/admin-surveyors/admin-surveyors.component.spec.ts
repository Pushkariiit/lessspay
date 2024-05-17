import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSurveyorsComponent } from './admin-surveyors.component';

describe('AdminSurveyorsComponent', () => {
  let component: AdminSurveyorsComponent;
  let fixture: ComponentFixture<AdminSurveyorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSurveyorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSurveyorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
