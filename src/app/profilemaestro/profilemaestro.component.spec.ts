import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilemaestroComponent } from './profilemaestro.component';

describe('ProfilemaestroComponent', () => {
  let component: ProfilemaestroComponent;
  let fixture: ComponentFixture<ProfilemaestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilemaestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilemaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
