import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColegiosListaComponent } from './colegios-lista.component';

describe('ColegiosListaComponent', () => {
  let component: ColegiosListaComponent;
  let fixture: ComponentFixture<ColegiosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColegiosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColegiosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
