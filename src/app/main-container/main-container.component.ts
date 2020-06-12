import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
// declare const myTest: any;

export enum WindowWidth {
  SMALL,
  WIDE,
}

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
})
export class MainContainerComponent implements OnInit {
  widthType: WindowWidth;
  ngOnInit() {}
}
