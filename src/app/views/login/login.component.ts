import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  attemps = 0;

  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        // redirect to home if already logged in
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/']);
        }
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.loginForm.controls; 
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.authService.login(this.f.email.value, this.f.password.value).subscribe((response: {token: string}) => {
      this.loading = false;
      this.authService.setSession(response.token, this.f.email.value);
      this.router.navigate(['/']);
    }, (error) => {
      this.loading = false;
      this.attemps++;
    });
  }
}