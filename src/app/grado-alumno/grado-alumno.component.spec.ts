import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradoAlumnoComponent } from './grado-alumno.component';

describe('GradoAlumnoComponent', () => {
  let component: GradoAlumnoComponent;
  let fixture: ComponentFixture<GradoAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradoAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
