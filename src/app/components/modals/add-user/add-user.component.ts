import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UsersService } from '../../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  users = this.usersService.getUsers();
  selectedUser;

  submitted = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number},
              public usersService: UsersService,
              private formBuilder: FormBuilder,
              private projectsService: ProjectsService,
              private dialogRef: MatDialogRef<AddUserComponent>,) { }
  
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  changeUser(e) {
    this.selectedUser = e.target.value.substring(e.target.value.indexOf(' ') + 1);
  }

  onSubmit() {
    this.projectsService.addUserToProject(this.data.id, this.selectedUser).subscribe(res => {
      this.dialogRef.close();
    }, err => {
      this.submitted = true;
    });
  }
}
