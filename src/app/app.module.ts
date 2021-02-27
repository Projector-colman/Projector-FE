import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { MyProjectsComponent } from './views/my-projects/my-projects.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ProjectsWrapperComponent } from './components/projects-wrapper/projects-wrapper.component';

import { routes } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BacklogComponent } from './views/backlog/backlog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MyProjectsComponent,
    UserSettingsComponent,
    ProjectsWrapperComponent,
    NavigationComponent,
    BacklogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatDividerModule,
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
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // for debugging
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
