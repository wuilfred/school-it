import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilealumnoComponent } from './profilealumno.component';

describe('ProfilealumnoComponent', () => {
  let component: ProfilealumnoComponent;
  let fixture: ComponentFixture<ProfilealumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilealumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilealumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
