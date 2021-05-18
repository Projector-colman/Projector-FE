import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsWrapperComponent } from './components/projects-wrapper/projects-wrapper.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';
import { BacklogComponent } from './views/backlog/backlog.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { MyProjectsComponent } from './views/my-projects/my-projects.component';
import { ProjectBoardComponent } from './views/project-board/project-board.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LeadViewComponent } from './views/lead-view/lead-view.component';
import { ReportsComponent } from './views/reports/reports.component';
import { ProjectSettingsComponent } from './views/project-settings/project-settings.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',component: RegisterComponent},
  { path: '', canActivate: [AuthGuard], children: [
    { path: '', component: MainPageComponent },
    { path: 'user-settings/:id', component: UserSettingsComponent },
    { path: 'projects', component: MyProjectsComponent },
    {
      path: 'projects/:name',
      component: ProjectsWrapperComponent,
      children: [
        { path: '', component: ProjectBoardComponent },
        { path: 'backlog', component: BacklogComponent },
        { path: 'reports', component: ReportsComponent },
        { path: 'lead', component: LeadViewComponent },
        { path: 'settings', component: ProjectSettingsComponent },
      ],
    }
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
