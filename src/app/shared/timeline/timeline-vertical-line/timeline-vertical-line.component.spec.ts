import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineVerticalLineComponent } from './timeline-vertical-line.component';

describe('TimelineVerticalLineComponent', () => {
  let component: TimelineVerticalLineComponent;
  let fixture: ComponentFixture<TimelineVerticalLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineVerticalLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineVerticalLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
