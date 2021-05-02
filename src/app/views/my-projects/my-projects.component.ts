import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { ProjectsService } from '../../services/projects.service';
@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {
  myProjects;

  constructor(private sidenavUpdateService: SidenavUpdateService,
              private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.sidenavUpdateService.changeMessage('projects');
    this.myProjects = this.projectsService.getAllProjects();
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