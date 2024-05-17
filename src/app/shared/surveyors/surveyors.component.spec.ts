import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyorsComponent } from './surveyors.component';

describe('SurveyorsComponent', () => {
  let component: SurveyorsComponent;
  let fixture: ComponentFixture<SurveyorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
