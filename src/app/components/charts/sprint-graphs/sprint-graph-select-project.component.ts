import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Base } from 'src/app/interfaces/base';

@Component({
  selector: 'app-sprint-graph-select-project',
  templateUrl: './sprint-graph-with-select-container.html',
  styleUrls: ['./sprint-graph-container.scss']
})
export class SprintGraphSelectProjectComponent implements OnInit {
  public title: String;
  public selectedItem: Number;
  @Input() items: Base[];

  constructor() { 
    this.title = 'My Sprint Worksheet';
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.items) {
      this.selectedItem = this.items[0].id;
    }
  }

    
  onItemChange(event: MatSelectChange) {

  }

}
