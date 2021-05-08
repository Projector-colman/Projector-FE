import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../../services/projects.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  allProjects: string[];
  isNameTaken = false;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectsService,
              public dialogRef: MatDialogRef<CreateProjectComponent>,
              private router: Router) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      key: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]]
    });
  }

  onSubmit() {
    this.projectService.createProject(this.projectForm.value.name, this.projectForm.value.key).subscribe(response => {
      this.dialogRef.close();
      if(this.router.url == '/projects') {
        this.router.navigate(['/projects/' + this.projectForm.value.name]);
      }
    }, 
    error => {
      this.isNameTaken = true;
    });
  }
}
