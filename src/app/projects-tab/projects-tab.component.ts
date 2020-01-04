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


  }

}
