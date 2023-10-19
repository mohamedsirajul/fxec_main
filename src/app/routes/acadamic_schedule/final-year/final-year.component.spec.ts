import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalYearComponent } from './final-year.component';

describe('FinalYearComponent', () => {
  let component: FinalYearComponent;
  let fixture: ComponentFixture<FinalYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
