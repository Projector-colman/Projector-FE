import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { IssuesService } from '../../services/issues.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {
  project: Project = {};
  filters = ['My Issues', 'In Progress'];
  taskTitles;

  tasksHolder;

  constructor(public router: Router, 
              private sidenavUpdateService: SidenavUpdateService, 
              private issuesService: IssuesService,
              public projectsService: ProjectsService) { }

  ngOnInit(): void {
    // Hack for keeping sidenav state active to light up which item we're on if refreshed
    this.sidenavUpdateService.changeMessage('projects');
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);
    this.sidenavUpdateService.currentProject.subscribe(name => this.project.projectName = name);

    this.projectsService.getProject({name: this.project.projectName}).subscribe((proj: Project[]) => {
      this.project.key = proj[0].key;
    });
    
    this.tasksHolder = {Todo: [], inProgress: [], Verify: [] ,Done: []};
    this.issuesService.getIssues({}).subscribe((issues: any[]) => {
      issues.forEach(issue => {
        switch (issue.status) {
          case "to-do" : {
            this.tasksHolder.Todo.push(issue);
            break;
          }
          case "in-progress" : {
            this.tasksHolder.inProgress.push(issue);
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
    this.taskTitles = Object.keys(this.tasksHolder);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
