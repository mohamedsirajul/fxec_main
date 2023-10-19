import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatTwoComponent } from './cat-two.component';

describe('CatTwoComponent', () => {
  let component: CatTwoComponent;
  let fixture: ComponentFixture<CatTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
