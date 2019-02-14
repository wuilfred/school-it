import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradosdetailComponent } from './gradosdetail.component';

describe('GradosdetailComponent', () => {
  let component: GradosdetailComponent;
  let fixture: ComponentFixture<GradosdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradosdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradosdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
