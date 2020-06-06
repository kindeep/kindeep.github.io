import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
})
export class TimelineItemComponent implements OnInit {
  @ViewChild('internalItemTemplate', { static: false }) template: TemplateRef<any>;
  @Input() date: Date = new Date();
  constructor() {}

  ngOnInit() {}
}
