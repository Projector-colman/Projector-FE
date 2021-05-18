import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  userEditForm: FormGroup;
  userChanged: boolean;
  user: User;
  imageChanged: boolean;
  newImage: string;
  projects;

  constructor(
    private usersService: UsersService,
    private projectService: ProjectsService,
    private auth: AuthService,
    private router: Router
  ) {
    this.userChanged = false;
    this.imageChanged = false;
  }

  ngOnInit(): void {
    this.usersService.userSubject.subscribe(user => {
      if(!user) {
        this.router.navigate(['/']);
      }
      this.user = user;
      this.userEditForm = new FormGroup({
        name: new FormControl(this.user.name, Validators.required),
        email: new FormControl(this.user.email, Validators.required),
        password: new FormControl(this.user.password, Validators.required),
      });
    });
    this.userEditForm.valueChanges.subscribe((newUser: User) => {
      this.userChanged = !(
        newUser.name == this.user.name &&
        newUser.email == this.user.email &&
        newUser.password == this.user.password
      );
    });

    this.projects = this.usersService.getUserProjects(this.auth.getUserID());
  }

  loadFile(event: any): void {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = (e: any) => {
        this.newImage = e.target.result;
        this.imageChanged = true;
      };
    }
  }

  cancleEdit() {
    this.newImage = undefined;
    this.userEditForm.controls['name'].setValue(this.user.name);
    this.userEditForm.controls['password'].setValue(this.user.password);
    this.userEditForm.controls['email'].setValue(this.user.email);
  }

  submitForm(): void {
    let userToUpdate: User = {
      id: this.user.id,
      image: this.newImage ? this.newImage : this.user.image,
      name: this.userEditForm.controls['name'].value,
      email: this.userEditForm.controls['email'].value,
      password: this.userEditForm.controls['password'].value,
    };
    this.usersService.updateUser(userToUpdate);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
