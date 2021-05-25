import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { Router } from '@angular/router';
import { Base } from 'src/app/interfaces/base';
import { Sprint } from 'src/app/interfaces/sprint';
import { ReportsService } from 'src/app/services/reports.service';
import { MatSelectChange } from '@angular/material/select';
import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import _ from 'lodash';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public users: Base[];
    public issuesGroupedByStatus: any[];
    public issuesByUserTitle: string;
    public currProjectId: string;
    public sprints: Sprint[];
    public selectedSprint: number;
    public teamClosedIssuesPointsByDate: any[];
    public currUserClosedIssuesPointsByData: any[];

  constructor(private authService: AuthService, private reportsService: ReportsService, private sidenavUpdateService: SidenavUpdateService,
    private router: Router) { }

  ngOnInit(): void {
    this.currProjectId = this.router.url.split('/')[2];
    this.sidenavUpdateService.changeMessage('reports');
    this.sidenavUpdateService.changeProject(this.currProjectId);
    this.getCurrProjectSprints();
    this.getCurrProjectUsers();
    this.issuesByUserTitle = 'Team Sprint Worksheet';
  }

    // get sprints
    getCurrProjectSprints() {
      this.reportsService.getProjectSptrints(this.currProjectId).subscribe(data => {
          this.sprints = data;
          this.selectedSprint = this.sprints[0].id;
          // data for pie chart - issues by status
          this.getSelectedSprintIssuesGroupedByStatus();
          // data for current user sprint chart
          this.getCurrUserCurrSprintChart();
      });
    }

    // handle sprints
    onSprintChange(event: MatSelectChange) {
      this.getSelectedSprintIssuesGroupedByStatus();
      this.getCurrSprintChart(this.users[0].id);
      this.getCurrUserCurrSprintChart();
    }

  // get users
  getCurrProjectUsers() {
    this.reportsService.getProjectUsers(this.currProjectId).subscribe(data => {
        var team = [{id: -1, name: "Team"}];
        this.users = team.concat(data);
        // data for team sprint chart
        this.getCurrSprintChart(this.users[0].id);
    });
  }

  // handle users
  handleUserChange(userId) {
    this.getCurrSprintChart(userId);
    var name = this.users.filter(u => u.id === userId).map(i => i.name);
    this.issuesByUserTitle = `${name} Sprint Worksheet`;
  }


  getCurrSprintChart(userId) {
    debugger;
    this.reportsService.getSprintChart(this.selectedSprint, userId).subscribe(data => {
      debugger;
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
            
        this.teamClosedIssuesPointsByDate = list; 
      });
    })
  }

  getCurrUserCurrSprintChart() {
    this.reportsService.getSprintChart(this.selectedSprint, this.authService.getUserID()).subscribe(data => {
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
            
        this.currUserClosedIssuesPointsByData = list; 
      });
    })
  }

  getSelectedSprintIssuesGroupedByStatus() {
    this.reportsService.getProjectIssues(this.currProjectId).subscribe(data => {
        const sprintIssues = data.filter(x => x.sprint === this.selectedSprint);
        this.issuesGroupedByStatus = _(sprintIssues).groupBy('status')
        .map((issue, status) => ({
          status: Object.keys(IssueStatus).find(key => IssueStatus[key] === status),
          count: _.sumBy(issue, issue => 1),
        }))
        .value()
    });
  }
}