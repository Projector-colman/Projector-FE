import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Base } from 'src/app/interfaces/base';

@Component({
  selector: 'app-sprint-graph-container',
  templateUrl: './sprint-graph-container.component.html',
  styleUrls: ['./sprint-graph-container.component.scss']
})
export class SprintGraphContainerComponent implements OnInit {
  @Input() title: String;
  public selectedItem: Number;
  public showSelect : boolean;
  @Input() items: Base[];
  @Output() onChange = new EventEmitter<string>();

  constructor() { 
    this.showSelect = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.items) {
      this.selectedItem = this.items[0].id;
      this.showSelect = true;
    }
  }
    
  onItemChange(event: MatSelectChange) {
    this.onChange.emit(event.value);
  }

}
