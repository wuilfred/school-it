import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradosVerComponent } from './grados-ver.component';

describe('GradosVerComponent', () => {
  let component: GradosVerComponent;
  let fixture: ComponentFixture<GradosVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradosVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradosVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
