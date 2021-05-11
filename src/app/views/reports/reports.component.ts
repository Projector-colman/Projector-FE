import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { Router } from '@angular/router';
import { Base } from 'src/app/interfaces/Base';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public users: Base[];

  constructor(private reportsService: ReportsService, private sidenavUpdateService: SidenavUpdateService,
    private router: Router) { }

  ngOnInit(): void {
    this.sidenavUpdateService.changeMessage('reports');
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);
    this.getCurrProjectUsers();
  }

  getCurrProjectUsers() {
    var currProjectId = this.router.url.split('/')[2];
    this.reportsService.getProjectUsers(currProjectId).subscribe(data => {
      this.users = data;
    });
  }

  handleUserChange(userId) {
    this.getCurrentProjectSprintChart(userId);
  }

  getCurrentProjectSprintChart(userId) {
    // be
  }

}