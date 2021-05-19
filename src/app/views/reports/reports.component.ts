import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { Router } from '@angular/router';
import { Base } from 'src/app/interfaces/base';
import { Sprint } from 'src/app/interfaces/sprint';
import { ReportsService } from 'src/app/services/reports.service';
import { MatSelectChange } from '@angular/material/select';
import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import _ from 'lodash';

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

  constructor(private reportsService: ReportsService, private sidenavUpdateService: SidenavUpdateService,
    private router: Router) { }

  ngOnInit(): void {
    this.currProjectId = this.router.url.split('/')[2];
    this.sidenavUpdateService.changeMessage('reports');
    this.sidenavUpdateService.changeProject(this.currProjectId);
    this.getCurrProjectSprints();
    this.getCurrProjectUsers();
  }

    // init sprints
    getCurrProjectSprints() {
      this.reportsService.getProjectSptrints(this.currProjectId).subscribe(data => {
          this.sprints = data;
          this.selectedSprint = this.sprints[0].id;
          // data for pie chart - issues by status
          this.getSelectedSprintIssuesGroupedByStatus();
      });
    }

    onSprintChange(event: MatSelectChange) {
      this.getSelectedSprintIssuesGroupedByStatus();
    }

  // init users
  getCurrProjectUsers() {
    this.reportsService.getProjectUsers(this.currProjectId).subscribe(data => {
        var team = [{id: -1, name: "Team"}];
        this.users = team.concat(data);
        this.issuesByUserTitle = 'Team Sprint Worksheet';
    });
  }

  handleUserChange(userId) {
    this.getCurrentProjectSprintChart(userId);
    var name = this.users.filter(u => u.id === userId).map(i => i.name);
    this.issuesByUserTitle = `${name} Sprint Worksheet`;
  }

  getCurrentProjectSprintChart(userId) {
    // be
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