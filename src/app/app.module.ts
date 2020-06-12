import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
// angular material animation modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material angular component modules
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatRippleModule } from '@angular/material';
// material card component
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeTabComponent } from './home-tab/home-tab.component';
import { ProjectsTabComponent } from './projects-tab/projects-tab.component';
import { MenuToggleComponent } from './menu-toggle/menu-toggle.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
const appRoutes: Routes = [
  { path: 'projects', component: ProjectsTabComponent },
  { path: 'home', component: HomeTabComponent },
  { path: '', component: ProjectsTabComponent },
  { path: '**', component: HomeTabComponent },
];
declare var $: any;

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { TimelineComponent } from './shared/timeline/timeline.component';
import { TimelineItemComponent } from './shared/timeline/timeline-item/timeline-item.component';
import { MomentModule } from 'ngx-moment';
import { MatChipsModule } from '@angular/material/chips';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';

const config = {
  apiKey: 'AIzaSyBfZzkJ4e7ckAguqHsW-jw5G8dL_xZjchs',
  authDomain: 'kindeep-me.firebaseapp.com',
  databaseURL: 'https://kindeep-me.firebaseio.com',
  projectId: 'kindeep-me',
  storageBucket: 'kindeep-me.appspot.com',
  messagingSenderId: '75554156675',
  appId: '1:75554156675:web:39ec6afedae6e58bd62bb6',
  measurementId: 'G-3L0Z29VLS6',
};
@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    HomeTabComponent,
    ProjectsTabComponent,
    MenuToggleComponent,
    MainContainerComponent,
    PageNotFoundComponent,
    TimelineComponent,
    TimelineItemComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    // Initialize firebase
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    YouTubePlayerModule,
    MomentModule,
    MatChipsModule,
    AnimateOnScrollModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
