import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAvisoComponent } from './nuevo-aviso.component';

describe('NuevoAvisoComponent', () => {
  let component: NuevoAvisoComponent;
  let fixture: ComponentFixture<NuevoAvisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoAvisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
