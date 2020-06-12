import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

declare const TicTacToe: any;
declare const startGame: any;

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.scss'],
})
export class HomeTabComponent implements OnInit, AfterViewInit {
  // @ViewChildren('tictactoep', { read: ElementRef}) ticParent: ElementRef;
  @ViewChild('tictactoec') ticChild: ElementRef;
  @ViewChild('flappycanvas') flappyChild: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    console.log('ticParent');
    console.log(this.ticChild);
    new TicTacToe(this.ticChild.nativeElement);
    startGame(this.flappyChild.nativeElement);
  }

  ngOnInit() {}
}
