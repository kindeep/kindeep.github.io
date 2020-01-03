import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectSnapshot } from '../firebase/project-snapshot';

@Component({
  selector: 'app-projects-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.scss']
})
export class ProjectsTabComponent implements OnInit, AfterViewInit {
  projects: Observable<ProjectSnapshot[]>;
  constructor(db: AngularFirestore) {
    this.projects = db.collection('projects').valueChanges() as Observable<ProjectSnapshot[]>;
    console.log('Log pojects');
    this.projects.forEach((proj) => {
      console.log('Project');
      console.log(proj);
    });
  }

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
