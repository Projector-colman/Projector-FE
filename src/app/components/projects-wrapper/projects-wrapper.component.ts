import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-wrapper',
  templateUrl: './projects-wrapper.component.html',
  styleUrls: ['./projects-wrapper.component.scss']
})
export class ProjectsWrapperComponent implements OnInit {

  constructor() { }
  isExpanded = false;
  element: HTMLElement;

  toggleActive(event:any){
    event.preventDefault();
    if(this.element !== undefined){
      this.element.style.backgroundColor = "white";
    } 
    var target = event.currentTarget;
    if(target.style.backgroundColor == "#e51282") {
      target.style.backgroundColor = "white";
    } else {
      target.style.backgroundColor = "#e51282";
    }
    this.element = target;
  }
  ngOnInit(): void {
    this.element = document.getElementById("projectsView");
    document.getElementById("projectsView").style.backgroundColor = "#e51282";
  }

  expand() {
    this.isExpanded = !this.isExpanded;
  }
}
