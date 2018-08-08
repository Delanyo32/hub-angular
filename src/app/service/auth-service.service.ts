import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';


@Injectable()
export class AuthService {

  userProfile:any

  auth0 = new auth0.WebAuth({
    clientID: '7QnSYkd3xLcXohIuM0LKqsLNiBmWLscq',
    domain: 'code-envoys.auth0.com',
    responseType: 'token id_token',
    audience: 'https://code-envoys.auth0.com/userinfo',
    //redirectUri: 'http://localhost:4200/callback',
    redirectUri: 'https://ashesihub.firebaseapp.com/callback',
    scope: 'openid profile'
  });

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }


  getProfile() {
    if (!this.userProfile) {
      var accessToken = localStorage.getItem('access_token');
  
      if (!accessToken) {
        console.log('Access Token must exist to fetch profile');
      }
      var self = this
      this.auth0.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          self.userProfile = profile;
          //console.log(self.userProfile)
         
        }
      });
    }
  }


  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
        this.getProfile()
      } else if (err) {
        this.router.navigate(['/login']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
