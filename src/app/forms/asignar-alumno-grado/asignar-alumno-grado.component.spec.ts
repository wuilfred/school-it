import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAlumnoGradoComponent } from './asignar-alumno-grado.component';

describe('AsignarAlumnoGradoComponent', () => {
  let component: AsignarAlumnoGradoComponent;
  let fixture: ComponentFixture<AsignarAlumnoGradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarAlumnoGradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAlumnoGradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
