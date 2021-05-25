import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { IssuesService } from '../../services/issues.service';
import { ProjectsService } from '../../services/projects.service';
import { IssueCreationStateService } from '../../services/issue-creation-state.service';
import { Issue } from 'src/app/interfaces/issue';
import { BoardFilter } from 'src/app/enum/boardFilter.enum';
import { IssueStatus, IssueStatusLabel } from 'src/app/enum/issueStatus.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {
  project: Project = {};
  filters = [BoardFilter.All, BoardFilter.MyIssues, BoardFilter.InProgress];

  originIssues: Issue[];
  taskTitles;
  tasksHolder;

  issueToOpen: Issue;
  isSubscribedToIssueUpdate = false;

  isLoading = false;

  constructor(
    public router: Router,
    private sidenavUpdateService: SidenavUpdateService,
    private issuesService: IssuesService,
    public projectsService: ProjectsService,
    private issueStatusService: IssueCreationStateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Hack for keeping sidenav state active to light up which item we're on if refreshed
    this.sidenavUpdateService.changeMessage('projects');
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);
    this.sidenavUpdateService.currentProject.subscribe(id => this.project.id = id);

    // Every time a new issue is added, refresh issues
    // dont do it on subscription, only on .next()
    this.issueStatusService.issueSubject.subscribe(() => {
      if(!this.isSubscribedToIssueUpdate) {
        console.log('subscribed');
        this.isSubscribedToIssueUpdate = true;
      } else {
        this.updateIssues();
      }
    });

    this.projectsService.getProject({id: this.project.id}).subscribe((proj: Project[]) => {
      this.project.key = proj[0].key;
      this.project.id = proj[0].id;
      this.updateIssues();
    });
  }

  handleFilterClick(filter) {
    switch(filter) {
      case BoardFilter.All : {
        this.taskTitles.forEach(status => {
          const currStatus = Object.keys(IssueStatusLabel)[Object.values(IssueStatusLabel).indexOf(status)];
          Object.assign(this.tasksHolder, {[status]: this.originIssues
            .filter(issue => issue.status === currStatus )});
        });
        break;
      }
      case BoardFilter.InProgress : {
        this.taskTitles.forEach(status => {
          const currStatus = Object.keys(IssueStatusLabel)[Object.values(IssueStatusLabel).indexOf(status)];
          Object.assign(this.tasksHolder, {[status]: this.originIssues
            .filter(issue => issue.status === currStatus )});
          if(status !== IssueStatusLabel[IssueStatus.InProgress]) {
            Object.assign(this.tasksHolder, {[status]: []});
          }
        });
        break;
      }
      case BoardFilter.MyIssues : {
        const currUser = this.authService.getUserID(); 
        this.taskTitles.forEach(title => {
          const currStatus = Object.keys(IssueStatusLabel)[Object.values(IssueStatusLabel).indexOf(title)];
          Object.assign(this.tasksHolder, {[title]: this.originIssues
            .filter(issue => issue.status === currStatus)
            .filter(issue => issue.asignee.toString() === currUser)});
        });
      }
    }
  }

  updateIssues() {
    this.taskTitles = Object.keys(IssueStatusLabel).map(key => IssueStatusLabel[key])
    .filter(value => value !== IssueStatusLabel.none);

    this.tasksHolder = {};
    this.taskTitles.forEach(status => {
      Object.assign(this.tasksHolder, {[status]: []});
    });

    this.issuesService.getProjectIssues(this.project.id).subscribe((issues: Issue[]) => {
      issues = issues.filter(issue => issue.sprintStatus == 'active');
      this.originIssues = issues;
      issues.forEach(issue => {
        this.tasksHolder[IssueStatusLabel[issue.status]].push(issue);
      });
    });
  }

  openIssue(event) {
    this.issueToOpen = event;
  }
  drop(event: CdkDragDrop<Issue[]>) {
    this.isLoading = true;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      const containerID = event.container.id;
      
      let updatedIssue: any = Object.assign({}, event.container.data[event.currentIndex]);
      const status = Object.keys(IssueStatusLabel)[Object.values(IssueStatusLabel).indexOf(containerID)];
      updatedIssue.status = status;
      this.originIssues.find(issue => issue.id === updatedIssue.id).status = status;

      this.issuesService.updateIssue(updatedIssue).subscribe(res => {
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        console.error('error occured when updating issue');
      });
    }
  }
}
