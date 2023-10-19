import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefinalYearComponent } from './prefinal-year.component';

describe('PrefinalYearComponent', () => {
  let component: PrefinalYearComponent;
  let fixture: ComponentFixture<PrefinalYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefinalYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefinalYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
