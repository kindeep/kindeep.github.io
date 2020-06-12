import { Component, OnInit, TemplateRef, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss', './../timeline-shared.scss'],
})
export class TimelineItemComponent implements OnInit, AfterViewInit {
  @ViewChild('internalItemTemplate') template: TemplateRef<any>;
  @ViewChild('containerRef') container: ElementRef<any>;
  @Input() date: Date = new Date();

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {}
}
