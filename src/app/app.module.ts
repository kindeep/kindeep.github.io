import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
// angular material animation modules 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material angular component modules 
import { MatButtonModule, MatCheckboxModule, MatToolbarModule } from '@angular/material';
// material card component 
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
