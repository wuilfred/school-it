import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColegioComponent } from './create-colegio.component';

describe('CreateColegioComponent', () => {
  let component: CreateColegioComponent;
  let fixture: ComponentFixture<CreateColegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateColegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
