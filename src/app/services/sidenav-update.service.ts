import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavUpdateService {

  private messageSource = new BehaviorSubject('projects');
  private projectSource = new BehaviorSubject('');

  currentMessage = this.messageSource.asObservable();
  currentProject = this.projectSource.asObservable();
  
  constructor() { }

  // This functions tells the side nav which tab is pressed in order to change it's background
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  // This functions tells the side nav which project is being watched
  changeProject(project: string) {
    this.projectSource.next(project);
  }
}
