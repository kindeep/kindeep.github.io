import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTextComponent } from './timeline-text.component';

describe('TimelineTextComponent', () => {
  let component: TimelineTextComponent;
  let fixture: ComponentFixture<TimelineTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
