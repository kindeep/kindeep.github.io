import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineDotComponent } from './timeline-dot.component';

describe('TimelineDotComponent', () => {
  let component: TimelineDotComponent;
  let fixture: ComponentFixture<TimelineDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
