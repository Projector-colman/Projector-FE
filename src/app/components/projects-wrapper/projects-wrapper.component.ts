import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';

@Component({
  selector: 'app-projects-wrapper',
  templateUrl: './projects-wrapper.component.html',
  styleUrls: ['./projects-wrapper.component.scss']
})
export class ProjectsWrapperComponent implements OnInit {

  constructor(private sidenavUpdateService: SidenavUpdateService) { }

  isExpanded = false;
  element: HTMLElement;
  @Output() clickedIcon = new EventEmitter();

  ngOnInit(): void {
    // Side nav icons changing function
    this.sidenavUpdateService.currentMessage.subscribe(message => {
      if(this.element) {
        this.element.style.backgroundColor = "white"; // reset previous element
      }

      // Save current element and change background (message is the same as icon Id)
      this.element = document.getElementById(message);
      this.element.style.backgroundColor = "grey";
    });
  }

  expand() {
    this.isExpanded = !this.isExpanded;
  }
}
