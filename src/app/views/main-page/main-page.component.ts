import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { HomepageService } from 'src/app/services/homepage.service';
import { Issue } from '../../interfaces/issue';
import { Base } from '../../interfaces/base';
import { ReportsService } from 'src/app/services/reports.service';
import { AuthService } from '../../services/auth.service';
import { IssueLocation } from 'src/app/enum/issueLocation.enum';
import _ from 'lodash';
import { IssueStatus } from 'src/app/enum/issueStatus.enum';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public assignedIssues: Issue[];
  public projects : Base[];
  public currUserId: string;
  public closedIssuesPointsByDate: any[];

  constructor(private reportsService: ReportsService, 
              private homepageService: HomepageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUserAssignedIssues();
    this.getCurrUserProjects();
  }

  getCurrentUserAssignedIssues() {
    this.homepageService.getCurrentUserAssignedIssues().subscribe((issues: Issue[]) => {
      this.assignedIssues = issues;
    })
  }

  getCurrUserProjects() {
    this.reportsService.getUserProjects(this.authService.getUserID()).subscribe(data => {
      this.projects = data;
      this.getCurrentUserSprintChart(data[0].id);
    });
  }

  handleProjectChange(projectId) {
    this.getCurrentUserSprintChart(projectId);
  }

  getCurrentUserSprintChart(projectId) {
    
    this.homepageService.getActiveSprintChart(projectId, this.authService.getUserID()).subscribe(data => {
       
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
        let planned = totalStoryPoints - Math.floor((data.storyPoints[0]['story_points'] / days.length) * i);
        planned = planned < 0 ? 0 : planned;

        list.push({
          date: day,
          planned: planned,
          real: realStoryPoints
        }); 
      });

      this.closedIssuesPointsByDate = list;
    });
  }
}
