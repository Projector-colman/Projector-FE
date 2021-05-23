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

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {
  project: Project = {};
  filters = ['My Issues', 'In Progress'];

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

  updateIssues() {
    this.tasksHolder = {Todo: [], "In Progress": [], Verify: [] ,Done: []};
    this.taskTitles = Object.keys(this.tasksHolder);
    
    this.issuesService.getProjectIssues(this.project.id).subscribe((issues: Issue[]) => {
      issues = issues.filter(issue => issue.sprintStatus == 'active');
      issues.forEach(issue => {
        switch (issue.status) {
          case "to-do" : {
            this.tasksHolder.Todo.push(issue);
            break;
          }
          case "in-progress" : {
            this.tasksHolder["In Progress"].push(issue);
            break;
          }
          case "verify" : {
            this.tasksHolder.Verify.push(issue);
            break;
          }
          case "done" : {
            this.tasksHolder.Done.push(issue);
            break;
          }
          default: {
            console.error('Unfamiliar issue status');
            break;
          }
        }
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

      switch (containerID) {
        case "Todo" : {
          updatedIssue.status = "to-do"
          this.issuesService.updateIssue
          break;
        }
        case "In Progress" : {
          updatedIssue.status = "in-progress";
          break;
        }
        case "Verify" : {
          updatedIssue.status = "verify";
          break;
        }
        case "Done" : {
          updatedIssue.status = "done";
          break;
        }
        default: {
          console.error('Unfamiliar issue status');
          break;
        }
      }

      this.issuesService.updateIssue(updatedIssue).subscribe(res => {
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
        console.error('error occured when updating issue');
      });
    }
  }
}
