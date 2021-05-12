import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { Router } from '@angular/router';
import { Base } from 'src/app/interfaces/base';
import { Sprint } from 'src/app/interfaces/sprint';
import { ReportsService } from 'src/app/services/reports.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public users: Base[];
    public sprints: Sprint[];
    public issuesByUserTitle: String;
    public selectedSprint: number;

  constructor(private reportsService: ReportsService, private sidenavUpdateService: SidenavUpdateService,
    private router: Router) { }

  ngOnInit(): void {
    this.sidenavUpdateService.changeMessage('reports');
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);
    this.getCurrProjectSprints();
    this.getCurrProjectUsers();
  }

  getCurrProjectSprints() {
    var currProjectId = this.router.url.split('/')[2];
    this.reportsService.getProjectSptrints(currProjectId).subscribe(data => {
        this.sprints = data;
        this.selectedSprint = this.sprints[0].id;
    });
  }
    
  onSprintChange(event: MatSelectChange) {
  }

  getCurrProjectUsers() {
    var currProjectId = this.router.url.split('/')[2];
    this.reportsService.getProjectUsers(currProjectId).subscribe(data => {
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

}