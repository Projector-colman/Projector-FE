import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-sprint-graph-select-user',
  templateUrl: './sprint-graph-with-select-container.html',
  styleUrls: ['./sprint-graph-container.scss']
})
export class SprintGraphSelectUserComponent implements OnInit {
  public title: String;
  public selectedItem: String;
  public items: String[];

  constructor() {
    this.items = ["Team", "Shahar Freidenberg", "Yotam Nordman"];
    this.selectedItem = this.items[0];
    this.title = this.selectedItem + ' Sprint Worksheet';
   }

  ngOnInit(): void {
  }

  
  onItemChange(event: MatSelectChange) {
    this.title = this.selectedItem + ' Sprint Worksheet';
  }

}
