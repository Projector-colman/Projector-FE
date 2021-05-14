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
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { MyProjectsComponent } from './views/my-projects/my-projects.component';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';
import { ProjectsWrapperComponent } from './components/projects-wrapper/projects-wrapper.component';
import { routes } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BacklogComponent } from './views/backlog/backlog.component';
import { CreateIssueComponent } from './components/modals/create-issue/create-issue.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectBoardComponent } from './views/project-board/project-board.component';
import { IssuesBacklogComponent } from './components/issues-backlog/issues-backlog.component';
import { IssuePreviewComponent } from './components/issue-preview/issue-preview.component';
import { ButtonComponent } from './components/button/button.component';
import { SprintGraphComponent } from './components/charts/sprint-graphs/sprint-graph/sprint-graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AssignedToMeComponent } from './components/assigned-to-me/assigned-to-me.component';
import { MainIssueComponent } from './components/main-issue/main-issue.component';
import { CreateProjectComponent } from './components/modals/create-project/create-project.component';
import { ProjectsCardComponent } from './components/projects-card/projects-card.component';
import { IssueComponent } from './components/issue/issue.component';
import { CommentComponent } from './components/comment/comment.component';
import { filterByIssueId } from './pipes/filter-by-project-id.pipe';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthInterceptor } from '../app/interceptors/auth.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportsComponent } from './views/reports/reports.component';
import { LeadViewComponent } from './views/lead-view/lead-view.component';
import { IssuesByStatusChartComponent } from './components/charts/issues-by-status-chart/issues-by-status-chart.component';
import { MatTableModule } from '@angular/material/table';
import { SprintGraphContainerComponent } from './components/charts/sprint-graphs/sprint-graph-container/sprint-graph-container.component';
import { ProjectSettingsComponent } from './views/project-settings/project-settings.component';
import { AddUserComponent } from './components/modals/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MyProjectsComponent,
    UserSettingsComponent,
    ProjectsWrapperComponent,
    NavigationComponent,
    BacklogComponent,
    CreateIssueComponent,
    ProjectBoardComponent,
    IssuesBacklogComponent,
    IssuePreviewComponent,
    ButtonComponent,
    SprintGraphComponent,
    AssignedToMeComponent,
    MainIssueComponent,
    CreateProjectComponent,
    ProjectsCardComponent,
    IssueComponent,
    CommentComponent,
    filterByIssueId,
    LoginComponent,
    RegisterComponent,
    ReportsComponent,
    LeadViewComponent,
    IssuesByStatusChartComponent,
    SprintGraphContainerComponent,
    ProjectSettingsComponent,
    AddUserComponent,
  ],
  imports: [
    MatCardModule,
    BrowserAnimationsModule,
    MatDividerModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSelectModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    NgApexchartsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule,
    RouterModule.forRoot(routes, {
      enableTracing: true, // for debugging
      onSameUrlNavigation: 'reload',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
