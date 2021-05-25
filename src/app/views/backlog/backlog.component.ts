import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { IssuesService } from 'src/app/services/issues.service';
import { Issue } from 'src/app/interfaces/issue';
import { ProjectsService } from 'src/app/services/projects.service';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { IssueCreationStateService } from '../../services/issue-creation-state.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  projectId: string;
  issueToOpen: Issue;
  tasksHolder;

  activeIssues;
  plannedIssues;
  backlogIssues;

  isSubscribedToSprintUpdate = false;;

  constructor(
    public router: Router,
    private sidenavUpdateService: SidenavUpdateService,
    private projectsService: ProjectsService,
    private issuesService: IssuesService,
    private sprintCreation: IssueCreationStateService
  ) {}

  ngOnInit(): void {
    // Sidenav stuff
    this.projectId = this.router.url.split('/')[2];
    this.sidenavUpdateService.changeMessage('backlog');
    this.sidenavUpdateService.changeProject(this.projectId);

    this.updateSprint();

    // Every time a new sprint is Created, refresh issues
    // dont do it on subscription, only on .next()
    this.sprintCreation.sprintSubject.subscribe(() => {
      if(!this.isSubscribedToSprintUpdate) {
        console.log('subscribed');
        this.isSubscribedToSprintUpdate = true;
      } else {
        this.updateSprint();
      }
    });
  }

  updateSprint() {
    this.tasksHolder = {CurrSprint: [], PlannedSprint: [], Backlog: []};
    this.projectsService.getProjectIssues(+this.projectId, 'active').subscribe((data: Issue[]) => {
      this.tasksHolder['CurrSprint'].push(...data);
    });

    this.projectsService.getProjectIssues(+this.projectId, 'planned').subscribe((data: Issue[]) => {
      this.tasksHolder['PlannedSprint'].push(...data);
    });

    this.projectsService.getProjectIssues(+this.projectId, 'backlog').subscribe((data: Issue[]) => {
      this.tasksHolder['Backlog'].push(...data);
    });
  }

  drop(event: CdkDragDrop<Issue[]>) {
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
    }
    let newStatus;
    const containerID = event.container.id;
    let updatedIssue: any = Object.assign({}, event.container.data[event.currentIndex]);

    switch (containerID) {
      case "CurrSprint" : {
        newStatus = 'active';
        break;
      }
      case "PlannedSprint" : {
        newStatus = 'planned';
        break;
      }
      case "Backlog" : {
        newStatus = 'backlog';
        break;
      }
      default: {
        console.error('Unfamiliar sprint');
        break;
      }
    }

    this.issuesService.updateIssueSprint(updatedIssue.id, newStatus).subscribe(res => {
    }, err => {
      console.error(err)
      transferArrayItem(
        event.container.data,
        event.previousContainer.data,
        event.currentIndex,
        event.previousIndex
      );
      
    })
  }
  
  openIssue(issue: Issue): void {
    this.issueToOpen = issue;
  }
}
