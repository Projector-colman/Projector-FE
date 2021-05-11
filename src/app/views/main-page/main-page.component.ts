import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { HomepageService } from 'src/app/services/homepage.service';
import { Issue } from '../../interfaces/issue';
import { Base } from '../../interfaces/base';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private assignedIssues: Issue[];
  private projects : Base[];

  constructor(private reportsService: ReportsService, private userService: UsersService, private homepageService: HomepageService) { }

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
    var currUser = this.userService.getCurrConnectedUser();
    this.reportsService.getUserProjects(currUser.id).subscribe(data => {
      this.projects = data;
    });
  }

}
