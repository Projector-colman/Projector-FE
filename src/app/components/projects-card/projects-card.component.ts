import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-card',
  templateUrl: './projects-card.component.html',
  styleUrls: ['./projects-card.component.scss']
})
export class ProjectsCardComponent implements OnInit {
  @Input() projectName: string;
  @Input() projectId: number;
  constructor() { }

  ngOnInit(): void {
    
  }

}
