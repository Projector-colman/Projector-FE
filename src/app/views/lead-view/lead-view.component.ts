import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { IssuesService } from '../../services/issues.service';
import { Project } from 'src/app/interfaces/project';
import { Issue } from 'src/app/interfaces/issue';
import { Subject } from 'rxjs';
import { Epic } from 'src/app/interfaces/epic';

@Component({
  selector: 'app-lead-view',
  templateUrl: './lead-view.component.html',
  styleUrls: ['./lead-view.component.scss']
})
export class LeadViewComponent implements OnInit {
  currProject: Project = {};

  issueToOpen: Issue;
  epicIssueToOpen: Subject<Epic>;

  projectUsers;
  projectIssues;

  statTableData: statisticTableRow[];
  totalTableData: totalTableRow[] = [];

  displayedColumnsSprint: string[] = ['name', 'todo', 'inprogress', 'verify', 'done', 'percent'];
  displayedColumnsTotal: string[] = ['name', 'issues', 'storypoints'];

  doneIssues: Issue[] = [];
  
  constructor(private sidenavUpdateService: SidenavUpdateService,
              private router: Router,
              private projectsService: ProjectsService,
              private issuesService: IssuesService) 
  {
    this.epicIssueToOpen = new Subject<Epic>();
  }

  ngOnInit(): void {
    // Sidenav 
    this.currProject.id = +this.router.url.split('/')[2];
    this.sidenavUpdateService.changeMessage('leadView');
    this.sidenavUpdateService.changeProject(this.currProject.id.toString());

    // Data Promises
    this.projectUsers = this.projectsService.getProjectUsers(this.currProject.id).toPromise();
    this.projectIssues = this.projectsService.getProjectIssues(this.currProject.id).toPromise();
  
    // Parse data to match table
    Promise.all([this.projectUsers, this.projectIssues]).then(values => {
      this.statTableData = [];
      const users  = values[0];
      const issues = values[1].filter(issue => issue.sprintStatus == 'active');
      
      users.forEach(user => {
        this.statTableData.push({ id: user.id, 
                              name: user.name, 
                              "to-do": 0, 
                              "in-progress": 0, 
                              verify: 0, 
                              done: 0
                            });
      });

      issues.forEach(issue => {
        let asigneeTableData = this.statTableData.filter(row => row.id === issue.asignee)[0];
        if(asigneeTableData) {
          asigneeTableData[issue.status]++;
        }
        
      });

      this.statTableData.forEach(row => {
        if(row['to-do'] + row['in-progress'] + row.verify + row.done == 0) {
          row.donePercentage = 0;
        } else {
          row.donePercentage = (row.done / (row['to-do'] + row['in-progress'] + row.verify + row.done)) * 100;
        }
      })
    });

    this.projectsService.totalProjectStats(this.currProject.id).subscribe(data => {
      this.totalTableData = [];
      this.totalTableData.push(...data[0]);
    })

    this.issuesService.getProjectDoneIssues(this.currProject.id).subscribe((data: any) => {
      data.forEach((epic: any) => {
        this.doneIssues.push(...epic.Issues)
      });
    });
  }

  openIssue(issue: Issue): void {
    this.issueToOpen = issue;
    this.issuesService
      .getEpics({ id: this.issueToOpen.epic })
      .subscribe((epic: Epic) => {
        this.epicIssueToOpen.next(epic);
      });
  }
}

interface statisticTableRow {
  id:              number;
  name?:           string;
  'to-do'?:        number;
  'in-progress'?:  number;
  verify?:         number;
  done?:           number;
  donePercentage?: number;
}

interface totalTableRow {
  name?:           string;
  issueCount?:     number;
  totalSP?:        number;
}