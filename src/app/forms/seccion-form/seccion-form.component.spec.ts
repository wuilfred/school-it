import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFormComponent } from './seccion-form.component';

describe('SeccionFormComponent', () => {
  let component: SeccionFormComponent;
  let fixture: ComponentFixture<SeccionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
