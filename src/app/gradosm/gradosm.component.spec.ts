import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradosmComponent } from './gradosm.component';

describe('GradosmComponent', () => {
  let component: GradosmComponent;
  let fixture: ComponentFixture<GradosmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradosmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradosmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
