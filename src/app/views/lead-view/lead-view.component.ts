import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from 'src/app/interfaces/project';
import { User } from 'src/app/interfaces/user';
import { Issue } from 'src/app/interfaces/issue';
@Component({
  selector: 'app-lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.scss']
})
export class LeadViewComponent implements OnInit {
  currProject: Project = {};
  projectUsers;
  projectIssues;
  tableData: TableRow[] = [];

  constructor(private sidenavUpdateService: SidenavUpdateService,
              private router: Router,
              private projectsService: ProjectsService) { }

  ngOnInit(): void {
    // Sidenav 
    this.currProject.id = +this.router.url.split('/')[2];
    this.sidenavUpdateService.changeMessage('leadView');
    this.sidenavUpdateService.changeProject(this.currProject.id.toString());

    // Data Promises
    this.projectUsers = this.projectsService.getProjectUsers(this.currProject.id).toPromise();
    this.projectIssues = this.projectsService.getProjectIssues(this.currProject.id).toPromise();

    Promise.all([this.projectUsers, this.projectIssues]).then(values => {
      const users  = values[0];
      const issues = values[1];
      
      users.forEach(user => {
        this.tableData.push({ id: user.id, 
                              name: user.name, 
                              "to-do": 0, 
                              "in-progress": 0, 
                              verify: 0, 
                              done: 0
                            });
      });

      issues.forEach(issue => {
        let asigneeTableData = this.tableData.filter(row => row.id === issue.asignee)[0];
        asigneeTableData[issue.status]++;
      });

      this.tableData.forEach(row => {
        row.donePercentage = (row.done / row['to-do'] + row['in-progress'] + row.verify + row.done) * 100;
      })
    });
  }
}

interface TableRow {
  id:              number;
  name?:           string;
  'to-do'?:           number;
  'in-progress'?:     number;
  verify?:         number;
  done?:           number;
  donePercentage?: number;
}
