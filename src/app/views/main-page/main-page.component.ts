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
      debugger;
      this.getCurrentUserSprintChart(data[0].id);
    });
  }

  handleProjectChange(projectId) {
    this.getCurrentUserSprintChart(projectId);
  }

  getCurrentUserSprintChart(projectId) {
    this.reportsService.getProjectSptrints(projectId).subscribe(data => {
      // get the project active sprint
      const currSprint = data.filter(sprint => sprint.status === IssueLocation.CurrentSprint)[0];

      // get the active sprint issues
    this.reportsService.getSprintIssues(currSprint.id).subscribe(data => {

      const issues = data
      // get the current user issues
      .filter(i => i.asignee.toString() === this.authService.getUserID());

      // group issues by update date and sum the story points of each day 
      const groupedBy = _(issues)
      .filter(i => i.status === IssueStatus.Done)
      .filter(i => i.updatedAt !== null)
      .groupBy('updatedAt')
      .map((issue, date) => ({
        date: date,
        storyPoints: _.sumBy(issue, 'storyPoints'),
      }))
      .value();

      this.closedIssuesPointsByDate = groupedBy;
      debugger;
    });
    })
  }

}
