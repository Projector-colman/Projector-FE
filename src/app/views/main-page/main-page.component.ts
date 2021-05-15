import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { HomepageService } from 'src/app/services/homepage.service';
import { Issue } from '../../interfaces/issue';
import { Base } from '../../interfaces/base';
import { ReportsService } from 'src/app/services/reports.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public assignedIssues: Issue[];
  public projects : Base[];

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
    });
  }

  handleProjectChange(projectId) {
    this.getCurrentUserSprintChart(projectId);
  }

  getCurrentUserSprintChart(projectId) {
    // be
  }

}
