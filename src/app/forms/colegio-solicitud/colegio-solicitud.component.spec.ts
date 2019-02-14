import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColegioSolicitudComponent } from './colegio-solicitud.component';

describe('ColegioSolicitudComponent', () => {
  let component: ColegioSolicitudComponent;
  let fixture: ComponentFixture<ColegioSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColegioSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColegioSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
