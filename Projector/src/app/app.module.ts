import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { MyProjectsComponent } from './views/main-page/my-projects/my-projects.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'projects', component: MyProjectsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainPageComponent,
    MyProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes,
      {enableTracing: true} // for debugging
      ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
