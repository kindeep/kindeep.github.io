import { TimelineItemComponent } from './../shared/timeline/timeline-item/timeline-item.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectSnapshot } from '../firebase/project-snapshot';

@Component({
  selector: 'app-projects-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.scss'],
})
export class ProjectsTabComponent implements OnInit, AfterViewInit {
  projects$: Observable<ProjectSnapshot[]>;
  @ViewChildren('timelineItem') timelineItems: TimelineItemComponent[];
  constructor(db: AngularFirestore) {
    this.projects$ = db.collection('projects').valueChanges() as Observable<ProjectSnapshot[]>;
  }

  ngOnInit() {}

  ngAfterViewInit() {}
}
