import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { beAddress } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    this.setSession({id: '123456'});
    return true;
    this.http.post(beAddress + 'api/auth', {email: email, password: password}).subscribe(res => {
      if(res == null) {
        return false;
      }
      this.setSession(res);
      return true;
    })
  }

  private setSession(authResult) {
    localStorage.setItem('id_token', authResult.id);
  }          

  logout() {
    localStorage.removeItem("id_token");
  }

  public isLoggedIn() {
    // TODO test
    return localStorage.getItem("id_token") != null;
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }   
}
