import { Component, OnInit, ViewChildren, QueryList, ContentChildren } from '@angular/core';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @ContentChildren(TimelineItemComponent) items: QueryList<TimelineItemComponent>;

  constructor() {}

  ngOnInit() {}

  getTiles() {
    return this.items.toArray().sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}
