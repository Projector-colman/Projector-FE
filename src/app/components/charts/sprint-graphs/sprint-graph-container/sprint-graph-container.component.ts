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
  @Input() selectItems: Base[];
  @Output() onChange = new EventEmitter<string>();
  @Input() chartData: any[];

  constructor() { 
    this.showSelect = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.selectItems) {
      this.selectedItem = this.selectItems[0].id;
      this.showSelect = true;
    }
  }
    
  onItemChange(event: MatSelectChange) {
    this.onChange.emit(event.value);
  }

}
