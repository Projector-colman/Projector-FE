import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsWrapperComponent } from './components/projects-wrapper/projects-wrapper.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { MyProjectsComponent } from './views/my-projects/my-projects.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'user-settings/:id', component: UserSettingsComponent },
  { path: 'projects', component : ProjectsWrapperComponent, children: [
    { path: '', component: MyProjectsComponent }]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
