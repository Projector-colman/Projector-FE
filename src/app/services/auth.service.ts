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
  
  setSession(token, email, id) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id);
  }          

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
  }

  isLoggedIn() {
    return localStorage.getItem("id_token") != null;
  }

  getUserID() {
    return localStorage.getItem("id");
  }
  
  isLoggedOut() {
      return !this.isLoggedIn();
  }
}
