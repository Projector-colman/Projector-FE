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
import { RouterModule, Routes } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { MyProjectsComponent } from './views/my-projects/my-projects.component';
import { UserSettingsComponent } from './components/user-setting-component/user-settings/user-settings.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'projects', component: MyProjectsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainPageComponent,
    MyProjectsComponent,
    UserSettingsComponent,
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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // for debugging
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
