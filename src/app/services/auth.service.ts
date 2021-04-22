import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { beAddress } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    this.setSession({id: 'asdasd', isAdmin : true});
    return true;
    //return this.http.post(beAddress + 'api/auth', {email: email, password: password}).do(res => this.setSession).shareReplay();;
  }

  private setSession(authResult) {
    localStorage.setItem('id_token', authResult.id);
    localStorage.setItem('is_admin', authResult.isAdmin);
  }          

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("is_admin");
  }

  public isLoggedIn() {
    // TODO test
    return true;
    return localStorage.getItem("id_token") != null;
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }   
}
