import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { IssuesService } from '../../services/issues.service';
import { Issue } from '../../interfaces/issue';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {

  filters = ['My Issues', 'In Progress'];
  taskTitles;

  tasksHolder;

  constructor(public router: Router, private sidenavUpdateService: SidenavUpdateService, private issuesService: IssuesService) { }

  ngOnInit(): void {
    // Hack for keeping sidenav state active to light up which item we're on if refreshed
    this.sidenavUpdateService.changeMessage('projects');
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);

    this.tasksHolder = {Todo: [], inProgress:[] ,Done: []};
    this.issuesService.getIssues({}).subscribe((issues: any[]) => {
      issues.forEach(issue => {
        if(issue.status === "to-do") {
          this.tasksHolder.Todo.push(issue.description);
        }
        if(issue.status === "in-progress") {
          this.tasksHolder.inProgress.push(issue.description);
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
