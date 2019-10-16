import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-projects-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.scss']
})
export class ProjectsTabComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    //  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    // Tweets
    let ngJs: any;
    const ngFjs = document.getElementsByTagName('script')[0];
    const ngP = 'https';
    // if (document.getElementById('twitter-wjs')) {
      // document.removeChild(document.getElementById('twitter-wjs'));
    // }
    ngJs = document.createElement('script');
    ngJs.id = 'twitter-wjs';
    ngJs.src = ngP + '://platform.twitter.com/widgets.js';
    ngFjs.parentNode.insertBefore(ngJs, ngFjs);
  }

}
