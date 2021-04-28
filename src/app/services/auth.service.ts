import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { beAddress } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(beAddress + 'api/auth', {email: email, password: password});
  }

  register(email: string, name: string, password: string) {
    return this.http.post(beAddress + 'api/users', {email: email, name: name, password: password});
  }
  
  setSession(token, email) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('email', email);
  }          

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("email");
  }

  public isLoggedIn() {
    return localStorage.getItem("id_token") != null;
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }
}
