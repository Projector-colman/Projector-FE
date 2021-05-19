import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-plan-sprint',
  templateUrl: './plan-sprint.component.html',
  styleUrls: ['./plan-sprint.component.scss'],
})
export class PlanSprintComponent implements OnInit {
  users: User[];
  sprintPlanningForm: FormGroup;
  usersStoryPoints: { user: User; storyPoints: number }[];
  submitting: boolean;
  constructor(
    private projectService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PlanSprintComponent>
  ) {
    this.submitting = false;
    this.sprintPlanningForm = this.fb.group({
      usersInfo: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    let numberRegEx = /^[1-9]$|^10$/;
    this.projectService.getProjectUsers(this.data).subscribe((data: User[]) => {
      this.users = data;
      this.users.forEach((user: User) =>
        this.usersInfo.push(
          this.fb.group({
            user: user,
            storyPoints: this.fb.control(null, [
              Validators.required,
              Validators.pattern(numberRegEx),
            ]),
          })
        )
      );
    });
    this.sprintPlanningForm.valueChanges.subscribe(
      (result) => (this.usersStoryPoints = result.usersInfo)
    );
  }

  get usersInfo(): FormArray {
    return this.sprintPlanningForm.get('usersInfo') as FormArray;
  }

  onSubmit(): void {
    this.submitting = true;
    this.projectService
      .planSprintByProject(this.data, this.usersStoryPoints)
      .subscribe(
        (res) => {
          console.log(res);
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          this.submitting = false;
        }
      );
  }
}
