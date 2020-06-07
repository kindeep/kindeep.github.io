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
    const tiles = this.items.toArray().sort((a, b) => b.date.getTime() - a.date.getTime());
    const occurDict = {};
    const result = tiles.map((item) => {
      const monthId = item.date.getFullYear();
      if (!occurDict[monthId]) {
        occurDict[monthId] = true;
        return { monthDivider: true, item };
      } else {
        return { item };
      }
    });
    console.log({ result });
    return result;
  }
}
