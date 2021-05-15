import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { IssuesService } from '../../services/issues.service';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { User } from 'src/app/interfaces/user';
import { AddUserComponent } from 'src/app/components/modals/add-user/add-user.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {
  project: Project = {};
  
  tableData: TableRow[];
  displayedColumns: string[] = ['name', 'email', 'action'];

  constructor(private sidenavUpdateService: SidenavUpdateService,
              private issuesService: IssuesService,
              public projectsService: ProjectsService,
              public router: Router,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.sidenavUpdateService.changeMessage('settings');
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);
    this.sidenavUpdateService.currentProject.subscribe(id => this.project.id = id);

    this.projectsService.getProject({id: this.project.id}).subscribe(prj => {
      this.project = prj[0];
    });
    this.getProjectUsers();
  }

  addUser() {
    let modal = this.matDialog.open(AddUserComponent, {height: '25vh', width: '45vh', data: {id: this.project.id}});
    modal.afterClosed().subscribe(() => {
      this.getProjectUsers();
    });
  }

  deleteUser(e) {
    this.projectsService.removeUserFromProject(this.project.id, e.target.id).subscribe(() => {
      this.getProjectUsers();
    }, err => {
      console.error(err)
    })
  }

  getProjectUsers() {
    this.projectsService.getProjectUsers(this.project.id).subscribe((users: User[]) => {
      this.tableData = [];
      users.forEach(user => {
        this.tableData.push({id: user.id, userName: user.name, email: user.email});
      })
    })
  }
}
interface TableRow {
  id: number;
  userName: string;
  email:    string;
}