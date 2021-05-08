import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-sprint-graph-select-project',
  templateUrl: './sprint-graph-with-select-container.html',
  styleUrls: ['./sprint-graph-container.scss']
})
export class SprintGraphSelectProjectComponent implements OnInit {
  public title: String;
  public selectedItem: String;
  public items: String[];

  constructor() { 
    this.title = 'My Sprint Worksheet';
    this.items = ["Project 1", "Project 2", "Project 3"];
    this.selectedItem = this.items[0];
  }

  ngOnInit(): void {
  }

    
  onItemChange(event: MatSelectChange) {

  }

}
