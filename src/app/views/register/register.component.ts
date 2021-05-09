import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  isMailValid = true;
  isMailTaken = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit(): void {
  }

  get f() { 
    return this.registerForm.controls; 
  }

  onSubmit() {
    this.loading = true;
    this.isMailTaken = false;
    this.isMailValid = true;
    this.registerForm.value.name[0].charAt(0).toUpperCase();
    
    this.authService.register(this.registerForm.value.email, this.registerForm.value.name, this.registerForm.value.password).subscribe((response) => {
      this.loading = false;
      this.router.navigate(['/login']);
    }, (error) => {
      this.loading = false;
      if(error.error === '"email" must be a valid email') {
        this.isMailValid = false;
      }
      if(error.error === 'User already registered.') {
        this.isMailTaken = true;
      }
      this.submitted = true;
    });
  }
}
