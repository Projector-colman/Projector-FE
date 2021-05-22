import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-start-sprint',
  templateUrl: './start-sprint.component.html',
  styleUrls: ['./start-sprint.component.scss']
})
export class StartSprintComponent implements OnInit {
  projectID;

  constructor(    
    private projectService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StartSprintComponent>) { }

  ngOnInit(): void {
    this.projectID = +this.data;
  }

  start() {
    this.projectService.startSprint(this.projectID).subscribe(res => {
      this.dialogRef.close();
    }, err => {
      console.error(err);
      this.dialogRef.close()
    })
  }

  close() {
    this.dialogRef.close();
  }
}
