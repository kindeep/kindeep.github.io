import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss', './../timeline-shared.scss'],
})
export class TimelineItemComponent implements OnInit {
  @ViewChild('internalItemTemplate') template: TemplateRef<any>;
  @Input() date: Date = new Date();
  constructor() {}

  ngOnInit() {}
}
