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
import { GraphResult } from 'src/app/interfaces/graphResult';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public assignedIssues: Issue[];
  public projects : Base[];
  public currUserId: string;
  public chartData: GraphResult;

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
      this.chartData = data;
    });
  }

}
