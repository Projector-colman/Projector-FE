import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { issuesService } from '../../services/issues.service';
import { Issue } from '../../interfaces/issue';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {

  filters = ['My Issues', 'In Progress'];
  taskTitles;

  tasksHolder = {
    Todo: [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'],
      inProgress: [],
      Done : [
        'Get up',
        'Brush teeth',
        'Take a shower',
        'Check e-mail',
        'Walk dog'
      ]
  };

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(public router: Router, private sidenavUpdateService: SidenavUpdateService, private issuesService: issuesService) { }

  ngOnInit(): void {
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
    this.sidenavUpdateService.changeMessage('projects');
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);
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
