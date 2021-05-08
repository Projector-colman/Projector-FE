import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-sprint-graph-current-user',
  templateUrl: './sprint-graph-container.html',
  styleUrls: ['./sprint-graph-container.scss']
})
export class SprintGraphCurrentUserComponent implements OnInit {
  public title: String;
  constructor() { 
    this.title = 'My Sprint Worksheet';
  }

  ngOnInit(): void {
  }

}
