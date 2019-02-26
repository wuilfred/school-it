import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableSectionComponent } from './disable-section.component';

describe('DisableSectionComponent', () => {
  let component: DisableSectionComponent;
  let fixture: ComponentFixture<DisableSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
