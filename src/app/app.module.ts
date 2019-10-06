import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
// angular material animation modules 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material angular component modules 
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatRippleModule} from '@angular/material';
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
  { path: '', component: HomeTabComponent },
  { path: '**', component: PageNotFoundComponent }
];
declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    HomeTabComponent,
    ProjectsTabComponent,
    MenuToggleComponent,
    MainContainerComponent,
    PageNotFoundComponent
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
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
