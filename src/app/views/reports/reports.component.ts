import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { Router } from '@angular/router';
import { Base } from 'src/app/interfaces/base';
import { Sprint } from 'src/app/interfaces/sprint';
import { ReportsService } from 'src/app/services/reports.service';
import { MatSelectChange } from '@angular/material/select';
import { IssueStatus, IssueStatusLabel } from 'src/app/enum/issueStatus.enum';
import _ from 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { IssueLocation } from 'src/app/enum/issueLocation.enum';
import { GraphResult } from 'src/app/interfaces/graphResult';
import { forkJoin, Observable } from 'rxjs';

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
    public teamChartData: GraphResult;
    public currUserChartData: GraphResult;

  constructor(private authService: AuthService, private reportsService: ReportsService, private sidenavUpdateService: SidenavUpdateService,
    private router: Router) { }

  ngOnInit(): void {
    this.currProjectId = this.router.url.split('/')[2];
    this.sidenavUpdateService.changeMessage('reports');
    this.sidenavUpdateService.changeProject(this.currProjectId);
    this.issuesByUserTitle = 'Team Sprint Worksheet';
    this.getInitData();
  }

  // get current project's sprints and users
  getInitData() {
    var observableSprints: Observable<Sprint[]> =  this.reportsService.getProjectSptrints(this.currProjectId);
    var observableUsers: Observable<Base[]> = this.reportsService.getProjectUsers(this.currProjectId);
    forkJoin([ observableSprints, observableUsers])
    .subscribe(([sprints, users]: [Sprint[], Base[]]) => {
        this.sprints = sprints;
        var team = [{id: -1, name: "Team"}];
        this.users = team.concat(users);
    },
    error => {
        //error here
    }, () => {
      this.selectedSprint = this.sprints.filter(sprint => sprint.status === IssueLocation.CurrentSprint)[0].id; 
      // data for pie chart - issues by status
      this.getSelectedSprintIssuesGroupedByStatus();
      // data for current user sprint chart
      this.getCurrUserCurrSprintChart();
      // data for team sprint chart
      this.getCurrSprintChart(this.users[0].id);
    });
  }

    // handle sprints
    onSprintChange(event: MatSelectChange) {
      this.getSelectedSprintIssuesGroupedByStatus();
      this.getCurrSprintChart(this.users[0].id);
      this.getCurrUserCurrSprintChart();
    }

  // handle users
  handleUserChange(userId) {
    this.getCurrSprintChart(userId);
    var name = this.users.filter(u => u.id === userId).map(i => i.name);
    this.issuesByUserTitle = `${name} Sprint Worksheet`;
  }


  getCurrSprintChart(userId) {
    this.reportsService.getSprintChart(this.selectedSprint, userId).subscribe(data => {
      this.teamChartData = data;
    });
  }

  getCurrUserCurrSprintChart() {
    this.reportsService.getSprintChart(this.selectedSprint, this.authService.getUserID()).subscribe(data => {
      this.currUserChartData = data;
    });
  }

  getSelectedSprintIssuesGroupedByStatus() {
    this.reportsService.getSprintIssues(this.selectedSprint).subscribe(data => {
        this.issuesGroupedByStatus = _(data).groupBy('status')
        .map((issue, status) => ({
          status: Object.keys(IssueStatusLabel).filter(key => key === status).map(key => IssueStatusLabel[key]),
          count: _.sumBy(issue, issue => 1),
        }))
        .value()
    });
  }
}