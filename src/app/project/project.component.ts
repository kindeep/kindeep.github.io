import { DomSanitizer } from '@angular/platform-browser';
import { ProjectSnapshot } from './../firebase/project-snapshot';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, AfterViewInit {
  @Input() project: ProjectSnapshot;
  matCard: ElementRef;
  constructor(protected sanitizer: DomSanitizer) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.project.cardImage && this.project.cardImage.type === 'youtube') {
      const already = document.getElementById('youtube-embed-api');
      if (already != null) {
        already.remove();
      }
      const tag = document.createElement('script');
      tag.id = 'youtube-embed-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

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

  getYtURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.project.cardImage.youtubeVideoId}`
    );
  }
}
