import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroFormComponent } from './maestro-form.component';

describe('MaestroFormComponent', () => {
  let component: MaestroFormComponent;
  let fixture: ComponentFixture<MaestroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestroFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
