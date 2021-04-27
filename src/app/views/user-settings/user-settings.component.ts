import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private auth: AuthService,
    private router: Router
  ) {
    this.userChanged = false;
    this.imageChanged = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.user = this.usersService.getUser(params.id);
    });
    this.userEditForm = new FormGroup({
      userName: new FormControl(this.user.userName, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
    });
    this.userEditForm.valueChanges.subscribe((newUser: User) => {
      this.userChanged = !(
        newUser.userName == this.user.userName &&
        newUser.email == this.user.email &&
        newUser.password == this.user.password
      );
    });
  }

  getProjectsOfCurrUser(): Project[] {
    return this.projectService.projects.filter(
      (project: Project) => project.owner == this.user
    );
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
    this.userEditForm.controls['userName'].setValue(this.user.userName);
    this.userEditForm.controls['password'].setValue(this.user.password);
    this.userEditForm.controls['email'].setValue(this.user.email);
  }

  submitForm(): void {
    let userToUpdate: User = {
      id: this.user.id,
      fullName: this.user.fullName,
      imageSrc: this.newImage ? this.newImage : this.user.imageSrc,
      userName: this.userEditForm.controls['userName'].value,
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
