import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { Router } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import { Base } from 'src/app/interfaces/base';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public users: Base[];

  constructor(private sidenavUpdateService: SidenavUpdateService, private reportsService: ReportsService,
    private router: Router) { }

  ngOnInit(): void {
    this.sidenavUpdateService.changeMessage('reports');
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);
    this.getCurrProjectUsers();
  }

  getCurrProjectUsers() {
    var currProject = this.router.url.split('/')[2];
    debugger;
    this.reportsService.getProjectUsers(currProject).subscribe(data => {
      this.users = data;
    });
  }

  handleUserChange(userId) {
    this.getProjectSprintChartByUser(userId);
  }

  getProjectSprintChartByUser(userId) {
    // be
  }

}
