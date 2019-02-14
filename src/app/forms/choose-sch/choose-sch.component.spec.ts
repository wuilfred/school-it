import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSchComponent } from './choose-sch.component';

describe('ChooseSchComponent', () => {
  let component: ChooseSchComponent;
  let fixture: ComponentFixture<ChooseSchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
