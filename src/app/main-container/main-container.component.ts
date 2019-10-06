import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
// declare const myTest: any;

export enum WindowWidth {
  SMALL,
  WIDE
}

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
  @ViewChild('sidenav',{static: false}) sidenav: MatSidenav;

  widthType: WindowWidth;
  get displaySidebarToggle() {
    return this.widthType === WindowWidth.SMALL;
  }

  constructor() { }

  public innerWidth: any;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.updateWindowWidthType();
  }

  updateWindowWidthType() {
    console.log(this.innerWidth);
    // myTest();
    if (this.innerWidth < 500) {
      this.widthType = WindowWidth.SMALL;
    } else {
      this.widthType = WindowWidth.WIDE;
      this.sidenav.toggle(false);
    }
    console.log(this.widthType);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.updateWindowWidthType();
  }

}
