import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import { Base } from 'src/app/interfaces/base';
import { GraphResult } from 'src/app/interfaces/graphResult';
import _ from 'lodash';

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
  @Input() data: GraphResult;
  public chartData: any[];

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
    if(this.data) {
      this.buildChart();
    }
  }
    
  onItemChange(event: MatSelectChange) {
    this.onChange.emit(event.value);
  }

  
  buildChart() {
    const data = this.data;
    // if data is missing - dont try to build the chart
    if(data.startTime === null || data.endTime === null || 
      data.issues.length === 0 || data.storyPoints.length === 0) {
        return [];
      }

     // get the sprint dates
     var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d).toISOString().substring(0, 10));}return a;};
     var days = getDaysArray(new Date(data.startTime),new Date(data.endTime));

     // sum all issues story points
    const totalStoryPoints = _.sumBy(data.issues, 'storyPoints');
   
    // group issues by update date and sum the story points of each day 
    const groupedBy = _(data.issues)
    .filter(i => i.status === IssueStatus.Done)
    .filter(i => i.updatedAt !== null)
    .groupBy('updatedAt')
    .map((issue, date) => ({
      date: date,
      storyPoints: _.sumBy(issue, 'storyPoints'),
    }))
    .value();

    // build the chart
    const list = [];
    let realStoryPoints = totalStoryPoints;
    days.forEach((day, i) => {
      const currDayGroup = groupedBy.filter(x => x.date === day);
      if(currDayGroup.length) {
        realStoryPoints -= currDayGroup[0].storyPoints;
      } else {
        realStoryPoints = i !== 0 ? list[i - 1].real : totalStoryPoints;
      }
  //    let planned = totalStoryPoints - ((data.storyPoints[0]['story_points'] / days.length) * i);
      let planned = totalStoryPoints  - (( totalStoryPoints  / (days.length -1) ) * i);
      list.push({
        date: day,
        planned: planned.toFixed(2),
        real: realStoryPoints
      }); 
    });

    this.chartData = list;
  }

}
